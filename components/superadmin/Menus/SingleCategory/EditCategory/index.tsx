import FormInput from "@/components/comon/Form/FormInput"
import FormTextArea from "@/components/comon/Form/FormTextArea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { useCategorySingleQuery, useCategoryUpdateMutation } from "@/store/features/admin/menus/MenusApiSlice"
import useAuthStore from "@/store/zustand/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
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

})

const EditCategory = ({ data }: any) => {
  const [open, setOpen] = useState(false)
  const [updateCategory] = useCategoryUpdateMutation()
  const user = useAuthStore((state: any) => state.user)

  const { data: singleData } = useCategorySingleQuery(data?.id, {
    skip: open ? false : true,
    refetchOnMountOrArgChange: open && true
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let modifyData = { ...values, id: data?.id, status: data?.status, restaurant_id: user?.user }
    try {
      await updateCategory(modifyData).unwrap()
        .then((res) => {
          if (res.code === 200) {
            setOpen(false)
          }
        })
        .catch((err: any) => {
          console.log("err", err);

        })
    } catch (error) { }
  }

  useEffect(() => {
    form.reset({
      name: singleData?.data?.name,
      description: singleData?.data?.description,
    })
  }, [form, form.reset, singleData])

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
              <h1>Edit Menu</h1>
            </DialogTitle>
            <DialogDescription className=" p-4 ">
              <div className="mt-8 ">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className=" border-grey-500 space-y-4 border-b-[1px] pb-5">
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
                      <Button className=" bg-white text-[#00ccbb] hover:bg-white" type="reset" onClick={handleReset}>Cancel</Button>
                      <Button className=" py-1" type="submit">Update category</Button>
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

export default EditCategory
