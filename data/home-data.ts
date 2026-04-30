import {
  CalendarHeart,
  GraduationCap,
  HeartHandshake,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  SunMedium,
  TentTree,
  TreePalm
} from "lucide-react";

export const heroSlides = [
  {
    id: "kindergarten-program",
    tag: "Kindergarten Program",
    heading: "Safe Preschool, Day Care & Kids Activities.",
    description:
      "A trusted early learning center where children grow through safe classrooms, expert teachers, guided play, and parent-friendly care.",
    primaryCta: { label: "Explore Programs", href: "#programs" },
    image:
      "https://images.pexels.com/photos/8613100/pexels-photo-8613100.jpeg?auto=compress&cs=tinysrgb&w=2200",
    imageAlt: "Children learning together in a kindergarten classroom",
    bgClass: "from-[#fbf1df] to-[#dae9e8]"
  },
  {
    id: "creative-learning",
    tag: "Creative Learning",
    heading: "Creative Learning in a Secure Indoor Space.",
    description:
      "Art, music, movement, and collaborative play help children build confidence, communication, and school readiness.",
    primaryCta: { label: "Explore Activities", href: "#events" },
    image:
      "https://images.pexels.com/photos/8471833/pexels-photo-8471833.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Children painting together in a bright classroom",
    bgClass: "from-[#f1fff6] to-[#f1e5d7]"
  },
  {
    id: "kids-play-room",
    tag: "Kids Play Room",
    heading: "Nurturing Joy, Safety, and Growth.",
    description:
      "Attentive educators, child-first routines, and supervised play zones create comfort, confidence, and meaningful progress.",
    primaryCta: { label: "Get Started", href: "#cta" },
    image:
      "https://images.pexels.com/photos/8471887/pexels-photo-8471887.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Children learning and smiling together",
    bgClass: "from-[#d2e9e6] to-[#ffefdc]"
  }
];

export const featureCards = [
  {
    title: "Sports Class",
    description: "Indoor and outdoor movement sessions for active growth.",
    href: "#programs",
    icon: Sparkles,
    color: "from-[#fff4ec] via-[#fff8f1] to-[#fff0e7]"
  },
  {
    title: "Music Class",
    description: "Rhythm-based learning with joyful, guided expression time.",
    href: "#promo",
    icon: GraduationCap,
    color: "from-[#20b9b4] via-[#19b5af] to-[#0ea7a1]"
  },
  {
    title: "Drawing Class",
    description: "Creative sketch, color play, and visual storytelling labs.",
    href: "#gallery",
    icon: CalendarHeart,
    color: "from-[#f4efff] via-[#f8f3ff] to-[#efe7ff]"
  }
];

export const aboutHighlights = [
  "CCTV-secured classrooms and supervised play zones",
  "Balanced routines for learning, activity, and rest",
  "Flexible plans for day care, events, and enrichment"
];

export const aboutShowcase = {
  heading: "Best for Your Kids",
  description:
    "KidNest gives children a safe, joyful start through preschool learning, day care support, activity classes, and caring routines built with parents in mind.",
  image:
    "https://images.pexels.com/photos/8471887/pexels-photo-8471887.jpeg?auto=compress&cs=tinysrgb&w=1400",
  imageAlt: "Happy children learning together with a tablet",
  stats: [
    { value: "14+", label: "Years of experience" },
    { value: "7K+", label: "Students each year" },
    { value: "15+", label: "Awards won" }
  ],
  bullets: [
    "Child-safe routines, supervised classrooms, and clear parent updates.",
    "Experienced teachers who support each child's pace and personality."
  ],
  primaryCta: { label: "Book a Visit", href: "#cta" },
  videoCta: { label: "Promotional Video", href: "#gallery" }
};

export const programs = [
  {
    title: "Nursery School",
    description: "Foundational literacy, rhythm, and exploration-based learning.",
    icon: TreePalm
  },
  {
    title: "Special Classes",
    description: "Art, language, storytelling, and creative confidence sessions.",
    icon: Sparkles
  },
  {
    title: "Extended Day",
    description: "Structured after-hours care with guided activities and support.",
    icon: CalendarHeart
  },
  {
    title: "Summer Program",
    description: "Theme-based camp weeks blending fun, learning, and expression.",
    icon: SunMedium
  },
  {
    title: "Day Care",
    description: "Safe, dependable full-day care with attentive caregivers.",
    icon: ShieldCheck
  },
  {
    title: "Weekend Club",
    description: "Weekend workshops and social play events for families.",
    icon: TentTree
  }
];

export const programShowcaseCards = [
  {
    title: "Settling",
    description:
      "Gentle transition sessions that help children feel secure and ready to learn.",
    image:
      "https://images.pexels.com/photos/8471973/pexels-photo-8471973.jpeg?auto=compress&cs=tinysrgb&w=1200",
    age: "6-7 Yrs",
    days: "5 Days",
    hours: "3.30 Hrs",
    stripColor: "bg-[#16b9b3]"
  },
  {
    title: "Play Group",
    description:
      "We transform everyday learning into playful group discovery sessions.",
    image:
      "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1200",
    age: "3-4 Yrs",
    days: "5 Days",
    hours: "3.30 Hrs",
    stripColor: "bg-[#f79a1e]"
  },
  {
    title: "Junior Nursery",
    description:
      "A joyful classroom rhythm with art, reading, and guided expression.",
    image:
      "https://images.pexels.com/photos/8471709/pexels-photo-8471709.jpeg?auto=compress&cs=tinysrgb&w=1200",
    age: "3-4 Yrs",
    days: "5 Days",
    hours: "3.30 Hrs",
    stripColor: "bg-[#f45584]"
  }
];

export const faqSection = {
  heading: "Know More About KidNest",
  image:
    "https://images.pexels.com/photos/8613100/pexels-photo-8613100.jpeg?auto=compress&cs=tinysrgb&w=1400",
  imageAlt: "Happy children in a colorful kindergarten classroom",
  items: [
    {
      question: "What Is The Best Age To Start Kindergarten?",
      answer:
        "Some states and countries implement mandatory early childhood education. With such rules, many preschool and kindergarten learning centers are built."
    },
    {
      question: "Which Is The Best Preschool For Your Child ?",
      answer:
        "The best preschool balances safety, playful learning, qualified teachers, and a child-first environment that supports social and emotional growth."
    },
    {
      question: "What Is The Tuition Fee On First Year?",
      answer:
        "Tuition varies by program duration and services. We provide transparent fee details during counseling along with available admissions support."
    }
  ]
};

export const eventCards = [
  {
    title: "Birthday Party Carnival",
    date: "May 08, 2026",
    ageGroup: "Ages 3-8",
    description: "A themed celebration with games, decor, and interactive stations.",
    image:
      "https://images.pexels.com/photos/3661367/pexels-photo-3661367.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    title: "Weekend Fun Lab",
    date: "May 14, 2026",
    ageGroup: "Ages 4-7",
    description: "Hands-on art, music, and movement activities led by our mentors.",
    image:
      "https://images.pexels.com/photos/8471709/pexels-photo-8471709.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    title: "Theme Party Evening",
    date: "May 22, 2026",
    ageGroup: "Ages 2-6",
    description: "Costume-friendly party night with storytelling and mini performances.",
    image:
      "https://images.pexels.com/photos/8612877/pexels-photo-8612877.jpeg?auto=compress&cs=tinysrgb&w=1200"
  }
];

// Kept for compatibility with existing component modules in the project.
export const upcomingEvents = eventCards.map(
  ({ title, date, ageGroup, description }) => ({
    title,
    date,
    ageGroup,
    description
  })
);

export const testimonialPanel = {
  heading: "Parents Say",
  image:
    "https://images.pexels.com/photos/3933049/pexels-photo-3933049.jpeg?auto=compress&cs=tinysrgb&w=1800",
  imageAlt: "Teacher and child engaged in a joyful learning activity"
};

export const testimonials = [
  {
    name: "Sophia Carter",
    role: "Parent of Emma (4)",
    quote:
      "The staff is warm, the spaces are beautiful, and my daughter looks forward to every single day.",
    avatar:
      "https://images.pexels.com/photos/8612998/pexels-photo-8612998.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: "Liam Brooks",
    role: "Parent of Noah (5)",
    quote:
      "Their event planning and class quality are top-notch. It feels premium yet genuinely caring.",
    avatar:
      "https://images.pexels.com/photos/8471709/pexels-photo-8471709.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: "Mia Henderson",
    role: "Parent of Ava (3)",
    quote:
      "KidNest blends safety, fun, and early learning perfectly. We trust the team completely.",
    avatar:
      "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

export const galleryImages = [
  "https://images.pexels.com/photos/8612961/pexels-photo-8612961.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/8613267/pexels-photo-8613267.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/8471709/pexels-photo-8471709.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/8612877/pexels-photo-8612877.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/8471821/pexels-photo-8471821.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/8612889/pexels-photo-8612889.jpeg?auto=compress&cs=tinysrgb&w=1200"
];

export const footerLinks = {
  quick: [
    { label: "About", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Classes", href: "#classes" },
    { label: "Activities", href: "#programs" },
    { label: "News", href: "#events" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "#footer" }
  ],
  programs: [
    { label: "Play School", href: "#programs" },
    { label: "Nursery", href: "#programs" },
    { label: "Junior Kg", href: "#programs" },
    { label: "Senior Kg", href: "#programs" },
    { label: "Holiday Camp", href: "#events" },
    { label: "Day Care", href: "#programs" }
  ]
};

export const footerContact = {
  address: "14/A, Kilix Home Tower, NYC",
  phone: "907-200-3462",
  email: "support@kindedo.com"
};

export const themeParties = [
  {
    title: "Birthday Parties",
    text: "Signature themed setups, games, and curated activity stations.",
    icon: PartyPopper
  },
  {
    title: "Play Dates",
    text: "Small-group social sessions designed to build confidence.",
    icon: HeartHandshake
  },
  {
    title: "Holiday Celebrations",
    text: "Festival-inspired decorations, craft zones, and performances.",
    icon: SunMedium
  },
  {
    title: "Weekend Activities",
    text: "Story circles, dance sessions, and family-centered workshops.",
    icon: TentTree
  }
];
