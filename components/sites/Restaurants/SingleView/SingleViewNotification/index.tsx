import { Truck } from 'lucide-react'

const SingleViewNotification = () => {
  return (
    <div className=" flex items-center justify-between rounded-md border-[1px] border-gray-300 bg-white p-4">
      <div>
        <h5 className=" text-[18px] font-semibold">Delivered by Best Pizza London - Bethnal Green</h5>
        <p className=" text-[14px] text-gray-500">This means you wont be able to follow your order or get live updates</p>
      </div>
      <div>
        <Truck className=" h-[30px] w-[40px]" />
      </div>
    </div>
  )
}

export default SingleViewNotification
