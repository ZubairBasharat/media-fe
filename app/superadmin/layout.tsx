"use client"

import { Menu } from "lucide-react"

import SuperAdminSidebar from "@/components/common/sidebar/SuperAdminSidebar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"

type Props = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-12">
      <div className=" col-span-2 hidden h-screen   md:block">
        <div className="p-2 ">
          <Link href={"/admin"}> <img
            className=" h-[50px] w-[100px]"
            src="demog"
            alt="logo"
          /></Link>
        </div>
        <SuperAdminSidebar />
      </div>
      <div className="col-span-12 h-screen md:col-span-10 ">
        <div className="  block bg-[#00b1a2]  text-white md:hidden">
          <div className="flex items-center justify-between p-3 ">
            <div>
              <img
                className=" h-[50px] w-[100px]"
                src="demo"
                alt="logo"
              />
            </div>
            <div>
              <Sheet>
                <SheetTrigger>
                  <Menu className="h-5 w-5 " />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    {/* <SheetTitle>Are you sure absolutely sure?</SheetTitle> */}
                    <SheetDescription>
                      <SuperAdminSidebar />
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        <div className="h-screen w-full overflow-y-auto bg-[#f8f9fa]">{children}</div>
      </div>
    </div>
  )
}

export default AdminLayout
