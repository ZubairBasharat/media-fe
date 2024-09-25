import ProductCard from "@/components/comon/productCard";

type Props = {
  restaurantList: any
}

const TopPickNeighbor = ({ restaurantList }: Props) => {
  return (
    <div className="flex flex-wrap gap-4">
      {restaurantList?.map((resto: any, index: any) => {
        return (
          <div key={index} className="h-[240px] w-[260px]" >
            <ProductCard index={index} restaurant={resto} />
          </div>
        )
      })}

    </div>
  )
}

export default TopPickNeighbor
