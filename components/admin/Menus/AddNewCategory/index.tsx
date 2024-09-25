// import FormTextArea from '@/components/common/form/FormTextArea'
import FormInput from '@/components/comon/Form/FormInput'
import FormTextArea from '@/components/comon/Form/FormTextArea'
import useToast from '@/components/hooks/useToast'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCategoryCreateMutation } from '@/store/features/admin/menus/MenusApiSlice'
import useAuthStore from '@/store/zustand/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Image, Plus } from 'lucide-react'
import Link from "next/link"
import {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"


const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    }),
  image: z
    .string()
    .min(1, {
      message: "Image is required",
    })
  ,

})

const AddNewCategory = () => {
  const [createCategory] = useCategoryCreateMutation();
  const [open, setOpen] = useState(false)
  const { ToastSuccess, ToastError } = useToast()
  const [preview, setPreview] = useState()

  const [img, setImg] = useState<any>()
  const [selectedFile, setSelectedFile] = useState<any>()
  const user = useAuthStore((state: any) => state.user)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let modifyData = { ...values, restaurant_id: user?.user }

    try {
      const response: any = await createCategory(modifyData);

      if (response?.data?.code === 200) {
        ToastSuccess("Category has been created")
        setOpen(false);
        form.reset()
      }
      if (response?.error?.data?.message) {
        ToastError(response?.error?.data?.message)
      }

    } catch (err: any) {
      if (err?.data?.message) {
        ToastError(err?.data?.message)
      }
    }
  }
  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    const data = new FileReader()
    data.addEventListener('load', () => {
      setImg(data.result)
      form.setValue("image", data?.result?.toString() || "");
      form.setError("image", {
        message: ""
      });

    })
    data.readAsDataURL(e.target.files[0])
    setSelectedFile(e.target.files[0])
  }

  const handleReset = () => {
    setOpen(false)
    form.reset()
  }

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl: any = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  return (
    <div>
      {/* add new card button start */}
      <Button className=" mt-5 w-full border-[1px] border-dashed border-gray-200 bg-white p-10 text-[#00b1a2] hover:bg-transparent" onClick={() => setOpen(true)}>
        <Plus />
        Add New Menu
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger className=" w-full">

        </DialogTrigger> */}
        <DialogContent className=" p-0 ">
          <DialogHeader>
            <DialogTitle className=" border-grey-500 flex items-center justify-center border-b-[1px] py-4">
              <h1>New Menu</h1>
            </DialogTitle>
            <DialogDescription className=" p-4 ">
              <div className="mt-8 ">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className=" border-grey-500 space-y-4 border-b-[1px] pb-5">
                      <div className=" grid grid-cols-2 gap-2 border-[1px] border-gray-200 p-2">
                        <Label className=" h-full cursor-pointer border-0 bg-gray-300 p-10">
                          {!preview && <Image className=" h-[100px] w-full" />}
                          {selectedFile && <img src={preview} alt='uploded image' className='h-[100px] w-full' />}
                          <FormField
                            name="image"
                            render={({ field }) => (
                              <FormItem className="mt-2">
                                <FormControl>
                                  <Input type='file' onChange={onSelectFile} className=" hidden h-full border-0 bg-gray-300 p-10" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </Label>

                        <div className=" m-2">
                          <h5 className=" mb-2 text-[16px] font-medium">Make sure the item is:</h5>
                          <div className=" space-y-2 text-gray-400">
                            <div>Ready to serve</div>
                            <div>Brightly</div>
                            <div>Large and centred</div>
                          </div>
                          <Link href="#" className=" mt-4 block text-[#00c5b4]">See examples</Link>
                        </div>
                      </div>
                      {/*<div className=" grid grid-cols-2 gap-2 border-[1px] border-gray-200 p-2">*/}

                      {/*  <Label className=" h-full cursor-pointer border-0 bg-gray-300 p-10">*/}
                      {/*    {!preview && <Image className=" h-[100px] w-full" />}*/}

                      {/*    {(selectedFile && preview) && <img src={preview} alt='uploded image' className='h-[100px] w-full' />}*/}

                      {/*    <FormField*/}
                      {/*      name="image"*/}
                      {/*      render={({ field }) => (*/}
                      {/*        <FormItem className="mt-2">*/}
                      {/*          <FormControl>*/}
                      {/*            <Input type='file' onChange={onSelectFile} className=" hidden h-full border-0 bg-gray-300 p-10" />*/}
                      {/*          </FormControl>*/}
                      {/*          <FormMessage />*/}
                      {/*        </FormItem>*/}
                      {/*      )}*/}
                      {/*    />*/}
                      {/*  </Label>*/}

                      {/*  <div className=" m-2">*/}
                      {/*    <h5 className=" mb-2 text-[16px] font-medium">Make sure the item is:</h5>*/}
                      {/*    <div className=" space-y-2 text-gray-400">*/}
                      {/*      <div>Ready to serve</div>*/}
                      {/*      <div>Brightly</div>*/}
                      {/*      <div>Large and centred</div>*/}
                      {/*    </div>*/}
                      {/*    <Link href="#" className=" mt-4 block text-[#00c5b4]">See examples</Link>*/}
                      {/*  </div>*/}
                      {/*</div>*/}
                      <div className="space-y-2 ">
                        <Label className=" text-[16px] text-[#353939]">
                          Name
                        </Label>
                        <FormInput
                          name="name"
                          placeholder="Weekly specials"
                        />
                      </div>
                      <div className="space-y-2 ">
                        <Label className=" text-[16px] text-[#353939]">
                          Description
                        </Label>
                        <FormTextArea name="description"
                          placeholder="description" />
                      </div>
                    </div>

                    <div className=" mt-5 flex items-center justify-between">
                      <Button className=" bg-white text-[#00ccbb] hover:bg-white" onClick={handleReset}>Cancel</Button>
                      <Button className=" py-1" type="submit">Add Menu</Button>
                    </div>
                  </form>
                </Form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* add new card button end */}</div>
  )
}

export default AddNewCategory
