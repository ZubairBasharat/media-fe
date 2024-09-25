import ProductCard from "@/components/comon/productCard"

type Props = {}

const OfferNerYou = (props: Props) => {
    return (
        <div className="flex flex-wrap gap-4">
            {Array(5).fill(0).map((_, index) => {
                return (
                    <div key={index} className="w-[260px] h-[240px] ">
                        <ProductCard />
                    </div>
                )
            })}

        </div>
    )
}

export default OfferNerYou