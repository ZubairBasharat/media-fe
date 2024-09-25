import { ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import Menu from "../../menuItem/menu/index"

type Props = {
  item: any
}

export const MultiLevel = ({ item }: Props) => {
  const pathname = usePathname()
  const { items: children } = item
  const [open, setOpen] = useState(false)

  const handleClick = (singleItem: any) => {
    setOpen((prev) => !prev)
  }

  useEffect(() => {
    const result = children?.map((ele: any) => {
      if (pathname.includes(`/${ele?.pathTitle?.toLowerCase()}/`)) {
        setOpen(true)
      } else if (ele?.items?.length > 0) {
        const res2 = ele.items?.map((ele2: any) => ele2.path === pathname)
        return res2
      } else {
        return ele.path === pathname
      }
    })

    result?.flat().map((item: any) => item && setOpen(true))
  }, [children, pathname])

  return (
    <div>
      <ul className=" p-2">
        <Collapsible open={open} onOpenChange={setOpen}>

          <>
            <CollapsibleTrigger className=" w-full cursor-pointer">
              <div className=" flex items-center gap-2 delay-75 hover:text-[#00c5b4]">
                <div>{item?.icon}</div>
                <div className=" flex w-full items-center justify-between">
                  <div>{item?.title}</div>
                  <div>
                    {open ? (
                      <ChevronDown className=" h-[20px] w-[20px]" />
                    ) : (
                      <ChevronRight className=" h-[20px] w-[20px]" />
                    )}
                  </div>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {children?.map((child: any, key: any) => <Link href={item.path} key={key}>
                <Menu key={key} item={child} keyProp={key} />
              </Link>)}

            </CollapsibleContent>
          </>

        </Collapsible>
      </ul>
    </div>
  )
}
