import { MultiLevel } from "./Multilevel"
import { SingleLevel } from "./Singlelevel"
import { hasChildren } from "./utils"

type Props = {
  item: any
  keyProp: any
  key: any
}
const Menu = ({ item, keyProp }: Props) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel
  return <Component item={item} key={keyProp} />
}

export default Menu
