"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import FormInput from "@/components/comon/Form/FormInput"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { useMenuCreateMutation } from "@/store/features/admin/menus/MenusApiSlice"
import useAuthStore from "@/store/zustand/auth"
import { Minus, Plus } from "lucide-react"

const itemsSchema = z.object({
  name: z.string().min(2, {
    message: "This field is required",
  }),
  price: z.string().nullable(),
  id: z.string().nullable(),
})

const formSchema = z.object({
  title: z
    .string().min(2, {
      message: "This field is required",
    }),
  items: z.array(itemsSchema),

})

const ExtraItemFrom = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      items: [{
        name: "",
        price: "",
        id: ""
      }]
    },
  })
  const { control } = form
  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const [createCategory] = useMenuCreateMutation();
  const user: any = useAuthStore((state: any) => state.user)


  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const modifyData = {
      ...values, details: values.items?.map((item: any) => {
        return {
          id: Number(item.id),
          name: item?.name,
          price: item?.price
        }
      }),
      restaurant_id: user?.user
    }
    try {
      const user: any = await createCategory(modifyData);
      if (user?.data?.code === 200) {
        form.reset()
      }
    } catch (err) {
      console.log("err ", err);
    }
  }
  return (
    <div className=" rounded-md bg-white p-4 shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className=" space-y-2">
              <Label>Category Title</Label>
              <FormField
                control={form.control}
                name="title"
                render={({ field }: any) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>

            {/* field array start */}
            <div className=" grid grid-cols-12 items-center">
              {fields.map((field, index) => (
                <div key={field?.id} className=" col-span-12 flex w-full items-center gap-4 md:col-span-11">
                  <div className=" grid w-full grid-cols-12 gap-4">
                    <div className=" col-span-12 md:col-span-11">
                      <div className=" grid grid-cols-12 gap-4">
                        <div className=" col-span-12 md:col-span-4">
                          <FormInput type="text" name={`items.${index}.id`} placeholder="id" />
                        </div>
                        <div className=" col-span-12 md:col-span-4">
                          <FormInput name={`items.${index}.name`} placeholder="Name" />
                        </div>
                        <div className=" col-span-12 md:col-span-4">
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
                      id: ""
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
            <Button className="inline-block w-full text-center" type="submit">Add Item</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ExtraItemFrom
