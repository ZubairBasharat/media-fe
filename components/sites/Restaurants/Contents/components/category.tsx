import Image from "next/image"

type Props = {}

const Category = (props: Props) => {
    return (
        <div className="flex flex-wrap gap-4">
            {Array(5).fill(0).map((_, index) => {
                return (
                    <div key={`cat-${index}`} className="w-[150px] shadow rounded">
                        <Image width={150} height={100} src="/assets/images/restaurant/restaurant.png" alt="" className="w-full rounded-tl rounded-tr" />
                        <p className="p-2 font-semibold capitalize">restaurant</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Category