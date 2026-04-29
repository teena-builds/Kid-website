import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { eventCards } from "@/data/home-data";
import { Reveal } from "@/components/ui/reveal";
import { getAllPosts } from "@/lib/wordpress";
import type { NewsPost } from "@/data/news-data";

type HomeBlogCard = {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncateText(text: string, maxLength = 112) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function postToCard(post: NewsPost): HomeBlogCard {
  return {
    id: post.id || post.slug,
    title: post.title,
    date: post.date,
    category: post.category,
    description: truncateText(stripHtml(post.excerptHtml)),
    image: post.image || "/newsletter.jpg",
    imageAlt: post.imageAlt,
    href: `/news/${post.slug}`
  };
}

function fallbackCards(): HomeBlogCard[] {
  return eventCards.slice(0, 3).map((item) => ({
    id: item.title,
    title: item.title,
    date: item.date,
    category: item.ageGroup,
    description: item.description,
    image: item.image,
    imageAlt: item.title,
    href: "/news"
  }));
}

async function getHomeBlogCards() {
  try {
    const posts = await getAllPosts();
    const cards = posts.slice(0, 3).map(postToCard);
    return cards.length > 0 ? cards : fallbackCards();
  } catch {
    return fallbackCards();
  }
}

export async function EventsSection() {
  const blogCards = await getHomeBlogCards();

  return (
    <section id="events" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-coral">
            Latest Blog
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl text-brand-ink sm:text-5xl">
            Helpful stories, ideas, and updates for growing young learners.
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {blogCards.map((item, idx) => (
            <Reveal key={`${item.id}-${item.href}`} delay={idx * 0.06}>
              <article className="group overflow-hidden rounded-[1.8rem] border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                <div className="overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1000}
                    height={720}
                    loading={idx === 0 ? "eager" : "lazy"}
                    unoptimized
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-6">
                  <p className="inline-flex items-center gap-2 rounded-full bg-[#fff5ea] px-3 py-1 text-xs uppercase tracking-wide text-brand-coral">
                    <Calendar className="h-3.5 w-3.5" /> {item.date}
                  </p>
                  <h3 className="mt-4 line-clamp-2 text-xl font-semibold leading-tight text-brand-ink">
                    {item.title}
                  </h3>
                 
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  <Link
                    href={item.href}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--btn-color)] px-5 py-2.5 text-sm text-white shadow-[0_14px_30px_-22px_rgba(247,154,30,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--btn-color-hover)] hover:shadow-[0_18px_34px_-22px_rgba(247,154,30,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
                  >
                    Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
