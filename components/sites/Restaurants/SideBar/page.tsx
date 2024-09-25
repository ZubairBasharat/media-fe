"use client"
type Props = {}
import { Checkbox } from "@/components/ui/checkbox"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const SideBar = (props: Props) => {
    const [sortCollapsible, setSortCollapsible] = useState(false)
    const [hygieneRating, setHygieneRatingCollapsible] = useState(false)
    const [offers, setOffersCollapsible] = useState(false)
    const [dietary, setDietaryCollapsible] = useState(false)
    const [categoriesCollapsible, setCategoriesCollapsible] = useState(true)
    const categories = [
        { name: 'Alcohol', count: 24 },
        { name: 'American', count: 22 },
        { name: 'Asian', count: 52 },
        { name: 'Asian', count: 7 },
        { name: 'Breakfast', count: 24 },
        { name: 'British', count: 12 },
        { name: 'Brunch', count: 9 },
        { name: 'Bubble', count: 10 },
        { name: 'Burgers', count: 22 },
        { name: 'Chicken', count: 45 },
        { name: 'Chinese', count: 27 },
        { name: 'Curry', count: 46 },
        { name: 'Dessert', count: 57 },
        { name: 'Drinks', count: 51 },
        { name: 'Dumplings', count: 14 },
        { name: 'Fried', count: 16 },
        { name: 'Grocery', count: 11 },
        { name: 'Hawaiian', count: 5 },
        { name: 'Healthy', count: 34 },
    ]
    const dietaries = [
        { name: 'Gluten Free', count: 14 },
        { name: 'Halal', count: 43 },
        { name: 'Halal partner', count: 2 },
        { name: 'Kosher', count: 0 },
        { name: 'Organic', count: 3 },
        { name: 'Paleo', count: 0 },
        { name: 'Vegan', count: 4 },
        { name: 'Vegan Friendly', count: 62 },
        { name: 'Vegetarian', count: 64 },
    ]
    return (
        <div className="w-full p-6 overflow-hidden">

            <Collapsible
                open={sortCollapsible}
                onOpenChange={setSortCollapsible}
                className="py-6 border-b"
            >
                <CollapsibleTrigger className="w-full transition duration-500 transform" >
                    <div className="flex items-center justify-between w-full">
                        <p className="font-semibold">Sort</p>
                        <ChevronDown className={`${sortCollapsible === true ? 'rotate-180' : 'rotate-0'} text-primary `} />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    Yes. Free to use for personal and commercial projects. No attribution
                    required.
                </CollapsibleContent>

            </Collapsible>

            <Collapsible
                open={hygieneRating}
                onOpenChange={setHygieneRatingCollapsible}
                className="py-6 border-b"
            >
                <CollapsibleTrigger className="w-full transition duration-500 transform" >
                    <div className="flex items-center justify-between w-full">
                        <p className="font-semibold">Hygiene rating</p>
                        <ChevronDown className={`${hygieneRating === true ? 'rotate-180' : 'rotate-0'} text-primary `} />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    Yes. Free to use for personal and commercial projects. No attribution
                    required.
                </CollapsibleContent>

            </Collapsible>

            <Collapsible
                open={offers}
                onOpenChange={setOffersCollapsible}
                className="py-6 border-b"
            >
                <CollapsibleTrigger className="w-full transition duration-500 transform" >
                    <div className="flex items-center justify-between w-full">
                        <p className="font-semibold">Offers</p>
                        <ChevronDown className={`${offers === true ? 'rotate-180' : 'rotate-0'} text-primary `} />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    Yes. Free to use for personal and commercial projects. No attribution
                    required.
                </CollapsibleContent>

            </Collapsible>

            <Collapsible
                open={dietary}
                onOpenChange={setDietaryCollapsible}
                className="py-6 border-b"
            >
                <CollapsibleTrigger className="w-full transition duration-500 transform" >
                    <div className="flex items-center justify-between w-full">
                        <p className="font-semibold">Dietary</p>
                        <ChevronDown className={`${dietary === true ? 'rotate-180' : 'rotate-0'} text-primary `} />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    {dietaries?.map((item, index) => {
                        return (
                            <div key={`dietary-${index}`} className="flex items-center mt-4 ml-2 space-x-2">
                                <Checkbox id="terms2" />
                                <Label>{item.name}({item.count})</Label>
                            </div>
                        )
                    })}
                </CollapsibleContent>

            </Collapsible>

            <Collapsible
                open={categoriesCollapsible}
                onOpenChange={setCategoriesCollapsible}
                className="py-6 border-b"
            >
                <CollapsibleTrigger className="w-full transition duration-500 transform" >
                    <div className="flex items-center justify-between w-full">
                        <p className="font-semibold">Categories</p>
                        <ChevronDown className={`${categoriesCollapsible === true ? 'rotate-180' : 'rotate-0'} text-primary `} />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    {categories?.map((item, index) => {
                        return (
                            <div key={`cat-${index}`} className="flex items-center mt-4 ml-2 space-x-2">
                                <Checkbox id="terms2" />
                                <Label>{item.name}({item.count})</Label>
                            </div>
                        )
                    })}
                </CollapsibleContent>

            </Collapsible>
        </div>
    )
}

export default SideBar