"use client"

import ViewListItem from "@/components/common/ViewListItem";
import FormSelect from "@/components/comon/Form/FormSelect";
import useToast from "@/components/hooks/useToast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  useUserAdminListQuery,
  useUserPasswordResetMutation, useUserStatusChangeMutation
} from "@/store/features/admin/users/userApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { EditIcon, ViewIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type User = {
  name: string
  email: string
  phone: number
  postcode: number
  status: string
}

const formSchema = z.object({
  id: z.string().nullable(),
  status: z.string().nullable()
})

const Users = () => {
  const { data: userList } = useUserAdminListQuery()
  const [data, setData] = useState([])
  const [editData, setEditData] = useState<any>(null)
  const { ToastSuccess, ToastError } = useToast()
  const [updateUserStatus] = useUserStatusChangeMutation();
  const [resetUserPassword] = useUserPasswordResetMutation();

  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    if (userList?.data?.length) {
      setData(userList?.data);
      setTotalPages(userList?.data?.totalPages || 0);
    }
  }, [userList]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      status: ""
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let modifyData = { ...values, status: Number(values.status) }

    try {
      const response: any = await updateUserStatus(modifyData);


      if (response?.data?.code === 201) {
        ToastSuccess("User data has been updated")
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
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  const columnHelper = createColumnHelper<User>()

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: "Name",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('email', {
        header: "Email",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('phone', {
        header: "Phone",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('status', {
        header: "Status",
        cell: ({ row }: any) => {
          return (
            <div className=" flex items-center justify-center space-x-3">
              {Number(row?.original?.status) === 1 ? "Active" : "InActive"}
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
            <div className="flex items-center justify-center space-x-5">
              <span className="cursor-pointer">
                <Dialog>
                  <DialogTrigger>
                    <ViewIcon />
                  </DialogTrigger>
                  <DialogContent className="max-w-[1000px] w-full">
                    <div>
                      <h2 className="mb-6">User Info</h2>
                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12">
                          <div className="border rounded-lg p-4 border-dashed border-gray-300 bg-gray-200 md:space-y-6">
                            <div className="grid grid-col-2 md:grid-cols-2">
                              <ViewListItem name="Name" value={viewData?.name} />
                              <ViewListItem name="Email" value={viewData?.email} />
                            </div>
                            <div className="grid grid-col-2 md:grid-cols-2">
                              <ViewListItem name="Type" value={viewData?.type} />
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
                  setEditData(row?.original);
                  setOpen(true);
                  form.reset({
                    id: viewData?.id?.toString(),
                    status: viewData?.status?.toString()
                  });
                }} />
                <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                  <DialogContent className="max-w-[500px] w-full">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div>
                          <h2 className="mb-6">Edit User Status</h2>
                          <div className=" border-grey-500 space-y-4 border-b-[1px] pb-5">
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
                            <Button className="py-1" type="submit">Update User</Button>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
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
      <h1 className=" mb-4 text-[25px] font-semibold">User   List</h1>
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
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded-lg ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Users
