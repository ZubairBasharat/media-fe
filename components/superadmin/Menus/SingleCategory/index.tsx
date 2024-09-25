import { GripHorizontal, PlusSquare } from 'lucide-react'
import EditCategory from './EditCategory'
import InnerCategoryCard from './InnerCategoryCard'
import InnerCategoryCardAdd from './InnerCategoryCardAdd'


const SingleCategory = ({ data }: any) => {

  return (
    <div className=' mt-4'>
      {/* card section start */}
      <div className=" bg-white p-4">
        {/* header start */}
        <div className=" flex items-center justify-between">
          <div className=" flex items-center">
            <span className=" text-[25px] font-semibold">{data?.name}</span>
            <EditCategory data={data} />
          </div>
          {/*<div className=" flex items-center gap-2 text-[#00ccbb]">*/}
          {/*  <div className=" flex cursor-pointer items-center">*/}
          {/*    <PlusSquare className="  mr-2 " />*/}
          {/*    <span>Add Options</span>*/}
          {/*  </div>*/}
          {/*  <GripHorizontal className=" ml-5  cursor-pointer" />*/}
          {/*</div>*/}
        </div>
        <p className=" mt-4 text-[#00ccbb]">{data?.description} </p>
        {/* header end */}

        {/* single card area start */}
        <div className=" mt-4 grid grid-cols-12  gap-4">
          {data?.item?.map((singleItem: any) => <InnerCategoryCard singleItem={singleItem} parent_id={data?.id} />)}
          <InnerCategoryCardAdd data={data} />

        </div>
        {/* single card area end */}

      </div>
      {/* card section end */}

    </div>
  )
}

export default SingleCategory
