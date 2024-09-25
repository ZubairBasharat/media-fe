"use client"

import FooterArea from "@/components/sites/home/FooterArea/page"
import CustomerLogin from "@/components/sites/login/customerLogin"
import { Home, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
type Props = {}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const handleRouteChange = () => {
    setLoading(true);
    router.push("/")
  }

  return (
    <div className="">
      {/* header start  */}
      <div className="mb-3 border-b-[1px] border-gray-200">
        <div className="mx-auto px-4 md:w-4/5 ">
          <div className=" flex items-center justify-between py-3">
            {/* <div>
              <Image
                src={"/assets/images/logo.svg"}
                width={130}
                height={80}
                alt=""
                onClick={handleRouteChange}
                className=" cursor-pointer"
              />
            </div> */}
            <div className=" flex items-center space-x-4">
              <div className=" flex items-center gap-1 space-x-2 rounded border-[1px] border-gray-300 bg-white p-2 text-base text-black">
                <Home className="h-[17px] w-[17px] text-secondary" />
                <span>
                  <Link href="/" className="text-[14px]">
                    Home
                  </Link>
                </span>
              </div>
              <div className="flex cursor-pointer items-center gap-1 rounded border-[1px] border-gray-300 bg-white p-2 text-base text-black">
                <div className="flex items-center space-x-3">
                  <Menu className="h-[17px] w-[17px] text-secondary" />
                  <span>Menu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* header end */}
      {/* form start */}
      <CustomerLogin />
      {/* form end */}

      {/* footer  */}
      <div className="">
        <FooterArea />
      </div>
    </div>
  )
}

export default Login
