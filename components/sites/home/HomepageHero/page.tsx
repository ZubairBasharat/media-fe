/* eslint-disable @next/next/no-img-element */

"use client"

import { Menu } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import useToast from "@/components/hooks/useToast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCountryListQuery } from "@/store/features/Website/Country/countryApiSlice"
import { useGetRestaurantSearchQuery } from "@/store/features/Website/Restaurant/restaurantApiSlice"
import { useSignUpMutation } from "@/store/features/Website/Signup/SignUpApiSlice"
import { addAuthInformation } from "@/store/features/auth"
import { useAppDispatch } from "@/store/useReduxStore"
import useAuthStore from "@/store/zustand/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import * as z from "zod"

type Props = {

}

const HomepageHero = () => {
  const route = useRouter()
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false)
  const [signup] = useSignUpMutation();
  const { data: countries } = useCountryListQuery();
  const { ToastSuccess } = useToast()
  const user = useAuthStore((state: any) => state.user)
  const [searchText, setSearchText] = useState("");
  const [searchResultArea, setSearchResultArea] = useState(false);
  const [params, setParams] = useState<any>({
    postcode: ""
  })
  const { data: restaurantListSearch } = useGetRestaurantSearchQuery(params);


  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { setUser } = useAuthStore((state: any) => state)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_type")
    setUser({})
    dispatch(addAuthInformation({ user: {} }))
    router.push("/")
  }

  const formSchema = z.object({
    email: z.string().min(1, { message: "This field is required" }).email("This is not a valid email."),
    password: z.string().min(1, { message: "This field is required" }),
    city: z.string().min(1, { message: "This field is required" }),
    country_id: z.string().min(1, { message: "This field is required" }),
    shop_address: z.string().min(1, { message: "This field is required" }),
    name: z.string().min(1, { message: "This field is required" }),
    postcode: z.string().min(1, { message: "This field is required" }),
    phone: z.string().min(1, { message: "This field is required" }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      shop_address: "",
      city: "",
      country_id: "1",
      name: "",
      postcode: "",
      phone: ""
    },
  })


  if (!hasMounted) {
    return null;
  }

  const handleRouteChange = (data: any) => {
    if (data === "login") {
      router.push("/login")
    }
    if (data === "customerLogin") {
      router.push("/customer/login")
    }
    if (data === "customerSignUp") {
      router.push("/customer/sign-up")
    }
    if (data === "profile") {
      router.push("/profile")
    }
    if (data === "customerOrder") {
      router.push("/customer-order")
    }

  }

  console.log("dddd", user);


  return (
    <>
      <section className="relative min-h-[560px]  bg-black">
        <Sheet>
          <span className="absolute -left-2/4 top-1/2 hidden h-full -translate-y-1/2 md:left-0 md:block md:w-[560px]">
            <img
              src="/assets/images/homepage/compress-video-banner.avif"
              alt="/"
              className="h-full w-full"
            />
          </span>
          <span className="absolute -right-1/4 top-1/2 h-[560px] -translate-y-1/2 md:right-0">
            <img
              src="/assets/images/homepage/bottom-img.png"
              alt="/"
              className="h-full w-full"
            />
          </span>

          <div className="absolute left-0 top-0 h-[70px] w-full">
            <div className="mx-auto flex h-full w-11/12 cursor-pointer items-center justify-between" >
              <div>
                {/* <Image
                  src={"/assets/images/logo.svg"}
                  width={130}
                  height={80}
                  alt=""
                /> */}
              </div>
              <div className="flex gap-4">
                {!user.token &&
                  <div className="hidden   text-base text-black md:block">
                    <DropdownMenu>
                      <DropdownMenuTrigger className=" rounded bg-white px-4 py-2">Login</DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleRouteChange("login")} className=" cursor-pointer">
                          Developer Login
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleRouteChange("customerLogin")} className=" cursor-pointer">
                          Admin   Login
                        </DropdownMenuItem>


                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Dialog open={open} onOpenChange={setOpen}>
                      {/* <DialogTrigger> Sign Up</DialogTrigger> */}
                      <DialogContent className="h-full p-0 ">
                        <DialogHeader>
                          {/* <DialogTitle className=" border-grey-500 flex items-center justify-center border-b-[1px] py-4">
                            <Image
                              src={"/assets/images/logo.svg"}
                              width={130}
                              height={80}
                              alt=""
                            />
                          </DialogTitle> */}
                          <DialogDescription className="h-screen overflow-y-auto p-4 ">
                            <div className="  border-grey-500 flex flex-col items-center  border-b-[1px] pb-8">
                              <Image
                                className="mb-6 mt-2 h-auto max-w-full rounded-full align-middle "
                                src={"/assets/images/homepage/burger.jpg"}
                                width={100}
                                height={100}
                                alt=""
                              />
                              <h1 className=" mb-4 text-[22px] font-medium text-[#353939]">
                                Start selling on RestroPlus
                              </h1>
                              <p>
                                Welcome! Lets get you set up. It should only take
                                a few minutes
                              </p>
                            </div>

                            {/* input area */}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>

                  </div>
                }

                <div className="flex cursor-pointer items-center gap-1 rounded bg-white p-2 text-base text-black">
                  <SheetTrigger className="flex items-center gap-4">
                    <Menu className="text-secondary" />
                    <span>Menu</span>
                  </SheetTrigger>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/4 h-[300px] w-[65%] space-y-6 md:w-full">
            <div className="mx-auto px-4 md:w-1/3 md:px-14 ">
              <h2 className="text-4xl font-bold text-white lg:text-center lg:text-[40px]">
                Video Compressor.{" "}
                <span className="text-secondary">Delivered.</span>
              </h2>
            </div>
          </div>

          <SheetContent className="relative w-[350px] p-0">
            <div className="w-full p-4 ">
              <div className="border-b py-6">
              </div>
              <div>


                <ul className=" mt-4">
                  {user?.user_type === "customer" && <>
                    {/* <li className=" cursor-pointer border-b-[1px] border-solid border-gray-300 py-2 hover:text-[#1d89cd]" onClick={() => handleRouteChange("profile")}>Profile</li> */}

                    <li className=" cursor-pointer border-b-[1px] border-solid border-gray-300 py-2 hover:text-[#1d89cd]" onClick={() => handleRouteChange("customerOrder")}>Order sssss</li> </>}

                  {!user.token && <div className=" block md:hidden">
                    <li className=" cursor-pointer border-b-[1px] border-solid border-gray-300 py-2 hover:text-[#1d89cd]" onClick={() => handleRouteChange("customerLogin")}>Login</li>
                    <li className=" cursor-pointer border-b-[1px] border-solid border-gray-300 py-2 hover:text-[#1d89cd]" onClick={() => handleRouteChange("customerSignUp")}>Sign up</li>

                    <li className=" cursor-pointer border-b-[1px] border-solid border-gray-300 py-2 hover:text-[#1d89cd]" onClick={() => handleRouteChange("login")}>Partner Login</li>
                    <li className=" cursor-pointer border-b-[1px] border-solid border-gray-300 py-2 hover:text-[#1d89cd]" onClick={() => setOpen(true)}>Partner Sign up</li>
                  </div>}
                  {user.token && <li onClick={handleLogout} className=" cursor-pointer py-2 hover:text-[#1d89cd]">Logout</li>}

                </ul>
              </div>
              {/* <div className="absolute bottom-4 ">
                <Select>
                  <SelectTrigger className="mb-4">
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
              </div> */}
            </div>
          </SheetContent>
        </Sheet>
      </section>
      <div className="h-auto w-full">
        <div className="-mt-12 w-full space-y-6">

        </div>
      </div>
    </>
  )
}

export default HomepageHero
