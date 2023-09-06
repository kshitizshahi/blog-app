import { Blog } from "@/interfaces/blog";
import formatDate from "@/lib/format-date";
import Image from "next/image";
import Link from "next/link";

type BlogItemProps = {
  blog: Blog;
};

const BlogItem = ({ blog }: BlogItemProps) => {
  const shortifyDescription = (text: string, maxLength = 60) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + " ...";
  };

  const formattedDate = formatDate(blog.date);
  return (
    <Link href={`/blogs/${blog?.slug}`} className="flex flex-col group">
      <div className="relative overflow-hidden rounded-sm h-[16rem] sm:h-[20rem] md:h-[17rem] lg:h-[16rem] ">
        <Image
          fill
          src={blog.coverImage}
          alt={""}
          className="object-cover object-center w-full h-full transition-all duration-200 ease-linear delay-100 group-hover:scale-110 "
        />
      </div>

      <h3 className="mt-4 mb-3 text-lg font-bold group-hover:text-link">
        {blog.title}
      </h3>
      <p className="text-sm font-medium dark:text-slate-400 text-slate-600">
        {shortifyDescription(blog.description, 100)}
      </p>
      <div className="flex items-center gap-3 mt-2 ">
        <p className="text-xs">{formattedDate}</p>
        <p className="text-xs">- {blog.readTime}</p>
      </div>
    </Link>
  );
};
export default BlogItem;
