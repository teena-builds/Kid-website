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
};

export const shopPageMeta: Record<ShopPageKey, ShopPageData> = {
  "play-group": {
    key: "play-group",
    banner: {
      title: "Play Group",
      breadcrumb: "Home / Shop / Play Group",
      image:
        "https://images.pexels.com/photos/8612998/pexels-photo-8612998.jpeg?auto=compress&cs=tinysrgb&w=1600",
      imageAlt: "Toddlers playing with colorful blocks"
    }
  },
  "nursery-program": {
    key: "nursery-program",
    banner: {
      title: "Nursery Program",
      breadcrumb: "Home / Shop / Nursery Program",
      image:
        "https://images.pexels.com/photos/8471833/pexels-photo-8471833.jpeg?auto=compress&cs=tinysrgb&w=1600",
      imageAlt: "Children painting in nursery classroom"
    }
  },
  "junior-kg": {
    key: "junior-kg",
    banner: {
      title: "Junior KG",
      breadcrumb: "Home / Shop / Junior KG",
      image:
        "https://images.pexels.com/photos/8471774/pexels-photo-8471774.jpeg?auto=compress&cs=tinysrgb&w=1600",
      imageAlt: "Junior KG kids writing and learning"
    }
  },
  "senior-kg": {
    key: "senior-kg",
    banner: {
      title: "Senior KG",
      breadcrumb: "Home / Shop / Senior KG",
      image:
        "https://images.pexels.com/photos/8422106/pexels-photo-8422106.jpeg?auto=compress&cs=tinysrgb&w=1600",
      imageAlt: "Senior KG children learning in class"
    }
  },
  "activity-classes": {
    key: "activity-classes",
    banner: {
      title: "Activity Classes",
      breadcrumb: "Home / Shop / Activity Classes",
      image:
        "https://images.pexels.com/photos/8471827/pexels-photo-8471827.jpeg?auto=compress&cs=tinysrgb&w=1600",
      imageAlt: "Kids involved in music and art activities"
    }
  },
  "day-care": {
    key: "day-care",
    banner: {
      title: "Day Care",
      breadcrumb: "Home / Shop / Day Care",
      image:
        "https://images.pexels.com/photos/3933049/pexels-photo-3933049.jpeg?auto=compress&cs=tinysrgb&w=1600",
      imageAlt: "Caregiver supporting children in day care"
    }
  }
};
