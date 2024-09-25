"use client"

import { Star } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";

type Props = {
  index?: any,
  restaurant?: any
}

const ProductCard = ({ restaurant }: Props) => {
  const router = useRouter();
  const currentDate = moment(new Date(), "YYYY-MM-DD HH:mm:ss");
  const currentDay = currentDate.format("dddd")?.toLowerCase();
  const restaurantTimeSchedule = restaurant?.times?.schedule?.filter((item: any) => item.day === currentDay);
  const format = "HH::mm";
  const currentTime = moment(new Date(), format);
  const timeIsBetween = restaurantTimeSchedule?.find((item: any) => {
    const beforeTime = moment(item?.opening_time, format);
    const afterTime = moment(item?.closing_time, format);
    if (currentTime.isBetween(beforeTime, afterTime))
      return item;
  })

  const handleSingleView = () => {
    router.push(`/restaurants/${restaurant.name}/${restaurant.id}`)
  }

  return (
    <div className="flex h-full cursor-pointer flex-col overflow-hidden rounded border" onClick={handleSingleView}>
      <div className="relative basis-8/12 p-2"
        style={{
          backgroundImage: `url(${process.env.IMAGE_URL}${restaurant.image})`,
          backgroundPosition: 'center center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}>


        {restaurant?.times?.message == "Close" ? <div><p className="inline-block bg-red-800 px-1 text-white">Close </p>
        </div> : restaurant?.times?.message == "Pre-Order" ?
          <div><p className="inline-block bg-red-800 px-1 text-white">Pre-Order</p> </div>
          : <p className="inline-block bg-teal-800 px-1 text-white">Open</p>
        }

        {/* {timeIsBetween?.opening_time ?
            <p className="inline-block bg-teal-800 px-1 text-white">Open</p> :
            <p className="inline-block bg-red-800 px-1 text-white">{restaurant?.times?.message || "Close"}</p>
            // { restaurant?.times?.message == ""  
          } */}

        {/*<div className="absolute -bottom-4 right-4 rounded-full bg-white shadow">*/}
        {/*  <div className="flex min-w-[80px] flex-col items-center justify-center py-1  leading-none">*/}
        {/*    <span className="font-semibold">10 - 20</span>*/}
        {/*    <span className="text-sm font-normal">min</span>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <div className="basis-4/12 p-2">
        <div>
          <p className="font-bold">{restaurant.postcode}, {restaurant.name}</p>
          <p className="font-normal">{restaurant.shop_address}</p>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-green-700" />
          <p className="text-sm text-green-700">4.8 Excellent (500+)</p>
        </div>
        <div>
          <p className="text-sm" >0.2 miles away <span className="text-red-800">0.99 delivery</span></p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
