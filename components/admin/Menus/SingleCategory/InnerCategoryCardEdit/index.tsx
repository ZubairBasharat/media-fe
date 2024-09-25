import { FormAutoCompleteNew } from "@/components/comon/Form/FormAutoCompleteNew"
import FormCheckbox from "@/components/comon/Form/FormCheckbox"
import FormInput from "@/components/comon/Form/FormInput"
import FormRadio from "@/components/comon/Form/FormRadio"
import FormSelect from "@/components/comon/Form/FormSelect"
import FormTextArea from "@/components/comon/Form/FormTextArea"
import useToast from "@/components/hooks/useToast"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { useInnerCategoryCardUpdateMutation, useMenuListQuery } from "@/store/features/admin/menus/MenusApiSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { Minus, Pencil, Plus } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

const itemsSchema = z.object({
  name: z.string().nullable(),
  price: z.string().nullable(),
})

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
  tax: z
    .string().nullable()
  ,
  pos: z
    .string().nullable()
  ,
  preparation_time: z
    .string().nullable()
  ,
  age_restricted: z
    .string().nullable(),
  oder_per_day: z
    .string().nullable(),
  extra_item_id: z.any(),
  variant: z.boolean().nullable(),
  item_details: z.array(itemsSchema),
  status: z.string().nullable()
})

const InnerCategoryCardEdit = ({ data, parent_id }: any) => {
  const [open, setOpen] = useState(false)
  const [updateCategory] = useInnerCategoryCardUpdateMutation()
  const [selectedFile, setSelectedFile] = useState<any>()
  const [preview, setPreview] = useState()
  const [img, setImg] = useState<any>()
  const { data: listData } = useMenuListQuery()
  const [extraItemModify, setExtraItemModify] = useState<any>()
  const { ToastSuccess, ToastError } = useToast()
  const [loading, setLoading] = useState(false);

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
      preparation_time: "",
      oder_per_day: "",
      variant: false,
      extra_item_id: "",
      status: "",
      item_details: [{
        name: "",
        price: "",
      }]
    },
  })

  const { control } = form
  const { fields, append, remove } = useFieldArray({ control, name: "item_details" });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let modifyData = { ...values, id: data?.id, status: Number(values?.status), menu_id: parent_id, image: img ? img : "", price: Number(values?.price) }

    try {
      await updateCategory(modifyData).unwrap()
        .then((res) => {
          if (res.code === 201) {
            setOpen(false)
            ToastSuccess("Update Successfully");
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
      name: data?.name,
      description: data?.description,
      age_restricted: data?.age_restricted,
      pos: data?.pos,
      preparation_time: data?.preparation_time,
      price: data?.price,
      tax: data?.tax,
      oder_per_day: data?.oder_per_day,
      variant: data?.variant == 1 && true,
      item_details: data?.item_details,
      extra_item_id: data?.extra_assigns?.map((singleItem: any) => String(singleItem?.extra_item_id)),
      status: data?.status?.toString()

    })
  }, [data])


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
    setSelectedFile(e.target.files[0])
  }

  useEffect(() => {
    if (!open) {
      setSelectedFile("")
    }
  }, [open])

  const handleReset = () => {
    setOpen(false)
    form.reset()
  }

  console.log("form", form.formState.errors);

  return (
    <div>
      <Pencil className=" ml-2 h-[17px] w-[17px] cursor-pointer text-[#00ccbb]" onClick={() => setOpen(true)} />
      <Dialog open={open} onOpenChange={setOpen}>

        <DialogContent className=" h-screen overflow-y-auto p-0">
          <DialogHeader>
            <DialogTitle className=" border-grey-500 flex items-center justify-center border-b-[1px] py-4">
              <h1>Edit Item</h1>
            </DialogTitle>
            <DialogDescription className=" p-4 ">
              <div className="">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className=" border-grey-500 space-y-6 border-b-[1px] pb-5">
                      <div className=" grid grid-cols-2 gap-2 border-[1px] border-gray-200 p-2">

                        <Label className=" h-full cursor-pointer border-0 bg-gray-300 p-10">
                          <input type='file' onChange={onSelectFile} className=" hidden h-full border-0 bg-gray-300 p-10" />
                          {selectedFile ? <img src={preview} alt='uploded image' className='h-[100px] w-full' /> : <img src={`${process.env.IMAGE_URL}${data?.image}`} alt='uploded image' className='h-[100px] w-full' />}
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
                        <div><div className="space-y-2 ">
                          <Label className=" text-[16px] text-[#353939]">
                            Price
                          </Label>
                          <FormInput
                            type="number"
                            name="price"
                            placeholder="0"
                          />
                        </div></div>
                        <div><div className="space-y-2 ">
                          <Label className=" text-[16px] text-[#353939]">
                            Tax rate
                          </Label>
                          <FormInput
                            type="number"
                            name="tax"
                            placeholder="0"
                          />
                        </div></div>
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
                              Order per day
                            </Label>
                            <FormInput
                              name="oder_per_day"
                              placeholder="order"
                            />
                          </div>
                        </div>
                        <div className=" col-span-2 md:col-span-1">
                          <div className="space-y-2 ">
                            <Label className=" text-[16px] text-[#353939]">
                              Preparation Time (Min)
                            </Label>
                            <FormInput
                              name="preparation_time"
                              placeholder="Min"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        {/* <div className="space-y-2 ">
                          <Label className=" text-[16px] text-[#353939]">
                            Extra Item
                          </Label>
                          <FormSelect name="extra_item_id" data={[{ id: 1, name: "test" }, { id: 2, name: "test2" }]} placeholder="Select Extra Item" />
                        </div> */}
                      </div>

                      <div>
                        <div className="space-y-2 ">
                          <Label className=" text-[16px] text-[#353939]">
                            Is this alcohol, or another age-restricted product?
                          </Label>
                          <FormRadio name="age_restricted" />
                        </div>
                      </div>
                      <div>
                        <div className="space-y-2 ">
                          <Label className=" text-[16px] text-[#353939]">
                            Status
                          </Label>
                          <div>
                            <FormSelect name="status" placeholder="Status" data={[{ id: 1, name: "Active" }, { id: 0, name: "Inactive" }]} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="space-y-2 ">
                          <Label className=" text-[16px] text-[#353939]">
                            Extra Item
                          </Label>

                          <FormAutoCompleteNew
                            name="extra_item_id"
                            data={extraItemModify}
                            placeholder="Item"
                            isMulti={true}
                          />
                        </div>
                      </div>
                      <div>
                        <FormCheckbox name="variant" label="Variant" />
                      </div>
                      {form.watch("variant") && <div>
                        {/* field array start */}
                        <div className=" grid grid-cols-12 items-center">
                          {fields.map((field, index) => (
                            <div key={field?.id} className=" col-span-12 flex w-full items-center gap-4 md:col-span-11">
                              <div className=" grid w-full grid-cols-12 gap-4">
                                <div className=" col-span-12 md:col-span-11">
                                  <div className=" grid grid-cols-12 gap-4">

                                    <div className=" col-span-12 md:col-span-6">
                                      <FormInput name={`item_details.${index}.name`} placeholder="Name" />
                                    </div>
                                    <div className=" col-span-12 md:col-span-6">
                                      <FormInput type="number" name={`item_details.${index}.price`} placeholder="Price" />
                                    </div>
                                  </div>
                                </div>
                                <div className=" col-span-12 flex items-center justify-end md:col-span-1">
                                  <Button type="button" className=" mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]" onClick={() => remove(index)}><Minus /></Button>
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className=" col-span-12 mt-2 flex items-center justify-center md:col-span-1">
                            <Button
                              className=" w-full rounded-md  p-[9px] text-center text-white md:w-[30px]"
                              type="button"
                              onClick={() => {
                                append({
                                  name: "",
                                  price: "",
                                });
                              }}
                            >
                              <div className=" flex items-center justify-center">
                                <Plus className=" h-[20px] w-[20px]" />
                              </div>
                            </Button>
                          </div>

                        </div>
                        {/* field array end */}
                      </div>}
                      <div>
                        {/* <div className="space-y-2 ">
                          <Label className=" text-[16px] text-[#353939]">
                            Status
                          </Label>
                          <div>
                            <FormSelect name="status" placeholder="Status" data={[{ id: 1, name: "Active" }, { id: 0, name: "Inactive" }]} />
                          </div>
                        </div> */}
                      </div>

                    </div>
                    <div className=" mt-5 flex items-center justify-between">
                      <Button className=" bg-white text-[#00ccbb] hover:bg-white" type="reset" onClick={handleReset}>Cancel</Button>
                      <Button className=" py-1">Edit Item</Button>
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

export default InnerCategoryCardEdit
