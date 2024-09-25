export interface MenuListType {
  key?: string
  title: string
  icon: React.ReactNode
  pathTitle?: string
  path?: string
  items: {
    key?: string
    title: string
    icon: React.ReactNode
    path: string
    pathTitle?: string
    items?: {
      key?: string
      title: string
      icon: React.ReactNode
      path: string
      pathTitle?: string
    }[]
  }[]
}
