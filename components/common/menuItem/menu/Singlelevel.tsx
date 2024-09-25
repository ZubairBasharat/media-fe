// ** Next Imports

import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
  item: any
}

export const SingleLevel = ({ item }: Props) => {
  const pathname = usePathname()

  const isNavLinkActive = () => {
    if (
      pathname === item.path ||
      pathname.includes(`/${item?.pathTitle?.toLowerCase()}/`)
    ) {
      return true
    } else {
      return false
    }
  }

  return (
    <Link
      href={item?.path}
      className={`${
        isNavLinkActive() ? "text-[#00c5b4]" : "text-black"
      } block  p-2 delay-75 hover:text-[#00c5b4]`}
    >
      <div className=" flex items-center gap-2">
        <div>{item?.icon}</div>
        <div>{item?.title}</div>
      </div>
    </Link>
  )
}
