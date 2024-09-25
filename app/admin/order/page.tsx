"use client"

import ViewListItem from "@/components/common/ViewListItem";
import FormInput from "@/components/comon/Form/FormInput";
import FormSelect from "@/components/comon/Form/FormSelect";
import useToast from "@/components/hooks/useToast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useOrderListListQuery, useOrderUpdateMutation } from "@/store/features/admin/order/orderApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Pencil, ViewIcon } from "lucide-react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  id: z.string().nullable(),
  preparation_time: z
    .string().nullable(),
  order_status: z.string().nullable()
})
const Order = () => {

  const [open, setOpen] = useState(false)
  const [updateOrder] = useOrderUpdateMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preparation_time: "",
      order_status: "",
    },
  })
  const [loading, setLoading] = useState(false);

  const { ToastSuccess, ToastError } = useToast()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let modifyData = {
      ...values,
      // id: data?.id,
    }
    setLoading(true);
    try {
      await updateOrder(modifyData).unwrap()
        .then((res) => {
          if (res.code === 201) {
            setLoading(false);
            setOpen(false)
            ToastSuccess("Update Successfully");
          }
          if (res?.error?.data?.message) {
            ToastError(res?.error?.data?.message)
          }
        })
        .catch((err: any) => {
          setLoading(false);
          if (err?.data?.message) {
            ToastError(err?.data?.message)
          }
        })
    } catch (error) { }
  }

  type Person = {
    order_status: string
    paid_amount: string
    created_at: number
    total_price: number
    invoice_id: string
  }

  const columnHelper = createColumnHelper<Person>()

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('invoice_id', {
        header: "Invoice Id",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('created_at', {
        header: "Created",
        cell: ({ row }: any) => {
          return (
            <>
              {moment(row?.original?.created_at)?.format("DD-MM-yyyy")}
            </>
          )
        },
      }),
      columnHelper.accessor('paid_amount', {
        header: "Paid Amount",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('order_status', {
        header: "Order Status",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('total_price', {
        header: "Total",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor(() => "", {
        id: "action",
        header: "Action",
        cell: ({ row }: any) => {
          const viewData = row?.original;
          return (
            <div className=" flex items-center justify-center space-x-3">
              <div className=" flex item-center justify-center gap-3">
                <span className="cursor-pointer">
                  <Dialog>
                    <DialogTrigger>
                      <ViewIcon />
                    </DialogTrigger>
                    <DialogContent className="max-w-[1000px] w-full">
                      <div>
                        <h2 className="mb-6">Order Info</h2>
                        <div className="grid grid-cols-12 gap-6">

                          <div className="col-span-12">
                            <div className="border rounded-lg p-4 border-dashed border-gray-300 bg-gray-200 md:space-y-6">
                              <div className="grid grid-col-2 md:grid-cols-2">
                                <ViewListItem name="Invoice Id" value={viewData?.invoice_id} />
                                <ViewListItem name="Payment Status" value={viewData?.payment_status} />
                              </div>
                              <div className="grid grid-col-2 md:grid-cols-2">
                                <ViewListItem name="Total Price" value={viewData?.total_price} />
                                <ViewListItem name="Total Quantity" value={viewData?.total_quantity} />
                              </div>
                              <div className="grid grid-col-2 md:grid-cols-2">
                                <ViewListItem name="Status" value={viewData?.status == 1 ? "Active" : "InActive"} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2 className="mb-6">Order Details</h2>
                        {viewData?.order_details?.map((orderDetail: any) => {
                          return <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12">
                              <div className="border rounded-lg p-4 border-dashed border-gray-300 bg-gray-200 md:space-y-6">
                                <div className="grid grid-col-2 md:grid-cols-2">
                                  <ViewListItem name="Order ID" value={orderDetail?.order_id} />
                                  <ViewListItem name="Name" value={orderDetail?.name} />
                                </div>
                                <div className="grid grid-col-2 md:grid-cols-2">
                                  <ViewListItem name="Quantity" value={orderDetail?.quantity} />
                                  <ViewListItem name="Price" value={orderDetail?.price} />
                                </div>
                                <div className="grid grid-col-2 md:grid-cols-2">
                                  <ViewListItem name="Extra Price" value={orderDetail?.extra_price} />
                                </div>
                              </div>
                            </div>
                          </div>
                        })}
                      </div>
                    </DialogContent>
                  </Dialog>
                </span>
                <Pencil className=" text-[#00b1a2] cursor-pointer" onClick={() => {
                  setOpen(true);
                  form.reset({
                    id: viewData?.id?.toString(),
                    preparation_time: viewData?.preparation_time?.toString(),
                    order_status: viewData?.order_status,
                  });
                }} />
                <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle
                        className=" border-grey-500 flex items-center justify-center border-b-[1px] py-4">
                        <h1>Order Accept</h1>
                      </DialogTitle>
                      <DialogDescription className=" p-4 ">
                        <div className="">
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                              <div
                                className=" border-grey-500 space-y-6 border-b-[1px] pb-5">

                                <div className=" grid grid-cols-2 gap-4">

                                  <div className=" col-span-2 md:col-span-1">
                                    <div className="space-y-2 ">
                                      <Label
                                        className=" text-[16px] text-[#353939]">
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
                                  <div className="space-y-2 ">
                                    <Label className=" text-[16px] text-[#353939]">
                                      Status
                                    </Label>
                                    <div>
                                      <FormSelect name="order_status"
                                        placeholder="Status"
                                        data={[{ id: "Pending", name: "Pending" }, { id: "Approved", name: "Approved" }, { id: "Rejected", name: "Rejected" }, { id: "Canceled", name: "Canceled" }, { id: "Delivered", name: "Delivered" }, { id: "Processing", name: "Processing" }]} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className=" mt-5 flex items-center justify-between">
                                <Button
                                  className=" bg-white text-[#00ccbb] hover:bg-white"
                                  type="reset" onClick={handleReset}>Cancel</Button>
                                <Button className=" py-1" disabled={loading} >Update Order</Button>
                              </div>
                            </form>
                          </Form>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )
        },
      }),
    ]
  }, [form, form.reset, open]);
  const handleReset = () => {
    setOpen(false)
    form.reset()
  }
  const { data: orderList } = useOrderListListQuery()
  const [data, setData] = useState([])
  useEffect(() => {
    if (orderList?.data?.length > 0) {
      setData(orderList?.data)
    }
  }, [orderList])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className=" bg-[#f8f9fa] p-8">
      <h1 className=" mb-4 text-[25px] font-semibold">Order List</h1>
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
