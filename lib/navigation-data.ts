import {
  Baby,
  BookOpen,
  CalendarDays,
  CakeSlice,
  Paintbrush,
  Sparkles
} from "lucide-react";

// Centralized navigation config keeps desktop/mobile/header behavior in sync.
export const primaryNavItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "#programs", menu: "programs" as const },
  { label: "Classes", href: "#classes", menu: "shop" as const },
  { label: "Blog", href: "/news" },
  { label: "Contact Us", href: "/contact" }
];

export const programsMenu = [
  { label: "Program Overview", href: "/#program-overview" },
  { label: "Why Choose Us", href: "/#why-choose-us" },
  { label: "Learning Highlights", href: "/#learning-highlights" },
  { label: "Theme Activities", href: "/#theme-activities" },
  { label: "Gallery Preview", href: "/#gallery-preview" },
  { label: "Admission Details", href: "/#admission-details" }
];

export const eventsMenu = [
  { label: "Event List", href: "#events" },
  { label: "Event Calendar", href: "#events" },
  { label: "Birthday Parties", href: "#events" },
  { label: "Theme Parties", href: "#events" },
  { label: "Weekend Events", href: "#events" }
];

export const shopMegaMenuColumns = [
  [
    {
      id: "01",
      title: "Play Group",
      subtitle: "Age: 2-3 Years",
      href: "/shop/play-group",
      icon: Baby
    },
    {
      id: "02",
      title: "Nursery Program",
      subtitle: "Age: 3-4 Years",
      href: "/shop/nursery-program",
      icon: BookOpen
    },
    {
      id: "03",
      title: "Junior KG",
      subtitle: "Age: 4-5 Years",
      href: "/shop/junior-kg",
      icon: Sparkles
    }
  ],
  [
    {
      id: "04",
      title: "Senior KG",
      subtitle: "Age: 5-6 Years",
      href: "/shop/senior-kg",
      icon: CalendarDays
    },
    {
      id: "05",
      title: "Activity Classes",
      subtitle: "Art, Music, Dance, Creativity",
      href: "/shop/activity-classes",
      icon: Paintbrush
    },
    {
      id: "06",
      title: "Day Care",
      subtitle: "Safe and supervised child care",
      href: "/shop/day-care",
      icon: CakeSlice
    }
  ]
];

// Utility strip data stays outside UI components for easier content updates.
export const utilityMeta = [
  { label: "Call", value: "+1 (234) 567-8910", href: "tel:+12345678910" },
  {
    label: "Email",
    value: "hello@kidnestplay.com",
    href: "mailto:hello@kidnestplay.com"
  },
  { label: "Hours", value: "Mon-Sat 8:00 AM - 7:00 PM" }
];
