export type ShopPageKey =
  | "play-group"
  | "nursery-program"
  | "junior-kg"
  | "senior-kg"
  | "activity-classes"
  | "day-care";

export type ShopBanner = {
  title: string;
  breadcrumb: string;
  image: string;
  imageAlt: string;
};

export type ShopPageData = {
  key: ShopPageKey;
  banner: ShopBanner;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  benefits: string[];
};

export const shopPageMeta: Record<ShopPageKey, ShopPageData> = {
  "play-group": {
    key: "play-group",
    banner: {
      title: "Play Group",
      breadcrumb: "Home / Classes / Play Group",
      image:
        "https://images.pexels.com/photos/8612998/pexels-photo-8612998.jpeg?auto=compress&cs=tinysrgb&w=1600",
      imageAlt: "Toddlers playing with colorful blocks"
    },
    seoTitle: "KidNest Play Center | Play Group Program",
    seoDescription:
      "Explore KidNest Play Group for toddlers with safe routines, social play, sensory discovery, expert teachers, and parent updates.",
    intro:
      "A gentle play group program for toddlers beginning preschool, with safe routines, social learning, and warm teacher support.",
    benefits: ["Smooth first-school transition", "Safe supervised play", "Parent-friendly progress updates"]
  },
  "nursery-program": {
    key: "nursery-program",
    banner: {
      title: "Nursery Program",
      breadcrumb: "Home / Classes / Nursery Program",
      image:
        "https://images.pexels.com/photos/8471833/pexels-photo-8471833.jpeg?auto=compress&cs=tinysrgb&w=1600",
      imageAlt: "Children painting in nursery classroom"
    },
    seoTitle: "KidNest Play Center | Nursery Program",
    seoDescription:
      "Discover KidNest Nursery Program with playful literacy, number sense, creative activities, caring teachers, and school readiness.",
    intro:
      "A balanced nursery program that builds language, number sense, creativity, and confidence through joyful classroom experiences.",
    benefits: ["Playful early academics", "Small-group teacher support", "Regular communication with parents"]
  },
  "junior-kg": {
    key: "junior-kg",
    banner: {
      title: "Junior KG",
      breadcrumb: "Home / Classes / Junior KG",
      image:
        "https://images.pexels.com/photos/8471774/pexels-photo-8471774.jpeg?auto=compress&cs=tinysrgb&w=1600",
      imageAlt: "Junior KG kids writing and learning"
    },
    seoTitle: "KidNest Play Center | Junior KG Program",
    seoDescription:
      "Join KidNest Junior KG for phonics, writing readiness, math foundations, communication skills, and safe teacher-guided learning.",
    intro:
      "A Junior KG program that blends school readiness, social confidence, and structured practice in a caring environment.",
    benefits: ["Phonics and writing readiness", "Confidence in communication", "Clear progress tracking"]
  },
  "senior-kg": {
    key: "senior-kg",
    banner: {
      title: "Senior KG",
      breadcrumb: "Home / Classes / Senior KG",
      image:
        "https://images.pexels.com/photos/8422106/pexels-photo-8422106.jpeg?auto=compress&cs=tinysrgb&w=1600",
      imageAlt: "Senior KG children learning in class"
    },
    seoTitle: "KidNest Play Center | Senior KG Program",
    seoDescription:
      "Prepare for primary school with KidNest Senior KG, focused on reading, writing, math fluency, social confidence, and safety.",
    intro:
      "A Senior KG program focused on primary school readiness, confident communication, and independent classroom habits.",
    benefits: ["Primary school readiness", "Reading and math fluency", "Family-focused milestone updates"]
  },
  "activity-classes": {
    key: "activity-classes",
    banner: {
      title: "Activity Classes",
      breadcrumb: "Home / Classes / Activity Classes",
      image:
        "https://images.pexels.com/photos/8471827/pexels-photo-8471827.jpeg?auto=compress&cs=tinysrgb&w=1600",
      imageAlt: "Kids involved in music and art activities"
    },
    seoTitle: "KidNest Play Center | Activity Classes",
    seoDescription:
      "Explore KidNest activity classes in art, music, dance, craft, and creative expression with safe spaces and expert mentors.",
    intro:
      "Creative activity classes that help children discover talents, express ideas, and build confidence after school.",
    benefits: ["Art, music, dance, and craft", "Expert activity mentors", "Flexible parent-friendly timings"]
  },
  "day-care": {
    key: "day-care",
    banner: {
      title: "Day Care",
      breadcrumb: "Home / Classes / Day Care",
      image:
        "https://images.pexels.com/photos/3933049/pexels-photo-3933049.jpeg?auto=compress&cs=tinysrgb&w=1600",
      imageAlt: "Caregiver supporting children in day care"
    },
    seoTitle: "KidNest Play Center | Day Care Program",
    seoDescription:
      "KidNest Day Care offers safe full-day and half-day care, supervised play, meal and nap routines, and daily parent updates.",
    intro:
      "A dependable day care program for working families, with safe spaces, caring routines, and transparent parent communication.",
    benefits: ["Secure entry and supervised zones", "Meal and nap routine support", "Daily updates for parents"]
  }
};
