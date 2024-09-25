"use client"

import { FormCardBody } from "@/components/comon/Form"
import FormInput from "@/components/comon/Form/FormInput"
import FormSelect from "@/components/comon/Form/FormSelect"
import FooterArea from "@/components/sites/home/FooterArea/page"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useSignUpMutation } from "@/store/features/Website/Signup/SignUpApiSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { Home, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
const CustomerSignUp = () => {


  const router = useRouter()
  const [signup] = useSignUpMutation();
  // const { data: countries } = useCountryListQuery();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().min(1, { message: "Email field is required" }).email("Email not a valid email."),
    password: z.string().min(1, { message: "Password field is required" }),
    confirm_password: z.string(),
    country_id: z.string().nullable(),
    name: z.string({
      required_error: 'Name is required',
    })
  })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      country_id: "US",
      name: ""
    },
  })

  const onSubmitHandler = async (value: any) => {
    try {
      const response: any = await signup({
        ...value,
      });
      if (response?.data?.status === 201) {
        setLoading(true);
        form.reset();
        toast({
          title: "Success",
          description: "Signup Successful",
        })
        router.push("/");
      }
      else if (response?.error?.status === 409) {
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

  const handleRouteChange = () => {
    router.push("/")
  }

  return (
    <div className="">
      {/* header start  */}
      <div className="mb-3 border-b-[1px] border-gray-200">
        <div className="mx-auto px-4 md:w-4/5 ">
          <div className=" flex items-center justify-between py-3">
            <div>
            </div>
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
            <div className="space-y-6 p-4">
              <h4 className=" text-[18px] font-semibold"> Sign up</h4>
              <FormInput
                name="name"
                placeholder="Enter Your name"
                type="name"
              />

              <FormInput
                name="email"
                placeholder="Enter Your Email"
                type="email"
              />
              <FormSelect name="Country" placeholder="Country" data={[{ id: 1, name: "US" }]} />
              <FormInput
                name="password"
                placeholder=" Enter Your Password"
                type="password"
              />
              <FormInput
                name="confirm_password"
                placeholder=" Confirm Password"
                type="password"
              />
              <Button disabled={loading} className="inline-block w-full" type="submit">Sign up</Button>
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

export default CustomerSignUp
