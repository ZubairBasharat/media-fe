import Link from "next/link"

type Props = {}

const MerchBlock = (props: Props) => {
    return (
        <section className="relative h-[400px] w-full text-center text-white">
            <span className="absolute left-0 top-0 h-full w-full" style={{
                backgroundImage: "url('/assets/images/homepage/download.svg')",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}></span>
            <div className="absolute z-10 flex h-full w-full flex-col items-center justify-normal space-y-6 py-10 md:justify-center md:py-0 ">
                <h1 className="w-2/3 text-2xl font-semibold md:w-auto md:text-6xl">Up to 25% off - Meal Deals</h1>
                <h2 className="md:w-1/3 md:text-xl" >Need a midweek pick-me-up, a break from cooking for the family or just fancy your favourite restaurant?</h2>
                <p className="text-sm md:w-2/6">Service and delivery fees, subject to availability. Participating restaurants only. T&Cs apply.<Link href=""> Terms.</Link></p>
            </div>
            <div className="absolute bottom-0 left-0 h-[84px] w-full overflow-hidden" style={{
                backgroundImage: "url('/assets/images/homepage/merchitemrow.svg')",
                backgroundPosition: '50%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}></div>
        </section>
    )
}

export default MerchBlock