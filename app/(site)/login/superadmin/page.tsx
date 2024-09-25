"use client"

import { FormCardBody } from "@/components/comon/Form"
import FormInput from "@/components/comon/Form/FormInput"
import useToast from "@/components/hooks/useToast"
import FooterArea from "@/components/sites/home/FooterArea/page"
import { Button } from "@/components/ui/button"
import { useSuperAdminSignInMutation } from "@/store/features/Website/SignIn/SignInApiSlice"
import { addAuthInformation } from "@/store/features/auth"
import { useAppDispatch } from "@/store/useReduxStore"
import useAuthStore from "@/store/zustand/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { Home, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

type Props = {}
const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
})

const AdminLogin = () => {
  const router = useRouter()
  const [loginError, setLoginError] = useState("");
  const [loginMethod] = useSuperAdminSignInMutation();
  const { setUser } = useAuthStore((state: any) => state);
  const dispatch = useAppDispatch();
  const user = useAuthStore((state: any) => state.user)
  const { ToastSuccess } = useToast()


  useEffect(() => {
    if (user && user?.data?.token) {
      console.log("Reach ");

      router.push("/superadmin");
    }
  }, [user]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  async function onSubmitHandler(values: z.infer<typeof formSchema>) {
    try {
      const user: any = await loginMethod(values);
      if (user?.data?.code === 200) {
        setUser(user?.data?.user);
        dispatch(addAuthInformation(user?.data?.user));
        Cookies.set("token", user?.data?.token);
        Cookies.set("user_type", "SUPERADMIN");
        ToastSuccess("Login Successfull");
        router.push("/superadmin");
      }

      // user.error.status.code
      if (user?.error?.status === 401) {
        setLoginError(user?.error?.data?.msg);
      }
    } catch (err) {
      console.log("err ", err);
    }
  }

  return (
    <div className="">
      {/* header start  */}
      <div className="mb-3 border-b-[1px] border-gray-200">
        <div className="mx-auto px-4 md:w-4/5 ">
          <div className=" flex items-center justify-between py-3">
            <div className=" flex items-center space-x-4">
              <div className=" flex items-center gap-1 space-x-2 rounded border-[1px] border-gray-300 bg-white p-2 text-base text-black">
                <Home className="h-[17px] w-[17px] text-secondary" />
                <span>
                  <Link href="/" className="text-[14px]">
                    Home
                  </Link>
                </span>
              </div>
              <div className="flex cursor-pointer items-center gap-1 rounded border-[1px] border-gray-300 bg-white p-2 text-base text-black">
                <div className="flex items-center space-x-3">
                  <Menu className="h-[17px] w-[17px] text-secondary" />
                  <span>Menu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* header end */}
      {/* form start */}
      <div className=" flex h-full  items-center justify-center">
        <div className=" my-[100px] w-[500px]">
          <FormCardBody
            validation={form}
            onSubmitHandler={form.handleSubmit(onSubmitHandler)}
          >
            <div className="space-y-6">
              <h4 className=" text-[18px] font-semibold">SuperAdmin Login</h4>
              <p className="text-red-600 mb-2">
                {loginError}
              </p>
              <FormInput
                name="email"
                placeholder=" Enter Your Email"
              />
              <FormInput
                name="password"
                placeholder=" Enter Your Password"
                type="password"
              />
              <Button className="inline-block w-full" type="submit">Login</Button>
              <Link href={"#"} className=" block text-center text-[#00ccbb]">Forgot Password</Link>
            </div>
          </FormCardBody>
        </div>
      </div>
      {/* form end */}

      {/* footer  */}
      <div className="">
        <FooterArea />
      </div>
    </div>
  )
}

export default AdminLogin
