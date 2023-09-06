import Image from "next/image";
import { Blog } from "@/interfaces/blog";
import Link from "next/link";

type BlogHeaderProps = {
  blog: Blog;
};

const BlogHeader = ({ blog }: BlogHeaderProps) => {
  return (
    <div className="blog-detail-header">
      <div className="flex flex-row justify-between mb-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Link href="#">
              <div className="relative h-10 w-10 !mb-0">
                <Image
                  priority
                  fill
                  objectFit="cover"
                  className="rounded-full"
                  src={blog.authorImage}
                  alt=""
                  sizes=""
                />
              </div>
            </Link>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium !mb-0">
              <a href="#" className="hover:underline">
                {blog.author}
              </a>
            </p>
            <div className="flex mt-[2px] text-sm dark:text-slate-400 text-slate-500 gap-2">
              <time dateTime={blog.date}>{blog.date} </time>
              <p className="font-semibold">-</p>
              <p className="my-auto text-[13px] dark:text-slate-400 text-slate-500">
                {blog?.readTime}
              </p>
            </div>
          </div>
        </div>
        <div className="flex self-end">{/* Social Links Here */}</div>
      </div>

      <h1 className="mb-3 text-3xl font-bold md:text-4xl">{blog.title}</h1>
      <h2 className="mb-5 text-base md:text-lg dark:text-slate-400 text-slate-600 blog-detail-header-subtitle">
        {blog.description}
      </h2>
      <div className="relative w-full mx-auto h-[16rem] sm:h-[20rem] md:h-[24rem]">
        <Image
          priority
          fill
          objectFit="cover"
          src={blog.coverImage}
          alt=""
          sizes=""
        />
      </div>
    </div>
  );
};

export default BlogHeader;
