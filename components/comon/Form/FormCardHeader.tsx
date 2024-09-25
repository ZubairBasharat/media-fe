import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import useFormSettingStore from "./FormSetting"

type Props = {
  title?: string
  toggleButtonName?: string
}

const FormCardHeader = (props: Props) => {
  const { title = "Title Name", toggleButtonName = "Button Name" } = props || {}
  const { collapseToggle, collapse } = useFormSettingStore(
    (state: any) => state
  )
  return (
    <>
      <div className="col-span-12 md:col-span-6">
        <h1 className="capitalize font-semibold text-[#8b919d]">{title}</h1>
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="flex flex-wrap items-center justify-end">
          <div>
            <Input
              type="text"
              placeholder="Filter & Search"
              className=" w-[200px] border-gray-200 bg-white"
            />
          </div>
          <div className="ml-2 flex w-[40px] cursor-pointer items-center justify-center rounded-md bg-white p-2">
            <Image
              src="/assets/images/reload.svg"
              alt="Reload"
              width={20}
              height={20}
            />
          </div>
          <div className="ml-2 flex w-[40px] cursor-pointer items-center justify-center rounded-md bg-white p-2">
            <Image
              src="/assets/images/delete.svg"
              alt="Reload"
              width={20}
              height={20}
            />
          </div>
          <div className="ml-2">
            <Button
              className="p-2 capitalize"
              disabled={collapse}
              onClick={collapseToggle}
              size={"sm"}
            >
              + {toggleButtonName}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormCardHeader
