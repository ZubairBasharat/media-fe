"use client"

import ViewListItem from "@/components/common/ViewListItem";
import FormInput from "@/components/comon/Form/FormInput";
import FormSelect from "@/components/comon/Form/FormSelect";
import useToast from "@/components/hooks/useToast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useRestaurantListQuery, useRestaurantUpdateMutation } from "@/store/features/admin/restaurants/restaurantApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DeleteIcon, EditIcon, ViewIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Restaurant = {
  name: string
  shop_address: string
  city: number
  postcode: number
  status: string
}

const formSchema = z.object({
  id: z
    .string().nullable(),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    }),
  city: z
    .string()
    .min(2, {
      message: "City must be at least 2 characters.",
    }),
  postcode: z
    .string()
    .min(2, {
      message: "PostCode must be at least 2 characters.",
    }),
  shop_address: z
    .string()
    .min(2, {
      message: "Shop Address must be at least 2 characters.",
    }),
  status: z
    .string()
    .min(1, {
      message: "Status is required",
    }),
})

const Order = () => {
  const { data: restaurantList } = useRestaurantListQuery()
  const [data, setData] = useState([])
  const { ToastSuccess, ToastError } = useToast()
  const [updateRestaurant] = useRestaurantUpdateMutation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (restaurantList?.data?.length > 0) {
      setData(restaurantList?.data)
    }
  }, [restaurantList])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      shop_address: "",
      city: "",
      postcode: "",
      status: ""
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let modifyData = { ...values, status: Number(values.status) }

    try {
      const response: any = await updateRestaurant(modifyData);


      if (response?.data?.code === 201) {
        ToastSuccess("Restaurant data has been updated")
        form.reset()
        setOpen(false);
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


  const columnHelper = createColumnHelper<Restaurant>()

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: "Name",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('shop_address', {
        header: "Shop Address",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('city', {
        header: "City",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('postcode', {
        header: "PostCode",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('status', {
        header: "Status",
        cell: ({ row }: any) => {
          return (
            <div className=" flex items-center justify-center space-x-3">
              {row?.original?.status === 1 ? "Active" : "InActive"}
            </div>
          )
        },
      }),
      columnHelper.accessor(() => "", {
        id: "action",
        header: "Action",
        cell: ({ row }: any) => {
          const viewData = row.original || {};
          return (
            <div className="flex flex-start space-x-5">
              <span className="cursor-pointer">
                <Dialog>
                  <DialogTrigger>
                    <ViewIcon />
                  </DialogTrigger>
                  <DialogContent className="max-w-[1000px] w-full">
                    <div>
                      <h2 className="mb-6">Restaurant Info</h2>
                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-2">
                          <div className="w-[100px] md:w-full mx-auto min-h-[110px]">
                            {viewData?.image}
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-10">
                          <div className="border rounded-lg p-4 border-dashed border-gray-300 bg-gray-200 md:space-y-6">
                            <div className="grid grid-col-2 md:grid-cols-2">
                              <ViewListItem name="Name" value={viewData?.name} />
                              <ViewListItem name="Shop Address" value={viewData?.shop_address} />
                            </div>
                            <div className="grid grid-col-2 md:grid-cols-2">
                              <ViewListItem name="City" value={viewData?.city} />
                              <ViewListItem name="PostCode" value={viewData?.postcode} />
                            </div>
                            <div className="grid grid-col-2 md:grid-cols-2">
                              <ViewListItem name="Status" value={viewData?.status === 1 ? "Active" : "InActive"} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </span>
              <span className=" cursor-pointer">
                <EditIcon onClick={() => {
                  setOpen(true);
                  form.reset({
                    id: viewData?.id?.toString(),
                    name: viewData?.name,
                    shop_address: viewData?.shop_address,
                    city: viewData?.city,
                    postcode: viewData?.postcode,
                    status: viewData?.status?.toString()
                  });
                }} />
                <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                  <DialogContent className="max-w-[500px] w-full">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div>
                          <h2 className="mb-6">Edit Restaurant</h2>
                          <div className=" border-grey-500 space-y-4 border-b-[1px] pb-5">
                            <div className="grid grid-cols-12 items-center">
                              <div className="col-span-4">
                                <Label className=" text-[16px] text-[#353939] mt-4">
                                  Name
                                </Label>
                              </div>
                              <div className="col-span-8">
                                <FormInput name="name" placeholder="Name" />
                              </div>
                            </div>
                            <div className="grid grid-cols-12 items-center">
                              <div className="col-span-4">
                                <Label className=" text-[16px] text-[#353939]">
                                  Shop Address
                                </Label>
                              </div>
                              <div className="col-span-8">
                                <FormInput name="shop_address" placeholder="Shop Address" />
                              </div>
                            </div>
                            <div className="grid grid-cols-12 items-center">
                              <div className="col-span-4">
                                <Label className=" text-[16px] text-[#353939]">
                                  City
                                </Label>
                              </div>
                              <div className="col-span-8">
                                <FormInput name="city" placeholder="City" />
                              </div>
                            </div>
                            <div className="grid grid-cols-12 items-center">
                              <div className="col-span-4">
                                <Label className=" text-[16px] text-[#353939]">
                                  PostCode
                                </Label>
                              </div>
                              <div className="col-span-8">
                                <FormInput name="postcode" placeholder="PostCode" />
                              </div>
                            </div>
                            <div className="grid grid-cols-12 items-center">
                              <div className="col-span-4">
                                <Label className=" text-[16px] text-[#353939]">
                                  Status
                                </Label>
                              </div>
                              <div className="col-span-8">
                                <FormSelect name="status" placeholder="Status" data={[{ id: 1, name: "Active" }, { id: 0, name: "Inactive" }]} />
                              </div>
                            </div>
                          </div>
                          <div className=" mt-5 flex items-center justify-between">
                            <Button className=" bg-white text-[#00ccbb] hover:bg-white" onClick={() => {
                              setOpen(false);
                            }}>Cancel</Button>
                            <Button className="py-1" type="submit">Update Restaurant</Button>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </span>
              <span className=" cursor-pointer">
                <DeleteIcon />
              </span>
            </div>
          )
        },
      }),
    ]
  }, [form, form.reset, open]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })


  return (
    <div className=" bg-[#f8f9fa] p-8">
      <h1 className=" mb-4 text-[25px] font-semibold">Restaurants List</h1>
      <div className="z-1 overflow-auto">
        <table className=" w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className=" bg-[#00b1a2] text-white">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className=" border-[1px] border-[#83afac] px-4 py-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className=" border-[1px] border-[#83afac] px-4 py-2 text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-4" />

      </div>
    </div>
  )
}

export default Order
