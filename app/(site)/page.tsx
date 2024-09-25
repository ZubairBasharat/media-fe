import CardWrapper from "@/components/sites/home/CardWrapper/page"
import Explainer from "@/components/sites/home/Explainer/page"
import FooterArea from "@/components/sites/home/FooterArea/page"
import HomepageHero from "@/components/sites/home/HomepageHero/page"

export default function IndexPage() {
  return (
    <>
      <HomepageHero />
      <Explainer />
      <CardWrapper />
      <FooterArea />
    </>
  )
}
