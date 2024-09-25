import Contents from "@/components/sites/Restaurants/Contents/page"
import RestaurantNavbar from "@/components/sites/Restaurants/RestaurantNavbar/page"
import SideBar from "@/components/sites/Restaurants/SideBar/page"

type Props = {}

const RestaurantsPage = (props: Props) => {
    return (
        <>
            <RestaurantNavbar />
            <div className="flex h-[calc(100vh-5rem)]">
                <div className="basis-2/12 border-r" ><SideBar /></div>
                <div className="basis-10/12" ><Contents /></div>
            </div>

        </>
    )
}

export default RestaurantsPage