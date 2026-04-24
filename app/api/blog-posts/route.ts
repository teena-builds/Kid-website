import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/wordpress";

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json({ posts }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Unable to fetch blog posts." },
      { status: 500 }
    );
  }
}
