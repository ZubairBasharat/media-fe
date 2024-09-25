import { addAuthInformation } from "@/store/features/auth"
import { useAppDispatch } from "@/store/useReduxStore"
import useAuthStore from "@/store/zustand/auth"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { MenuList } from "../menuItem"
import Menu from "../menuItem/menu"

function Sidebar() {
  const { setUser } = useAuthStore((state: any) => state)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_type")
    setUser({})
    dispatch(addAuthInformation({ user: {} }))
    router.push("/login")
  }
  return (
    <div>
      {MenuList.map((menu) => {
        return menu
      }).map((item, index) => (
        <Menu key={item.key} item={item} keyProp={index} />
      ))}
      <div className=" mt-10 p-2">
        <a
          onClick={() => handleLogout()}
          className=" cursor-pointer rounded-lg bg-[#00b1a2] p-2 text-white"
        >
          Sign out
        </a>
      </div>
    </div>
  )
}

export default Sidebar
