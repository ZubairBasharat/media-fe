import { useMenuListQuery } from "@/store/features/admin/menus/MenusApiSlice";
import ExtraItemEdit from "../edit";

const ExtraItemList = () => {
  const { data: listData } = useMenuListQuery()

  return (
    <div className=" mt-8 rounded-md bg-white p-4 shadow-md">
      {/* card start */}
      <div className=" grid grid-cols-12 gap-4">
        {listData?.map((singleItem: any) => <div className=" col-span-12 rounded-md border border-gray-300 p-4 md:col-span-4">
          {/* header start  */}
          <div className=" flex items-center justify-between">
            <h2 className=" text-[20px] font-semibold text-[#00ccbb]">{singleItem?.title}</h2>
            <ExtraItemEdit data={singleItem} />
          </div>
          {/* header end */}
          {/* body start  */}
          {
            singleItem?.details?.map((ele: any) => <div className=" mt-4 space-y-2">
              <div className=" flex items-center justify-between gap-4">
                <h4 className=" text-[16px] capitalize">{ele?.name}</h4>
                <p>{ele?.price}</p>
              </div>

            </div>)
          }

          {/* body end  */}
        </div>)}
      </div>
      {/* card end */}
    </div>
  )
}

export default ExtraItemList
