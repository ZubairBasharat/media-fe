"use client"

import Link from "next/link"

import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { addAuthInformation } from "@/store/features/auth"
import { useAppDispatch } from "@/store/useReduxStore"
import useAuthStore from "@/store/zustand/auth"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

export function SiteHeader() {
  const { setUser } = useAuthStore((state: any) => state)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_type")
    setUser({})
    dispatch(addAuthInformation({ user: {} }))
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >

                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >

                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
            <Button onClick={() => handleLogout()} variant={"outline"} size={"sm"}>
              Sign Out
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
