import { Facebook, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


type Props = {}

const FooterArea = (props: Props) => {
  return (
    <section className="bg-[#2e3333] pt-10">
      <div className="mx-auto px-4 md:w-4/5">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 md:col-span-1">
            <div className="h-[365px] space-y-4 rounded bg-[#434848] p-4 text-white">
              <h2 className="text-xl">Discover RestroPlus</h2>
              <ul className="space-y-1 text-sm">
                <li className="hover:text-teal-600">
                  <Link href={""}>Investors</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>About us</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Takeaway</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>More</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Newsroom</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Engineering blog</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Design blog</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Gift Cards</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Careers</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Restaurant signup</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Become a rider</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>RestroPlus Talent Directory</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-4 md:col-span-1">
            <div className="h-[365px] space-y-4 rounded bg-[#434848] p-4 text-white">
              <h2 className="text-xl">Legal</h2>
              <ul className="space-y-1 text-sm">
                <li className="hover:text-teal-600">
                  <Link href={""}>Terms and conditions</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Privacy</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Cookies</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Modern Slavery Statement</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Tax Strategy</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Section 172 Statement</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-4 md:col-span-1">
            <div className="h-[365px] space-y-4 rounded bg-[#434848] p-4 text-white">
              <h2 className="text-xl">Help</h2>
              <ul className="space-y-1 text-sm">
                <li className="hover:text-teal-600">
                  <Link href={""}>Contact</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>FAQs</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Cuisines</Link>
                </li>
                <li className="hover:text-teal-600">
                  <Link href={""}>Brands</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-4 md:col-span-1">
            <div className="h-[365px] space-y-4 rounded bg-[#434848] p-4 text-white">
              <h2 className="text-xl">Take RestroPlus with you</h2>
              <div className="space-y-6">
                <div className="h-[75px]">
                  <Link href={""}>
                    <Image
                      src={"/assets/images/homepage/apples.png"}
                      alt=""
                      width="0"
                      height="0"
                      sizes="100vw"
                      className="h-full w-auto"
                    />
                  </Link>
                </div>
                <div className="h-[75px]">
                  <Link href={""}>
                    <Image
                      src={"/assets/images/homepage/google.png"}
                      alt=""
                      width="0"
                      height="0"
                      sizes="100vw"
                      className="h-full w-auto"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 text-white">
          <div className="flex gap-4">
            <Link href={""}>
              <Facebook />
            </Link>
            <Link href={""}>
              <Linkedin />
            </Link>
            <Link href={""}>
              <Instagram />
            </Link>
          </div>
          <div>
            <p>© 2023 Restro Plus</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FooterArea
