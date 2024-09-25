import {
  Bell,
  LucideProps,
  Mail,
  Moon,
  Search,
  SunMedium,
  Twitter,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  search: Search,
  mail: Mail,
  bell: Bell,


  // custom icon
  menubar: (props: LucideProps) => (
    <svg
      {...props}
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.3334 24V26.6667H6.66669V24H21.3334Z" fill="currentColor" />
      <path
        d="M25.3334 7.99967V5.33301H10.6667V7.99967H25.3334Z"
        fill="currentColor"
      />
      <path d="M28 17.3337V14.667H4V17.3337H28Z" fill="currentColor" />
    </svg>
  ),
}
