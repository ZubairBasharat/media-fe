"use client";
import { useGetRestaurantListQuery } from "@/store/features/Website/Restaurant/restaurantApiSlice";
import { useSearchParams } from "next/navigation";
import TopPickNeighbor from "./components/topPickNeighbor";

type Props = {}

const Contents = (props: Props) => {
    const searchParams = useSearchParams()
    const search = searchParams.get('name');

    const { data: restaurantList } = useGetRestaurantListQuery({
        postcode: search ? new URLSearchParams(search) : ""
    });


    return (
        <div className="m-6">
            {/* <section>
                <h2 className="text-[22px] font-bold mb-4">Delivering to Soho</h2>
                <Category />
            </section> */}
            {/* <section>
                <OfferSlider />
            </section> */}
            <section>
                <h2 className="my-4 text-[22px] font-bold">Top picks in your neighbourhood </h2>
                <TopPickNeighbor restaurantList={restaurantList?.data} />
            </section>
            {/* <section>
                <h2 className="text-[22px] font-bold my-4">Offers near you <span className="ml-2 text-sm font-normal text-primary"><Link href={""}>view all (661)</Link></span></h2>
                <OfferNerYou />
            </section>
            <section>
                <h2 className="text-[22px] font-bold my-4">Only on RestroPlus <span className="ml-4 text-sm font-normal text-primary"><Link href={""}>view all (561)</Link></span></h2>
                <OnlyOnDeliveroo />
            </section>
            <section>
                <h2 className="text-[22px] font-bold mt-6 mb-4">Popular brands</h2>
                <PopularBrands />
            </section> */}
        </div>
    )
}

export default Contents