"use client";

import { Button } from "@/components/ui/button";
import {
  Select, SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { addAuthInformation } from "@/store/features/auth";
import { useAppDispatch } from "@/store/useReduxStore";
import useAuthStore from "@/store/zustand/auth";
import Cookies from "js-cookie";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
type Props = {}

const MenuComponent = (props: Props) => {
  const user = useAuthStore((state: any) => state.user)

  const { setUser } = useAuthStore((state: any) => state)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_type")
    setUser({});
    dispatch(addAuthInformation({ user: {} }))
    router.push("/")
  }

  const handleLogIn = () => {
    router.push("/customer/login")
  };
  return (
    <Sheet>
      <div className="flex cursor-pointer items-center gap-1 rounded border bg-white p-2 text-base text-black"  >
        <SheetTrigger className="flex items-center gap-1">
          <Menu className="text-secondary" /><span>Menu</span>
        </SheetTrigger>
      </div>
      <SheetContent className="relative w-[350px] p-0">
        <div className="w-full p-4 ">
          <div className="border-b py-6">
            <Image src="dddd" width={130} height={80} alt="" />
          </div>
          <div className="mt-6">
            <Button variant={"secondary"} className="w-full text-white" onClick={() => !user?.access_token ? handleLogIn : handleLogout}>{!user?.access_token ? "Sign in or log in" : "Sign Out"}</Button>
          </div>
          <div className="absolute bottom-4 ">
            <Select  >
              <SelectTrigger className="mb-4" >
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[320px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MenuComponent
