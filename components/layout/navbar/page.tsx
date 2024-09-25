"use client"
import useLayoutStore from "@/app/store/zustand/layout"
import { Icons } from "@/components/icons"

type Props = {}

const NavBar = (props: Props) => {
  const { collapseToggle } = useLayoutStore((state: any) => state)
  return (
    <>
      <div>
        <span onClick={collapseToggle}>
          <Icons.menubar className="cursor-pointer text-secondary" />
        </span>
      </div>
      <div className="flex gap-8">
        <span>
          <Icons.search className="text-secondary" />
        </span>
        <span>
          <Icons.mail className="text-secondary" />
        </span>
        <span>
          <Icons.bell className="text-secondary" />
        </span>
      </div>
    </>
  )
}

export default NavBar
