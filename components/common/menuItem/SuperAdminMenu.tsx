import { ArrowDownUp, Home } from "lucide-react"

import { MenuListType } from "./Interface/MenuList.js"

export const SuperAdminMenuList: MenuListType[] = [
  {
    key: "1",
    title: "Home",
    pathTitle: "Home",
    icon: <Home className=" h-5 w-5" />,
    path: "/superadmin",
    items: [],
  },
  {
    key: "2",
    title: "Developer ",
    pathTitle: "Develope",
    icon: <ArrowDownUp className=" h-5 w-5" />,
    path: "/superadmin/developers",
    items: [],
  },

  {
    key: "3",
    title: "Users",
    pathTitle: "users",
    icon: <ArrowDownUp className=" h-5 w-5" />,
    path: "/superadmin/users",
    items: [],
  },
]
