"use client"

import { FormCardBody } from "@/components/comon/Form"
import FormInput from "@/components/comon/Form/FormInput"
import FormSelect from "@/components/comon/Form/FormSelect"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCountryListQuery } from "@/store/features/Website/Country/countryApiSlice"
import { useSignInMutation } from "@/store/features/Website/SignIn/SignInApiSlice"
import { useSignUpMutation } from "@/store/features/Website/Signup/SignUpApiSlice"
import { addAuthInformation } from "@/store/features/auth"
import { useAppDispatch } from "@/store/useReduxStore"
import useAuthStore from "@/store/zustand/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const CustomerSignUpCart = () => {
    const router = useRouter()
    const [signup] = useSignUpMutation();
    const { data: countries } = useCountryListQuery();
    const [loginError, setLoginError] = useState("");
    const [loginMethod] = useSignInMutation();
    const { setUser } = useAuthStore((state: any) => state);
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const formSchema = z.object({
        email: z.string().min(1, { message: "Email  is required" }).email("This is not a valid email."),
        password: z.string().min(1, { message: "Password is required" }),
        confirm_password: z.string(),
        country_id: z.string().min(1, { message: "Country  is required" }),
        postcode: z.string().min(1, { message: "Postcode field is required" }),
        phone: z.string().nullable(),
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
            country_id: "1",
            postcode: "",
            phone: "",
            name: ""
        },
    })

    async function loginHandler(values: any) {
        try {
            const user: any = await loginMethod(values);
            if (user?.data?.code === 200) {
                setUser(user?.data?.data);
                dispatch(addAuthInformation(user?.data?.data));
                Cookies.set("token", user?.data?.data?.access_token);
                Cookies.set("user_type", user?.data?.data?.user_type);
                console.log(user?.data?.data?.user_type);
                router.push("/cart");
            }

            if (user?.error?.data?.code === 400) {
                setLoginError(user?.error?.data?.errors?.[0]?.message?.[0]);
            }
        } catch (err) {
            console.log("err ", err);
        }
    }

    const onSubmitHandler = async (value: any) => {
        try {
            setLoading(true);
            const response: any = await signup({
                ...value,
                type: "customer"
            });

            if (response?.data?.code === 201) {
                form.reset();
                toast({
                    title: "Success",
                    description: "Signup Successful",
                })
                // router.push("/");
                loginHandler({
                    email: value?.email,
                    password: value?.password
                });
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

    const handleRouteChange = () => {
        router.push("/")
    }

    return (
        <div className="">
            {/* form start */}
            <div className=" flex h-full  items-center justify-center">
                <div className=" my-[10px] w-[500px]">
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
                            <FormInput
                                name="phone"
                                placeholder=" Enter Your Phone Number"
                            />
                            <FormSelect name="country_id" data={countries?.data} placeholder="Select Country" />
                            <FormInput
                                name="postcode"
                                placeholder=" Enter Your Zip Code"
                            />
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
                            <Button className="inline-block w-full" disabled={loading} type="submit">Sign up</Button>
                        </div>
                    </FormCardBody>
                </div>
            </div>
            {/* form end */}
        </div>
    )
}

export default CustomerSignUpCart
