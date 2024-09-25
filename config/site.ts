export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "RestroPlus",
  description:
    "Restaurant food, takeaway and groceries. Delivered",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Admin",
      href: "/admin",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
