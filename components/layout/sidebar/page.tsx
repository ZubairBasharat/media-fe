import Image from "next/image"

import useLayoutStore from "@/app/store/zustand/layout"

type Props = {}

const SideBar = (props: Props) => {
  const { collapse } = useLayoutStore((state: any) => state)

  return (
    <>
      <div className="flex h-[70px] items-center justify-center border-b border-secondary">
        <Image
          src={"/assets/images/logo.svg"}
          alt=""
          width={collapse ? "220" : "50"}
          height="70"
          className="p-6"
        />
      </div>
      <div className="mt-6">

      </div>
    </>
  )
}

export default SideBar
