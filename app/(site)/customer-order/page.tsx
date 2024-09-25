"use client"

import useToast from "@/components/hooks/useToast";
import Header from "@/components/sites/home/Header/page";
import { Button } from "@/components/ui/button";
import { useOrderCancelMutation, useOrderListListQuery } from "@/store/features/admin/order/orderApiSlice";


import ViewListItem from "@/components/common/ViewListItem";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { View, XSquare } from "lucide-react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";


type Person = {
  order_status: string
  paid_amount: string
  created_at: number
  total_price: number
  invoice_id: string
}


const columnHelper = createColumnHelper<Person>()

const CustomerOrder = () => {
  const { data: orderList, refetch } = useOrderListListQuery()
  const [orderCancel] = useOrderCancelMutation()
  const [data, setData] = useState([])
  const { ToastSuccess, ToastError } = useToast()
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(false)
  const [orderId, setOrderId] = useState(null)

  useEffect(() => {
    refetch()
  }, [refetch])
  const handleOrderCancel = async () => {
    if (orderId) {
      try {
        await orderCancel({ id: orderId }).unwrap()
          .then((res: any) => {
            if (res.code === 201) {
              setOpen((prevState: any) => !prevState)
              ToastSuccess("Order Cancel Successfully");
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

  }
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
          const data = row?.original;


          return (
            <div className=" flex items-center justify-center space-x-3">
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <View className=" cursor-pointer text-[#00b1a2]" />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[1000px]">
                    <DialogHeader>
                      {/* <DialogTitle>Order Details</DialogTitle> */}
                    </DialogHeader>

                    <div>
                      <div>
                        <h2 className=" mb-6 font-semibold text-[20px]">Order Info</h2>
                        <div className="grid grid-cols-12 gap-6">
                          <div className="col-span-12">
                            <div className="border rounded-lg p-4 border-dashed border-gray-300 bg-gray-200 md:space-y-6">
                              <div className="grid grid-col-2 md:grid-cols-2">
                                <ViewListItem name="Invoice Id" value={data?.invoice_id} />
                                <ViewListItem name="Payment Status" value={data?.payment_status} />
                              </div>
                              <div className="grid grid-col-2 md:grid-cols-2">
                                <ViewListItem name="Total Price" value={data?.total_price} />
                                <ViewListItem name="Total Quantity" value={data?.total_quantity} />
                              </div>
                              <div className="grid grid-col-2 md:grid-cols-2">
                                <ViewListItem name="Status" value={data?.status == 1 ? "Active" : "InActive"} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2 className=" my-6 font-semibold text-[20px]">Order Details</h2>
                        {data?.order_details?.map((orderDetail: any) => {
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
                    </div>

                  </DialogContent>
                </Dialog>
              </div>

              {data?.order_status !== "Canceled" && <div>
                <XSquare className=" cursor-pointer text-[#00b1a2]" onClick={() => {
                  setOpen(true)
                  setOrderId(data?.id)
                }} />

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className=" p-0 ">
                    <DialogHeader>
                      <DialogTitle className=" border-grey-500 flex items-center justify-center border-b-[1px] py-4">
                        <h1>Are Your Sure to Cancel</h1>
                      </DialogTitle>
                      <DialogDescription className=" p-4 ">
                        <div className=" flex items-center justify-between">
                          <Button onClick={() => setOpen((prevState: any) => !prevState)} className=" border border-[red] bg-white text-[red] hover:bg-white hover:text-[red]">NO</Button>
                          <Button className="inline-block  text-center" onClick={() => {
                            handleOrderCancel()
                          }}>YES</Button>
                        </div>

                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>}


            </div>
          )
        },
      }),
    ]
  }, [open])


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
    <div className=" bg-[#f8f9fa]">
      <Header />
      <div className=" p-8">
        <h1 className=" mb-4 text-[25px] font-semibold"> Your Order List</h1>
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
    </div>
  )
}

export default CustomerOrder
