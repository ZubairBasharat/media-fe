import ProductCard from '@/components/comon/productCard'

type Props = {}

const PopularBrands = (props: Props) => {
    return (
        <div className="grid grid-cols-12 gap-6">
            {Array(4).fill(0).map((_, index) => {
                return (
                    <div key={index} className="col-span-3">
                        <div className='h-[260px]'>
                            <ProductCard />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default PopularBrands