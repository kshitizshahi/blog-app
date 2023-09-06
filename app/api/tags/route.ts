import { getSortedBlogs } from "@/lib/blog";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const blogs = getSortedBlogs();
    let tagsArray: string[] = [];

    blogs.map((blog) => blog.tags.map((tag) => tagsArray.push(tag)));

    const tagsDetails = [...new Set(tagsArray)];
    return NextResponse.json(tagsDetails);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
