"use client";

import RestaurantNavbar from "@/components/sites/Restaurants/RestaurantNavbar/page";
import Pizza from "@/components/sites/Restaurants/SingleView/Pizza";
import SingleViewDetails from "@/components/sites/Restaurants/SingleView/SingleViewDetails";

import FooterArea from "@/components/sites/home/FooterArea/page";
import { Button } from "@/components/ui/button";
import { useShowRestaurantQuery } from "@/store/features/Website/Restaurant/restaurantApiSlice";
import dynamic from 'next/dynamic';
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";
const SingleViewSidebar = dynamic(() => import('@/components/sites/Restaurants/SingleView/SingleViewSidebar'), { ssr: false });
function SingleRestaurant() {
  const router = useRouter();
  const params = useParams();

  const { data: restaurantData } = useShowRestaurantQuery(params.id);
  return (
    <div>
      <RestaurantNavbar />
      {/* body start */}
      <div className="shadow-md ">

        {/* details section start  */}
        <SingleViewDetails restaurantData={restaurantData} />
        {/* details section end  */}
        {/* {restaurantData?.data?.time?.message} */}
        {/* button area start */}

        {restaurantData?.data?.time?.message == "Close" ? '' :
          <div className=" mt-4 border-t-[1px] border-gray-300 py-4">
            <div className="w-11/12 mx-auto space-x-3">
              {restaurantData?.data?.menu?.map((menu: any) =>
                <Button key={menu?.id} className="rounded-full ">{menu?.name}</Button>
              )}
            </div>
          </div>
        }
        {/* button area end */}
      </div>
      {/* innerBody start */}
      <div className=" bg-[#f9fafa]">
        <div className="grid items-start w-11/12 grid-cols-12 gap-4 py-6 mx-auto ">
          {restaurantData?.data?.time?.message == "Close" ? <div className="col-span-12 lg:col-span-8"> <Button type='button' className="w-full mt-6 " >Restureant is Close </Button> </div> :
            <div className="col-span-12 lg:col-span-8">
              {restaurantData?.data?.menu?.map((menu: any) => <Pizza key={menu?.id} menu={menu} />)}
            </div>
          }
          {/* sidebar start */}
          <Suspense fallback={<>Loading....................????</>}>
            <SingleViewSidebar />
          </Suspense>
          {/* sidebar end */}
        </div>
      </div>
      {/* innerBody end */}

      {/* body end */}
      <FooterArea />
    </div>
  )
}

export default SingleRestaurant
