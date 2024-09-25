"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"

import useToast from "@/components/hooks/useToast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useSignInMutation } from "@/store/features/Website/SignIn/SignInApiSlice"
import { useAppDispatch } from "@/store/useReduxStore"
import useAuthStore from "@/store/zustand/auth"
import Link from "next/link"
import { useEffect, useState } from "react"

type Props = {}
const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .email("This is not a valid email.")
})

const Login = () => {
  const router = useRouter()
  const [loginError, setLoginError] = useState("");
  const [loginMethod, isLoading] = useSignInMutation();
  const { setUser } = useAuthStore((state: any) => state);
  const dispatch = useAppDispatch();
  const user = useAuthStore((state: any) => state.user)
  const { ToastSuccess, ToastError } = useToast()


  useEffect(() => {
    if (user && user?.access_token) {
      router.push("/admin");
    }
  }, [user]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user: any = await loginMethod(values);
      console.log("dd", user);

      router.push("/admin");
      // if (user?.data?.code == 200 && user?.data?.data?.user_type === "restaurant") {
      //   setUser(user?.data?.data);
      //   dispatch(addAuthInformation(user?.data?.data));
      //   Cookies.set("token", user?.data?.data?.access_token);
      //   Cookies.set("user_type", user?.data?.data?.user_type);
      //   router.push("/admin");
      //   ToastSuccess("Login Successfully");
      // }


      // else if (user?.error?.data?.code === 400) {
      //   setLoginError(user?.error?.data?.errors?.[0]?.message?.[0]);
      // } else {
      //   setLoginError("Login Failed");
      // }
    } catch (err) {
      console.log("err ", err);
    }
  }
  return (
    <div>
      <div className="grid h-screen grid-cols-12 gap-4 ">
        <div className="relative col-span-12 hidden w-full md:col-span-6 md:block">
          <div className="clip-your-needful-style absolute left-0 top-0 h-full w-full"></div>
          <div className="flex h-full w-full items-center justify-center">
            <img
              className=" z-3 w-max-[90%] f relative mx-0  my-auto h-auto rounded-md object-cover"
              src="/assets/images/login/chart_illustration.svg"
              alt="image"
            />
          </div>
        </div>
        <div className=" col-span-12 h-full w-full md:col-span-6 ">
          <div className="flex h-full w-full items-center justify-center ">
            <div className=" w-[400px]">
              <Link href="/">
                {/* <img
                  className=" mb-6 h-[50px] w-[150px]"
                  src="/assets/images/logo.svg"
                  alt="logo"
                /> */}
              </Link>
              <h1 className=" text-[40px] font-bold leading-[45px]">
                Welcome  Demo Image Compress
              </h1>
              <p className=" my-[20px]">
                Developer Login
              </p>
              <p className="mb-2 text-red-600">
                {loginError}
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }: any) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Enter your Mail" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />
                    {/* <FormField
                      control={form.control}
                      name="password"
                      render={({ field }: any) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter your password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    /> */}
                    <Button disabled={isLoading?.isLoading} className={`inline-block ${isLoading?.isLoading && "disabled"}`} w-full>Login</Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
