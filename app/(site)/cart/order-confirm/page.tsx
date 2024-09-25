import RestaurantNavbar from "@/components/sites/Restaurants/RestaurantNavbar/page"

type Props = {}

const page = (props: Props) => {
    return (
        <>
            <RestaurantNavbar />
            <div className="w-3/6 mx-auto  my-auto">
                <div className="min-h-[150px] rounded shadow-sm  border border-primary mt-10 flex justify-center items-center">
                    <h2 className="text-primary text-2xl">Order has been confirmed</h2>
                </div>
            </div>
        </>
    )
}

export default page