"use client"
import ExtraItemList from "@/components/admin/ExtraItem/List"
import ExtraItemFrom from "@/components/admin/ExtraItem/form"

const ExtraItem = () => {

  return (
    <div className=" bg-[#f8f9fa] p-8">
      <ExtraItemFrom />
      <ExtraItemList />
    </div>
  )
}

export default ExtraItem
