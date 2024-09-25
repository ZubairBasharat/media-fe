"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { addAuthInformation } from "@/store/features/auth";
import { useAppDispatch } from "@/store/useReduxStore";
import useAuthStore from "@/store/zustand/auth";
import Cookies from "js-cookie";
import { Home, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuComponent from "../../home/components/Menu/page";

type Props = {}

const RestaurantNavbar = (props: Props) => {
    const router = useRouter();
    const user = useAuthStore((state: any) => state.user)
    const { setUser } = useAuthStore((state: any) => state)
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("user_type")
        setUser({})
        dispatch(addAuthInformation({ user: {} }))
        router.push("/")
    }

    return (
        <div className="h-20 border-b">
            <div className="flex h-full items-center justify-between px-14">
                <div>
                    <Image src={"/assets/images/logo.svg"} width={130} height={80} alt="logo" className="cursor-pointer" onClick={() => {
                        router.push("/");
                    }} />
                </div>
                <div className="basis-1/2">
                    <form action="">
                        <div className="relative">
                            <Input className="h-12 bg-gray-100 pl-10 placeholder:text-gray-400" placeholder="Restaurant, groceries, dishes" />
                            <span className="absolute left-2 top-1/2 -translate-y-1/2"><Search className="text-gray-300" /></span>
                        </div>
                    </form>
                </div>
                <div className="flex gap-4">
                    <div className="hidden items-center gap-1 rounded bg-white p-2 text-base text-black md:flex border">
                        {!user.access_token ?
                            <span>
                                <Link href="/sign-up"> </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex gap-2 items-center">
                                        <Home className="text-secondary" /> Sign up or log in
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <Link href="/customer/login">Login</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link href="/customer/sign-up">Sign Up</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </span> : <span onClick={handleLogout} className="cursor-pointer">Sign Out</span>
                        }
                    </div>
                    <MenuComponent />
                </div>
            </div>
        </div>
    )
}

export default RestaurantNavbar