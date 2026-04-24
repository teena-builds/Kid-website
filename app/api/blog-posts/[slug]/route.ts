import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/wordpress";

type Context = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_: Request, context: Context) {
  const { slug } = await context.params;

  try {
    const post = await getPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }
    return NextResponse.json({ post }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Unable to fetch blog post." },
      { status: 500 }
    );
  }
}
