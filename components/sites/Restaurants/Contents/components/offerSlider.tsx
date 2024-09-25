import Image from "next/image"

type Props = {}

const OfferSlider = (props: Props) => {
    return (
        <div className="flex flex-wrap gap-4 my-6">
            {Array(4).fill(0).map((_, index) => {
                return (
                    <div key={index} className="h-[172px] w-[344px]">
                        <Image src={"/assets/images/restaurant/onsite-message-image.jpg"} width={344} height={172} alt="/" />
                    </div>
                )
            })}
        </div>
    )
}

export default OfferSlider