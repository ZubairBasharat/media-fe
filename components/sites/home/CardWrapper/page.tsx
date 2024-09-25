import { Button } from "@/components/ui/button";
type Props = {}

const CardWrapper = (props: Props) => {
    return (
        <section className="container mx-auto my-10">
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6">
                    <div className="relative h-[480px] rounded-xl" style={{
                        backgroundImage: "url('/assets/images/homepage/best-pic4.avif')", backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }} >
                        <div className="absolute bottom-4 left-4 space-y-2 ">
                            <h2 className="text-3xl font-semibold text-white "> Partner with us </h2>
                            <p className="w-2/3 text-white">Join RestroPlus and reach more customers than ever. We handle delivery, so you can focus on the food.</p>
                            <Button className="bg-white text-black hover:bg-white" >Get started <span className="ml-2 text-xl text-secondary">{' -->'}</span>  </Button>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="relative h-[480px] rounded-xl" style={{
                        backgroundImage: "url('/assets/images/homepage/educational-pic.avif')",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }} >
                        <div className="absolute bottom-4 left-4 space-y-2 ">
                            <h2 className="text-3xl font-semibold text-white ">Ride with us </h2>
                            <p className="w-2/3 text-white">The freedom to fit work around your life. Plus great fees, perks and discounts.</p>
                            <Button className="bg-white text-black hover:bg-white" >Get started <span className="ml-2 text-xl text-secondary">{' -->'}</span> </Button>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="relative h-[480px] rounded-xl" style={{
                        backgroundImage: "url('/assets/images/homepage/compress-video-banner.avif')",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }} >
                        <div className="absolute bottom-4 left-4 space-y-2 ">
                            <h2 className="text-3xl font-semibold text-white ">Restro Plus For Work </h2>
                            <p className="w-2/3 text-white">Looking for a workplace food solution to reward your team, boost morale or treat your clients? Our corporate team can help.</p>
                            <Button className="bg-white text-black hover:bg-white" >Get started <span className="ml-2 text-xl text-secondary">{' -->'}</span> </Button>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="relative h-[480px] rounded-xl" style={{
                        backgroundImage: "url('https://a.storyblok.com/f/62776/1280x853/60c301dc8a/giftcardhero.png')",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }} >
                        <div className="absolute bottom-4 left-4 space-y-2 ">
                            <h2 className="text-3xl font-semibold text-white "> Gift Cards </h2>
                            <p className="w-2/3 text-white">Looking for an easy way to treat your friends and family? Give the gift of great food with a RestroPlus gift card.</p>
                            <Button className="bg-white text-black hover:bg-white" >Get started <span className="ml-2 text-xl text-secondary">{' -->'}</span> </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CardWrapper