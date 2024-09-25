import { Image } from "lucide-react";
import InnerCategoryCardEdit from "../InnerCategoryCardEdit";

const InnerCategoryCard = ({ singleItem, parent_id }: any) => {

  return (
    <div className=" col-span-12 border-[1px] border-gray-200 p-4 md:col-span-6 lg:col-span-4">
      <div className=" flex items-center gap-4">
        <div className=" border-2 border-dashed border-gray-200 p-2">

          {singleItem?.image ? <img
            src={`${process.env.IMAGE_URL}${singleItem?.image}`}
            alt="/"
            className="h-[50px] w-[50px] rounded-md"
          /> : <Image className="h-[50px] w-[50px] rounded-md" />}
        </div>
        <div className=" w-full">
          <div className=" flex items-center justify-between">
            <h4 className=" mr-2 text-[16px] font-medium">{singleItem?.name} </h4>
            <InnerCategoryCardEdit data={singleItem} parent_id={parent_id} />
          </div>
          <p className=" mb-2 text-[14px] text-gray-500">{singleItem?.description}</p>
          <h4 className=" text-[16px] text-gray-500">{singleItem?.price}</h4>
        </div>
      </div>
    </div>
  )
}

export default InnerCategoryCard
