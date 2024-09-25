
import FormInput from "@/components/comon/Form/FormInput"
import useToast from "@/components/hooks/useToast"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { useMenuUpdateMutation } from "@/store/features/admin/menus/MenusApiSlice"
import useAuthStore from "@/store/zustand/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Minus, Pencil, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import FormSelect from "@/components/comon/Form/FormSelect";

const itemsSchema = z.object({
  name: z.string().min(2, {
    message: "This field is required",
  }),
  price: z.string().min(1,{
    message: "This field is required",
    }

  ),

  // id: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
  //   message: "Expected number, received a string"
  // })
})

const formSchema = z.object({
  title: z
    .string().min(2, {
      message: "This field is required",
    }),
  items: z.array(itemsSchema),
  status: z.any().nullable(),

})

const ExtraItemEdit = ({ data }: any) => {
  const [open, setOpen] = useState(false)
  const [updateMenu] = useMenuUpdateMutation()
  const { ToastSuccess, ToastError } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      status: "",
      items: [{
        name: "",
        price: "",
      }]
    },
  })
  const { control } = form
  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const user = useAuthStore((state: any) => state.user)

  async function onSubmit(values: any) {
    let modifyData = {
      details: values.items.map((item: any) => {
        return {
          name: item?.name,
          price: item?.price
        }
      }),
      restaurant_id: user?.user,
      title: values?.title,
      id: data?.id,
      status: values?.status
    }

    try {
      await updateMenu(modifyData).unwrap()
        .then((res) => {
          if (res?.error?.data?.message) {
            ToastError(user?.error?.data?.message)
          }
          if (res.code === 201) {
            setOpen(false)
            ToastSuccess("Updated Successfully");
          }
        })
        .catch((err: any) => {
          ToastError(err?.data?.message)
        })
    } catch (error) { }
  }

  console.log("form", form.formState.errors)

  useEffect(() => {
    form.reset({
      title: data?.title,
      items: data?.details?.map((item: any) => {
        return {
          name: item?.name,
          price: item?.price
        }
      }),
      status: data?.status
    })
  }, [form, form.reset, data])

  const handleReset = () => {
    setOpen(false)
    form.reset()
  }

  return (
    <div>
      <Pencil className=" ml-2 h-[17px] w-[17px] cursor-pointer text-[#00ccbb]" onClick={() => setOpen(true)} />
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger className=" w-full">

      </DialogTrigger> */}
        <DialogContent className=" p-0 ">
          <DialogHeader>
            <DialogTitle className=" border-grey-500 flex items-center justify-center border-b-[1px] py-4">
              <h1>Edit Extra Item</h1>
            </DialogTitle>
            <DialogDescription className=" p-4 ">
              <div className="mt-8 ">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                      <div className=" space-y-2">
                        <Label>Category Title</Label>
                        <FormInput name="title" placeholder="Title" />
                      </div>

                      {/* field array start */}
                      <div className=" grid grid-cols-12 items-center">
                        {fields.map((field, index) => (
                          <div key={field?.id} className=" col-span-12 flex w-full items-center gap-4 md:col-span-11">
                            <div className=" grid w-full grid-cols-12 gap-4">
                              <div className=" col-span-12 md:col-span-11">
                                <div className=" grid grid-cols-12 gap-4">

                                  <div className=" col-span-12 md:col-span-6">
                                    <FormInput name={`items.${index}.name`} placeholder="Name" />
                                  </div>
                                  <div className=" col-span-12 md:col-span-6">
                                    <FormInput type="number" name={`items.${index}.price`} placeholder="Price" />
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
                      <div>
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
                      <div className=" flex items-center justify-between">
                        <Button type="reset" onClick={handleReset} className=" border border-[red] bg-white text-[red] hover:bg-white hover:text-[red]">Cancel</Button>
                        <Button className="inline-block  text-center" type="submit">Update</Button>
                      </div>
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

export default ExtraItemEdit
