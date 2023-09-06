import { getSortedBlogs } from "@/lib/blog";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { search } = req.nextUrl;

    const query = search.split("=")[1];
    const blogs = getSortedBlogs();

    const filteredData = blogs.filter((blog) => blog?.tags?.includes(query));
    return NextResponse.json(filteredData);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
