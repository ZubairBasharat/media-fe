import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoveUp } from "lucide-react"
import BarChart from "./chart/Barchart/page"
import HorizontalBarChart from "./chart/HorizontalBarChart/page"
import LineChart from "./chart/LineChart/page"

const FullDashboard = () => {
  return (
    <div className=" px-[100px] py-10">
      {/* order row start */}
      <div className=" mb-4 grid grid-cols-2 border-[1px] border-gray-200 bg-white p-6 text-center">
        <div>
          <p className=" text-[12px]">Completed orders</p>
          <h4 className=" text-[20px] font-semibold">135</h4>
          <div className=" flex items-center justify-center text-[#00b1a2]">
            <MoveUp className=" h-4 w-5" />
            <p>0.74%</p>
          </div>
        </div>
        <div>
          <p className=" text-[12px]">Gross Revenue orders</p>
          <h4 className=" text-[20px] font-semibold">2,864.27</h4>
          <div className=" flex items-center justify-center text-[#00b1a2]">
            <MoveUp className=" h-4 w-5" />
            <p>3.99%</p>
          </div>
        </div>
      </div>
      {/* order row end */}

      {/* completed order start */}
      <div className=" mb-4   grid grid-cols-3 gap-[30px] border-[1px] border-gray-200 bg-white p-6">
        <div className=" col-span-3 lg:col-span-1">
          <h4 className=" mb-4 text-[20px] font-semibold">completed orders</h4>
          <p className=" mb-2 text-[14px]">How many  orders you completed each day.</p>
          <p className=" text-[14px]">Increase your completed orders with fewer rejected orders.</p>
        </div>
        <div className=" col-span-3 lg:col-span-2">
          <BarChart />
        </div>
      </div>
      {/* completed order end */}

      {/* rejected orders start */}
      <div className=" mb-4  grid grid-cols-3 gap-[50px] border-[1px] border-gray-200 bg-white p-6">
        <div className=" col-span-3 lg:col-span-1">
          <h4 className=" mb-4 text-[20px] font-semibold">Rejected orders</h4>
          <p className=" mb-2 text-[14px]">Orders your restaurant did not accept and the reassons given at the time.</p>
          <p className=" text-[14px]">Auto-rejected means no one responded to a cutomers order for 10 minutes</p>
        </div>

        <div className=" col-span-3 lg:col-span-2">
          <div className=" mb-6 flex items-center justify-start gap-x-6">
            <div>
              <p className=" text-[14px]">Total rejections</p>
              <h4 className=" text-[20px] font-semibold">0</h4>
            </div>
            <div>
              <p className=" text-[14px]">% of all orders</p>
              <h4 className=" text-[20px] font-semibold">0%</h4>
            </div>
          </div>

          <div className=" mb-5 flex items-center justify-between border-b-2 border-gray-200  pb-2 text-[14px] font-medium">
            <div>Rejection reason</div>
            <div>Count</div>
            <div>% of all orders</div>
          </div>

          <div className=" text-center text-[14px] text-gray-400">
            Great! No orders were rejected for this period
          </div>
        </div>
      </div>
      {/* rejected orders end */}

      {/* two chart start */}
      <div className=" grid grid-cols-12 gap-4">
        <div className=" col-span-12 border-[1px]  border-gray-200 bg-white p-6 lg:col-span-6"><HorizontalBarChart /></div>
        <div className=" col-span-12 border-[1px]  border-gray-200 bg-white p-6 lg:col-span-6"><LineChart /></div>
      </div>
      {/* two chart end */}

    </div>
  )
}

export default FullDashboard
