
"use client"

import FormInput from "@/components/comon/Form/FormInput"
import { Button } from "@/components/ui/button"
import { useSignInMutation } from "@/store/features/Website/SignIn/SignInApiSlice"
import { addAuthInformation } from "@/store/features/auth"
import { useAppDispatch } from "@/store/useReduxStore"
import useAuthStore from "@/store/zustand/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"

type Props = {
    redrect?: string
}

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

const CustomerLogin = (props: Props) => {
    const router = useRouter()
    const [loginError, setLoginError] = useState("");
    const [loginMethod] = useSignInMutation();
    const { setUser } = useAuthStore((state: any) => state);
    const dispatch = useAppDispatch();
    const user = useAuthStore((state: any) => state.user)
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
                Cookies.set("user_type", 'customer');
                console.log(user?.data?.user?.user_type);
                router.push("/");
            }
            // router.push("/");

            if (user?.error?.data?.code === 400) {
                setLoginError(user?.error?.data?.errors?.[0]?.message?.[0]);
            }
        } catch (err) {
            console.log("err ", err);
        }
    }



    return (
        <div className=" flex h-full  items-center justify-center">
            <div className=" my-[100px] w-[500px]">
                <FormProvider {...form}>
                    <form onSubmit={form?.handleSubmit(onSubmitHandler)}>
                        <div className="space-y-6">
                            <h4 className=" text-[18px] font-semibold"> Login</h4>
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
                            <Button type="submit" className="inline-block w-full" >Login</Button>
                            <Link href={"#"} className=" block text-center text-[#00ccbb]">Forgot Password</Link>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default CustomerLogin