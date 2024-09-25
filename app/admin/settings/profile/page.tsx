"use client"
import { FormCardBody } from "@/components/comon/Form"
import FormInput from "@/components/comon/Form/FormInput"
import FormSelect from "@/components/comon/Form/FormSelect"
import useToast from "@/components/hooks/useToast"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useCountryListQuery } from "@/store/features/Website/Country/countryApiSlice"
import { useGetUserInfoQuery, useUserUpdateMutation } from "@/store/features/Website/Signup/SignUpApiSlice"
import useAuthStore from "@/store/zustand/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const Profile = () => {
  const router = useRouter()
  const [userUpdate] = useUserUpdateMutation();
  const { data: countries } = useCountryListQuery();
  const user = useAuthStore((state: any) => state.user)
  const userData = useGetUserInfoQuery(user?.user)
  const [selectedFile, setSelectedFile] = useState<any>()
  const [selectedFileHero, setSelectedFileHero] = useState<any>()
  const [preview, setPreview] = useState()
  const [previewHero, setPreviewHero] = useState()
  const [img, setImg] = useState<any>()
  const [hereimg, setHereimg] = useState<any>()
  const { ToastSuccess, ToastError } = useToast()

  const formSchema = z.object({
    name: z.string().min(1, { message: "This field is required" }),
    email: z.string().min(1, { message: "This field is required" }).email("This is not a valid email."),
    country_id: z.string().min(1, { message: "This field is required" }),
    postcode: z.string().min(1, { message: "This field is required" }),
    phone: z.string().nullable(),
    area: z.string().nullable(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      country_id: "1",
      postcode: "",
      phone: "",
      area: ""
    },
  })

  const onSubmitHandler = async (value: any) => {

    let modifyData = { ...value, id: user?.user, image: img ? img : "", hero_seaction: hereimg ? hereimg : "" }


    try {
      await userUpdate(modifyData).unwrap()
        .then((res) => {
          if (res.code === 201) {
            ToastSuccess("profile Update Successfully");
          }
          if (res?.error?.data?.message) {
            ToastError(res?.error?.data?.message)
          }
        })
        .catch((err: any) => {
          if (err?.data?.message) {
            ToastError(err?.data?.message)
          }

        })
    } catch (error) { }

  }

  useEffect(() => {
    form.reset({
      name: userData?.data?.name,
      postcode: userData?.data?.postcode,
      country_id: String(userData?.data?.country_id),
      phone: userData?.data?.phone,
      email: userData?.data?.email,
      area: userData?.data?.area
    })
  }, [form.reset, userData])

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl: any = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])


  const onSelectFile = (e: any) => {

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    const data = new FileReader()
    data.addEventListener('load', () => {
      setImg(data.result)
    })
    data.readAsDataURL(e.target.files[0])
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0])
  }


  ///Hero Section 
  useEffect(() => {
    if (!selectedFileHero) {
      setPreviewHero(undefined)
      return
    }
    const objectUrl: any = URL.createObjectURL(selectedFileHero)
    setPreviewHero(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFileHero])

  const onSelectFileHero = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFileHero(undefined)
      return
    }

    const data = new FileReader()
    data.addEventListener('load', () => {
      setHereimg(data.result)
    })
    data.readAsDataURL(e.target.files[0])
    setSelectedFileHero(e.target.files[0])
  }


  return (
    <div>
      {/* header section start */}
      <div className=" h-[300px]">
        <div className="profile_header_wrapper relative " style={{ backgroundImage: `url(${process.env.IMAGE_URL}${userData?.data?.hero_seaction})` }} >
          <div className="grid place-items-center ">
            <Label className="h-[250px] w-full cursor-pointer  ">
              <input type='file' onChange={onSelectFileHero} className=" hidden h-[300px] w-full  p-10" />
              {
                selectedFileHero ?
                  <img src={previewHero} alt='uploded image' className=" h-[300px] w-full  " />
                  : <>
                    {
                      userData?.data?.hero_seaction ?
                        <img src={`${process.env.IMAGE_URL}${userData?.data?.hero_seaction}`} alt='uploaded image' className=" h-[150px] w-full " />
                        :
                        <User className=" h-[300px] w-full " />
                    }

                  </>
              }

            </Label>
          </div>

          <div className=" absolute bottom-12 left-12 flex items-center gap-6">
            <Label className=" h-[150px] w-[150px] cursor-pointer rounded-full border-0 bg-gray-300 ">
              <input type='file' onChange={onSelectFile} className=" hidden h-[150px] w-[150px] border-0 bg-gray-300 p-10" />

              {
                selectedFile ?
                  <img src={preview} alt='uploaded image' className=" h-[150px] w-[150px] rounded-full border-2 border-solid border-[#fff]" />
                  : <>
                    {
                      userData?.data?.image ?
                        <img src={`${process.env.IMAGE_URL}${userData?.data?.image}`} alt='uploded image' className=" h-[150px] w-[150px] rounded-full border-2 border-solid border-[#fff]" />
                        :
                        <User className=" h-[150px] w-[150px] rounded-full border-2 border-solid border-[#fff]" />
                    }

                  </>
              }

            </Label>
            <div>
              <h1 className=" text-[35px] font-bold text-[#fff]">{userData?.data?.name}</h1>
              <p className=" text-[white]">We are open 24/7</p>
            </div>
          </div>
        </div>
      </div>
      {/* header section end */}

      {/* body start  */}
      <div className=" bg-[#f8f9fa] p-8">
        <div className=" rounded-md bg-white p-4 shadow-md">
          <FormCardBody
            validation={form}
            onSubmitHandler={form.handleSubmit(onSubmitHandler)}
          >
            <div className="space-y-6">
              <h4 className=" text-[18px] font-semibold"> Update Information</h4>
              <div className=" grid grid-cols-2 gap-4">

                <div className=" col-span-2 md:col-span-1">
                  <FormInput
                    name="name"
                    placeholder="Enter Your Name"
                    type="text"
                  />
                </div>

                <div className=" col-span-2 md:col-span-1">
                  <FormInput
                    disabled={"true"}
                    name="email"
                    placeholder="Enter Your Email"
                    type="email"
                  />
                </div>

                <div className=" col-span-2 md:col-span-1">
                  <FormInput
                    name="phone"
                    placeholder=" Enter Your Phone Number"
                  />
                </div>

                <div className=" col-span-2 md:col-span-1">
                  <FormSelect name="country_id" data={countries?.data} />
                </div>

                <div className=" col-span-2 md:col-span-1">
                  <FormInput
                    name="postcode"
                    placeholder=" Enter Your Zip Code"
                  />
                </div>

                <div className=" col-span-2 md:col-span-1">
                  <FormInput
                    name="area"
                    placeholder=" Enter Your Area"
                  />
                </div>

              </div>
              <div className=" flex items-center  justify-end">
                <Button className="inline-block w-[120px]" type="submit">Update</Button>
              </div>

            </div>
          </FormCardBody>
        </div>
      </div>
      {/* body end  */}

    </div>
  )
}

export default Profile
