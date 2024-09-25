"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategoryListQuery } from "@/store/features/admin/menus/MenusApiSlice"
import { Plus, Upload } from "lucide-react"
import AddNewCategory from "./AddNewCategory"
import SingleCategory from "./SingleCategory"
import {useEffect} from "react";

const FullMenus = () => {
  const { data,refetch } = useCategoryListQuery()

  useEffect(()=> {
    refetch()
  },[refetch])

  return (
    <div>
      {/* dropdown start */}
      <div className=" mb-6 grid grid-cols-2 items-center justify-between gap-6">
        {/*<div className=" col-span-2 space-y-3 md:col-span-1">*/}
        {/*  <Label>Organization</Label>*/}
        {/*  <Select>*/}
        {/*    <SelectTrigger className=" bg-white">*/}
        {/*      <SelectValue placeholder="Theme" />*/}
        {/*    </SelectTrigger>*/}
        {/*    <SelectContent >*/}
        {/*      <SelectItem value="light">Light</SelectItem>*/}
        {/*      <SelectItem value="dark">Dark</SelectItem>*/}
        {/*      <SelectItem value="system">System</SelectItem>*/}
        {/*    </SelectContent>*/}
        {/*  </Select>*/}
        {/*</div>*/}
        {/*<div className=" col-span-2 space-y-3 md:col-span-1">*/}
        {/*  <Label>Menu</Label>*/}
        {/*  <Select>*/}
        {/*    <SelectTrigger className=" bg-white">*/}
        {/*      <SelectValue placeholder="Theme" />*/}
        {/*    </SelectTrigger>*/}
        {/*    <SelectContent>*/}
        {/*      <SelectItem value="light">Light</SelectItem>*/}
        {/*      <SelectItem value="dark">Dark</SelectItem>*/}
        {/*      <SelectItem value="system">System</SelectItem>*/}
        {/*    </SelectContent>*/}
        {/*  </Select>*/}
        {/*</div>*/}
      </div>
      {/* dropdown end */}

      {/* publish row start */}
      {/*<div className=" mb-6 grid grid-cols-3 items-center bg-white p-4">*/}
      {/*  <div className=" col-span-3 md:col-span-2">*/}
      {/*    <h4 className=" text-[20px] font-semibold">Happy with your changes? Publish them to the app</h4>*/}
      {/*    <p>Your changes are saved, but customers won`t see them until you press Publish</p>*/}
      {/*  </div>*/}
      {/*  <div className=" col-span-3 text-right md:col-span-1"><Button>*/}
      {/*    <Upload className=" mr-2 h-[17px] w-[17px]" />*/}
      {/*    <span>Publish</span>*/}
      {/*  </Button></div>*/}
      {/*</div>*/}
      {/* publish row start */}

      {/* single img and description start */}
      {/*<div className=" mb-6 grid grid-cols-3  items-start bg-white p-4">*/}
      {/*  <div className="col-span-3 md:col-span-2">*/}
      {/*    <Button className=" bg-transparent text-[#00ccbb] hover:bg-white"><Plus className=" mr-2 h-[17px] w-[17px]" />Add description</Button>*/}
      {/*  </div>*/}
      {/*  <div className="col-span-3 md:col-span-1">*/}
      {/*    <img*/}
      {/*      src="/assets/images/homepage/grocery-bag.jpg"*/}
      {/*      alt="/"*/}
      {/*      className="h-[170px] w-full rounded-md"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/* single img and description end */}

      {/* single Category start */}
      {data?.data?.map((singleData: any) => <SingleCategory data={singleData} />)}
      {/* single Category end */}

      {/* add new category start */}
      <AddNewCategory />
      {/* add new category end */}


    </div>
  )
}

export default FullMenus
