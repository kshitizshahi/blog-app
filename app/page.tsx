import BlogItem from "@/components/BlogItem";
import { getSortedBlogs } from "@/lib/blog";

export default function Home() {
  const blogs = getSortedBlogs();

  return (
    <div>
      <h2 className="mb-5 text-xl font-semibold">Latest Blogs</h2>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-8">
        {blogs.map((blog) => (
          <BlogItem key={blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  );
}
