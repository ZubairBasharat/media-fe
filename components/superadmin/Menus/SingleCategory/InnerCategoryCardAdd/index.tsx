import { FormAutoCompleteNew } from '@/components/comon/Form/FormAutoCompleteNew'
import FormInput from '@/components/comon/Form/FormInput'
import FormRadio from '@/components/comon/Form/FormRadio'
import FormTextArea from '@/components/comon/Form/FormTextArea'
import useToast from '@/components/hooks/useToast'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCategoryNewCarItemCreateMutation, useMenuListQuery } from '@/store/features/admin/menus/MenusApiSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { Image, Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
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
  price: z
    .string()
    .min(1, {
      message: "Price is required",
    })
  ,
  image: z
    .string()
    .min(1, {
      message: "Image is required",
    })
  ,
  tax: z
    .string()
  ,
  pos: z
    .string()
  ,
  tag: z
    .string()
  ,
  discount_price: z
    .string()
  ,
  age_restricted: z
    .string(),
  oder_per_day: z
    .string(),
  extra_item_id: z.string().array().optional()

})

const InnerCategoryCardAdd = ({ data }: any) => {
  const [open, setOpen] = useState(false)
  const { ToastSuccess, ToastError } = useToast()
  const [addNewItem] = useCategoryNewCarItemCreateMutation();
  const [selectedFile, setSelectedFile] = useState<any>()
  const [preview, setPreview] = useState()
  const [img, setImg] = useState<any>()
  const { data: listData } = useMenuListQuery()
  const [extraItemModify, setExtraItemModify] = useState<any>()

  useEffect(() => {
    const modifyData = listData?.map((singleItem: any) => {
      return {
        value: singleItem?.id,
        label: singleItem?.title
      }
    })
    setExtraItemModify(modifyData)

  }, [listData])


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      tax: "",
      pos: "",
      oder_per_day: "",
      image: "",
      extra_item_id: [],
      discount_price: "",
      tag: ""
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    let modifyData = { ...values, menu_id: data?.id, image: img ? img : "", price: Number(values?.price) }

    try {
      const response: any = await addNewItem(modifyData);

      if (response?.data?.code === 200) {
        ToastSuccess("New Item has been created")
        setOpen(false);
        form.reset()

      }

    } catch (err) {
      console.log("err ", err);
    }
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


  return (
    <div className=" col-span-12 border-[1px] border-dashed border-gray-200 p-4  md:col-span-6 lg:col-span-4">
      <Button className="  flex h-full  w-full items-center justify-center bg-white text-[#00b1a2] hover:bg-transparent" onClick={() => setOpen(true)}>
        <Plus />
        Add New Item
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" h-screen overflow-y-auto p-0">
          <DialogHeader>
            <DialogTitle className=" border-grey-500 flex items-center justify-center border-b-[1px] py-4">
              <h1>New Item</h1>
            </DialogTitle>
            <DialogDescription className=" p-4 ">
              <div className="mt-5">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className=" border-grey-500 space-y-6 border-b-[1px] pb-5">
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

                      <div className="space-y-2 ">
                        <Label className=" text-[16px] text-[#353939]">
                          Name
                        </Label>
                        <FormInput
                          name="name"
                          placeholder="name"
                        />
                      </div>

                      <div className="space-y-2 ">
                        <Label className=" text-[16px] text-[#353939]">
                          Description
                        </Label>
                        <FormTextArea name="description"
                          placeholder="description" />
                      </div>

                      <div className=" grid grid-cols-2 gap-4">
                        <div className=" col-span-2 md:col-span-1">
                          <div className="space-y-2 ">
                            <Label className=" text-[16px] text-[#353939]">
                              Price
                            </Label>
                            <FormInput
                              type="number"
                              name="price"
                              placeholder="0"
                            />
                          </div>
                        </div>

                        <div className=" col-span-2 md:col-span-1">
                          <div className="space-y-2 ">
                            <Label className=" text-[16px] text-[#353939]">
                              Discount Price
                            </Label>
                            <FormInput
                              name="discount_price"
                              placeholder="Discountable Price"
                            />
                          </div>
                        </div>
                      </div>

                      <div className=" grid grid-cols-2 gap-4">
                        <div className=" col-span-2 md:col-span-1">
                          <div className="space-y-2 ">
                            <Label className=" text-[16px] text-[#353939]">
                              Point of Sale ID(PLU)
                            </Label>
                            <FormInput
                              name="pos"
                              placeholder="E.g 172467"
                            />
                          </div>
                        </div>

                        <div className=" col-span-2 md:col-span-1">
                          <div className="space-y-2 ">
                            <Label className=" text-[16px] text-[#353939]">
                              Max Order per day
                            </Label>
                            <FormInput
                              name="oder_per_day"
                              placeholder="order"
                            />
                          </div>
                        </div>
                      </div>
                      <div className=" grid grid-cols-2 gap-4">

                        <div className=" col-span-2 md:col-span-1">
                          <div className="space-y-2 ">
                            <Label className=" text-[16px] text-[#353939]">
                              Tax rate
                            </Label>
                            <FormInput
                              type="number"
                              name="tax"
                              placeholder="0"
                            />
                          </div>
                        </div>

                        <div className=" col-span-2 md:col-span-1">
                          <div className="space-y-2 ">
                            <Label className=" text-[16px] text-[#353939]">
                              Tag
                            </Label>
                            <FormInput
                              name="tag"
                              placeholder="order"
                            />
                          </div>
                        </div>
                      </div>


                      <div>
                        <div className="space-y-2 ">
                          <Label className=" text-[16px] text-[#353939]">
                            Extra Item
                          </Label>
                          {/* <FormSelect name="extra_item_id" data={extraItemModify} placeholder="Select Extra Item" /> */}

                          <FormAutoCompleteNew
                            name="extra_item_id"
                            data={extraItemModify}
                            placeholder="Item"
                            isMulti={true}
                          // singleListName="district"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="space-y-2 ">
                          <Label className=" text-[16px] text-[#353939]">
                            Is this alcohol, or another age-restricted product?
                          </Label>
                          <FormRadio name="age_restricted" />
                        </div>
                      </div>

                    </div>

                    <div className=" mt-5 flex items-center justify-between">
                      <Button className=" bg-white text-[#00ccbb] hover:bg-white" type="button" onClick={handleReset}>Cancel</Button>
                      <Button className=" py-1">Add Item</Button>
                    </div>
                  </form>
                </Form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default InnerCategoryCardAdd
