export type NewsCategory = string;

export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  excerptHtml: string;
  contentHtml: string;
  date: string;
  author: string;
  comments: number;
  readingTimeMinutes: number;
  category: NewsCategory;
  categories: string[];
  image: string;
  imageAlt: string;
};
