
"use client"

import useToast from "@/components/hooks/useToast";
import { Button } from "@/components/ui/button";
import { useInactiveExtraItemActiveMutation, useInactiveExtraItemListQuery } from "@/store/features/admin/inactiveExtraItem/inactiveExtraItemApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  id: z.string().nullable(),
  preparation_time: z
    .string().nullable(),
  order_status: z.string().nullable()
})
const InactiveItem = () => {
  const [open, setOpen] = useState(false)
  const { ToastSuccess, ToastError } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preparation_time: "",
      order_status: "",
    },
  })
  const { data: inactiveExtraItem, refetch } = useInactiveExtraItemListQuery()
  const [data, setData] = useState([])
  const [UpdateStatus] = useInactiveExtraItemActiveMutation()


  const handleActive = (id: any) => {
    try {
      UpdateStatus({ id: id })
        .unwrap()
        .then((res) => {
          if (res.code === 201) {
            ToastSuccess("Update Successfully");
          }
        })
        .catch((err) => {
          console.log("err", err);

        })
    } catch (error) {
      ToastError(error)
    }

  }

  type InactiveExtraItemType = {
    title: string
    details: {
      name: string
    }
  }

  const columnHelper = createColumnHelper<InactiveExtraItemType>()

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('title', {
        header: "Title",
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
                <Button onClick={() => handleActive(viewData?.id)}>Active</Button>
              </div>
            </div>
          )
        },
      }),
    ]
  }, [form, form.reset, open, data]);


  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    if (inactiveExtraItem?.length > 0) {
      setData(inactiveExtraItem)
    } else {
      setData([])
    }
  }, [inactiveExtraItem])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className=" bg-[#f8f9fa] p-8">
      <h1 className=" mb-4 text-[25px] font-semibold">Inactive Extra Item</h1>
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

export default InactiveItem

