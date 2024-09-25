"use client"

import { Button } from '@/components/ui/button';
import { ArrowLeft, Star } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';

const SingleViewDetails = ({ restaurantData }: any) => {
  const router = useRouter();

  const currentDate = moment(new Date(), "YYYY-MM-DD HH:mm:ss");
  const currentDay = currentDate.format("dddd")?.toLowerCase();
  const restaurantTimeSchedule = restaurantData?.data?.time?.schedule?.filter((item: any) => item.day === currentDay);
  const format = "HH::mm";
  const currentTime = moment(new Date(), format);
  const timeIsBetween = restaurantTimeSchedule?.find((item: any) => {
    const beforeTime = moment(item?.opening_time, format);
    const afterTime = moment(item?.closing_time, format);
    if (currentTime.isBetween(beforeTime, afterTime))
      return item;
  })

  const handleBackPage = () => {
    router.push("/restaurants")
  }

  return (
    <div className="w-11/12 mx-auto" style={{
      backgroundImage: `url(${process.env.IMAGE_URL}${restaurantData?.data?.hero_seaction})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%'
    }}>
      <div className="flex py-4 ">
        <Button className=" bg-transparent text-[#00ccbc] hover:bg-transparent" onClick={handleBackPage}>
          <ArrowLeft className="mr-2 " />
          back
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4 "  >
        <div className="col-span-12 lg:col-span-4" >
          <div className='p-10'>
            <img
              src={`${process.env.IMAGE_URL}${restaurantData?.data?.image}`}
              alt="resto"
              className="h-[250px] w-[250px] rounded-md"
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <h2 className=" text-[25px] font-semibold">{restaurantData?.data?.name}</h2>
          <div className="my-2 ">
            <div className=" text-[14px] text-gray-500">
              {timeIsBetween?.opening_time ?
                <p className="inline-block px-1 text-white bg-teal-800">Open</p> :
                <p className="inline-block px-1 text-white bg-red-800">{restaurantData?.data?.time?.message || "Close"}</p>
              }
            </div>
            <div className=" text-[14px] text-gray-500">
              3.80 miles away . closes at 23:59 . $2.00 delivery. $10.000 minimum
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4 ">
            <div><Star className=" h-[17px] w-[17px] text-gray-500" /></div>
            <div>
              <h5 className=" text-[18px] text-gray-600">Info</h5>
              <div className=" text-[14px] text-gray-500">{restaurantData?.data?.shop_address}</div>
            </div>
          </div>
        </div>

        {/*<div className="col-span-12 lg:col-span-3">*/}
        {/*  <div className="flex items-center justify-start lg:justify-end">*/}
        {/*    <Bike className=" h-[25px] w-[35px] text-[#ef4444]" />*/}
        {/*    <div className=" text-[14px]">Deliver in around 30 min <span className=" ml-2 text-[#00ccbc]">change</span></div>*/}
        {/*  </div>*/}
        {/*  <div className="text-left lg:text-right">*/}
        {/*    <Button className="mt-4 text-black bg-white border border-gray-200 ">*/}
        {/*      <User className=" mr-2 h-[17px] w-[17px] text-[#00ccbc]" />*/}
        {/*      <span className=" text-[12px]">Start group order</span>*/}
        {/*    </Button>*/}
        {/*  </div>*/}
        {/*</div>*/}

      </div>
    </div>
  )
}

export default SingleViewDetails
