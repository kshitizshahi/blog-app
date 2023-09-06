import { getBlogContent, getSortedBlogs } from "@/lib/blog";
import { notFound } from "next/navigation";
import BlogHeader from "@/components/BlogHeader";
import Link from "next/link";

export function generateStaticParams() {
  const blogs = getSortedBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const blogs = getSortedBlogs();
  const { slug } = params;

  const blog = blogs.find((blog) => blog.slug === slug);

  if (!blog) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: blog.title,
  };
}

const BlogDetail = async ({ params }: { params: { slug: string } }) => {
  const blogs = getSortedBlogs();
  const { slug } = params;

  if (!blogs.find((blog) => blog.slug === slug)) notFound();

  const blog = await getBlogContent(params.slug);

  return (
    <div className="container mx-auto lg:max-w-3xl">
      <BlogHeader blog={blog} />
      <article className="prose lg:prose-lg text-primary dark:prose-invert">
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="!text-primary"
        />
      </article>
      <div className="flex flex-wrap gap-3 mt-10">
        {blog?.tags?.map((tag, index) => (
          <Link href={`/blogs/search?tag=${tag}`} key={index}>
            <p className="px-4 py-2 text-xs uppercase rounded-[2px] border border-slate-300 dark:border-slate-700 font-semibold">
              {tag}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default BlogDetail;
