import { getSortedBlogs } from "@/lib/blog";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { search } = req.nextUrl;

    const query = search.split("=")[1];
    const blogs = getSortedBlogs();

    if (req.url.includes("/api/search?q")) {
      const searchQuery = req.nextUrl.searchParams.get("q");
      let message = "";
      if (searchQuery !== null) {
        const filteredData = blogs.filter((blog) =>
          blog?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredData.length === 0) {
          message = "No Blogs Found";
        }
        return NextResponse.json({ blogs: filteredData, message: message });
      }
    } else {
      const filteredData = blogs.filter((blog) => blog?.tags?.includes(query));
      return NextResponse.json(filteredData);
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
