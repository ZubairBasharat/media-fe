/* eslint-disable @next/next/no-img-element */

"use client"

import { Home, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { FormCardBody } from "@/components/comon/Form"
import FormInput from "@/components/comon/Form/FormInput"
import FormSelect from "@/components/comon/Form/FormSelect"
import useToast from "@/components/hooks/useToast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
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

const Header = () => {
  const route = useRouter()
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false)
  const [signup] = useSignUpMutation();
  const { data: countries } = useCountryListQuery();
  const { ToastSuccess } = useToast();
  const [loading, setLoading] = useState(false);
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

  const onSubmitHandler = async (value: any) => {

    try {
      setLoading(true);
      const response: any = await signup({
        ...value,
        type: "restaurant"
      });

      if (response?.data?.code === 201) {
        form.reset();
        setOpen(false);
        setAdd(false);
        ToastSuccess("Signup Successful",);
      }
      else if (response?.error?.status === 400) {
        setLoading(false);
        response?.error?.data?.errors?.forEach((value: any) =>
          form.setError(value?.field, {
            type: "custom",
            message: value?.message,
          })
        )
      }
    } catch (error) { }
  }

  if (!hasMounted) {
    return null;
  }

  const handleRouteChange = (data: any) => {
    if (data === "login") {
      router.push("/login")
    }
    if (data === "customerLogin") {
      router.push("/auth/customer/login")
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
    if (data === "home") {
      router.push("/")
    }

  }

  return (
    <Sheet>
      <div className=" left-0 top-0  h-[70px] w-full bg-[#00b1a2]">
        <div className="mx-auto flex h-full w-11/12 cursor-pointer items-center justify-between" >
          <div >
            <Image
              src={"/assets/images/logo.svg"}
              width={130}
              height={80}
              alt=""
              onClick={() => handleRouteChange("home")}
            />
          </div>
          <div className="flex gap-4">
            {!user.access_token &&
              <div className="hidden   text-base text-black md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger className=" rounded bg-white px-4 py-2">Partner with us</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleRouteChange("login")} className=" cursor-pointer">
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setOpen(true)} className=" cursor-pointer">
                      <span>Sign Up</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Dialog open={open} onOpenChange={setOpen}>
                  {/* <DialogTrigger> Sign Up</DialogTrigger> */}
                  <DialogContent className="h-full p-0 ">
                    <DialogHeader>
                      <DialogTitle className=" border-grey-500 flex items-center justify-center border-b-[1px] py-4">
                        {/* <Image
                          src={"/assets/images/logo.svg"}
                          width={130}
                          height={80}
                          alt=""
                        /> */}
                      </DialogTitle>
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
                        <FormCardBody
                          validation={form}
                          onSubmitHandler={form.handleSubmit(onSubmitHandler)}
                        >
                          <div className="mt-8 ">
                            {/* name area */}
                            <div>
                              <div className="space-y-2 ">
                                <Label className=" text-[16px] text-[#353939]">
                                  Restaurant or shop name
                                </Label>
                                <FormInput
                                  name="name"
                                  placeholder="Start typing restaurant or shop name"
                                />
                              </div>
                              {/* Add section */}
                              {add && (
                                <div className="mt-7 grid  grid-cols-2 gap-x-5 gap-y-8">
                                  <div className="col-span-2 space-y-2 ">
                                    <Label className=" text-[16px] text-[#353939]">
                                      Restaurant or shop address
                                    </Label>
                                    <FormInput
                                      name="shop_address"
                                      placeholder="E.g.123 High Street"
                                    />
                                  </div>

                                  <div className="col-span-1 space-y-2 ">
                                    <Label className=" text-[16px] text-[#353939]">
                                      City
                                    </Label>
                                    <FormInput
                                      name="city"
                                      placeholder="E.g.London"
                                    />
                                  </div>

                                  <div className="col-span-1 space-y-2 ">
                                    <Label className=" text-[16px] text-[#353939]">
                                      PostCode
                                    </Label>
                                    <FormInput
                                      name="postcode"
                                      placeholder="E.g.N1 20D"
                                    />
                                  </div>

                                  <div className="col-span-2 space-y-2 ">
                                    <FormSelect name="country_id" data={countries?.data} label="Country" />
                                  </div>
                                </div>
                              )}

                              <div className=" border-grey-500  border-b-[1px] pb-7">
                                <Link
                                  onClick={() =>
                                    setAdd((prevState) => !prevState)
                                  }
                                  href="#"
                                  className=" mt-[30px]  block text-[14px] text-[#00ccbc]"
                                >
                                  {add
                                    ? "Search for address"
                                    : "Add restaurant details manually"}
                                </Link>
                              </div>
                            </div>
                            {/* middle logo area */}
                            <div className="  border-grey-500 flex flex-col items-center  border-b-[1px] pb-8">
                              <Image
                                className="my-6 h-auto max-w-full rounded-full align-middle "
                                src={
                                  "/assets/images/homepage/grocery-bag.jpg"
                                }
                                width={100}
                                height={100}
                                alt=""
                              />
                              <h1 className=" mb-4 text-[22px] font-medium text-[#353939]">
                                Log in details
                              </h1>
                              <p>
                                Create your log in details for RestroPlus Hub
                              </p>
                            </div>
                            {/* email and password */}
                            <div className=" border-grey-500 my-8 space-y-8  border-b-[1px] pb-7">
                              <div className="space-y-3 ">
                                <Label className=" text-[16px] text-[#353939]">
                                  Your Business Phone
                                </Label>
                                <FormInput name="phone" />
                              </div>
                              <div className="space-y-3 ">
                                <Label className=" text-[16px] text-[#353939]">
                                  Business email address
                                </Label>
                                <FormInput name="email" />
                              </div>
                              <div className="space-y-3 ">
                                <Label className=" text-[16px] text-[#353939]">
                                  Create a password
                                </Label>
                                <FormInput name="password" type="password" />
                              </div>
                              <div className="space-y-3 ">
                                <Button className=" w-full bg-[#00ccbc] text-white" disabled={loading} type="submit">
                                  Next
                                </Button>
                                <div className="text-center ">
                                  Already have an account?
                                  <span
                                    className=" cursor-pointer text-[#00ccbc]"
                                    onClick={() => route.push("/login")}
                                  >
                                    Log in
                                  </span>
                                </div>
                              </div>
                            </div>
                            {/* footer  */}
                            <div className=" mb-[80px]">
                              For details on our processing of your personal
                              information please see our{" "}
                              <span className=" cursor-pointer text-[#00ccbc]">
                                Privacy Policy
                              </span>
                            </div>
                          </div>
                        </FormCardBody>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

              </div>
            }
            <div className="hidden items-center gap-1 rounded bg-white p-2 text-base text-black md:flex ">

              {!user.access_token ?
                <span>
                  <Link href="/sign-up"> </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2">
                      <Home className="text-secondary" /> Sign up or log in
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleRouteChange("customerLogin")} className=" cursor-pointer">
                        Login
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleRouteChange("customerSignUp")} className=" cursor-pointer">
                        Sign Up
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span> : <span onClick={handleLogout} className="cursor-pointer">Sign Out</span>
              }
            </div>

            <div className="flex cursor-pointer items-center gap-1 rounded bg-white p-2 text-base text-black">
              <SheetTrigger className="flex items-center gap-4">
                <Menu className="text-secondary" />
                <span>Menu</span>
              </SheetTrigger>
            </div>
          </div>
        </div>
      </div>

      <SheetContent >
        <div className="w-full p-4 ">
          <div className="border-b py-6">
            {/* <Image
              src={"/assets/images/logo.svg"}
              width={130}
              height={80}
              alt=""
            /> */}
          </div>

          <div>
            <ul className=" mt-4">
              {user?.user_type === "customer" && <>
                {/* <li className=" cursor-pointer border-b-[1px] border-solid border-gray-300 py-2 hover:text-[#1d89cd]" onClick={() => handleRouteChange("profile")}>Profile</li> */}

                <li className=" cursor-pointer border-b-[1px] border-solid border-gray-300 py-2 hover:text-[#1d89cd]" onClick={() => handleRouteChange("customerOrder")}>Order</li> </>}

              {!user.access_token && <div className=" block md:hidden">
                <li className=" cursor-pointer border-b-[1px] border-solid border-gray-300 py-2 hover:text-[#1d89cd]" onClick={() => handleRouteChange("customerLogin")}>Login</li>
                <li className=" cursor-pointer border-b-[1px] border-solid border-gray-300 py-2 hover:text-[#1d89cd]" onClick={() => handleRouteChange("customerSignUp")}>Sign up</li>

                <li className=" cursor-pointer border-b-[1px] border-solid border-gray-300 py-2 hover:text-[#1d89cd]" onClick={() => handleRouteChange("login")}>Partner Login</li>

                <li className=" cursor-pointer border-b-[1px] border-solid border-gray-300 py-2 hover:text-[#1d89cd]" onClick={() => setOpen(true)}>Partner Sign up</li>
              </div>}

              {user.access_token && <li onClick={handleLogout} className=" hover:text-[#1d89cd]block cursor-pointer py-2 md:hidden">Logout</li>}
            </ul>

          </div>

        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Header
