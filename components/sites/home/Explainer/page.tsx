import Image from "next/image"

type Props = {}

const Explainer = (props: Props) => {
    return (
        <section className="container">
            <div className="my-10 grid grid-cols-2 rounded-lg bg-white shadow">
                <div className="col-span-2 space-y-6 p-8 md:col-span-1">
                    <h2 className="text-4xl font-bold">Compress your image ,audio, video ,online </h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                    <div className="pt-8">
                        <Image src={"/assets/images/homepage/app-store-badges-en.svg"} alt="" width={300} height={70} />
                    </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <div className="w-full">
                        <Image
                            src={"/assets/images/homepage/map-min.png"}
                            width="0"
                            height="0"
                            sizes="100vw"
                            className="h-auto w-full"
                            alt="profile"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Explainer