"use client";
import { useState, useEffect } from "react";

import BlogItem from "@/components/BlogItem";
import LoadingSkeleton from "./LoadingSkeleton";
import { Blog } from "@/interfaces/blog";

const TagComponent = ({ tagQuery }: { tagQuery: string | null }) => {
  const [data, setData] = useState<Blog[]>([]);
  const [tags, setTags] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [tagLoading, setTagLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/search?tag=${tagQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/tags")
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
        setTagLoading(false);
      });
  }, []);

  if (isLoading || tagLoading)
    return (
      <div className="min-h-[33rem]">
        <LoadingSkeleton />
      </div>
    );

  return (
    <div className="min-h-[33rem]">
      <div className="flex flex-wrap gap-3 mb-8">
        {tags?.map((tag, index) => (
          <a href={`/blogs/search?tag=${tag}`} key={index}>
            <p
              className={`px-4 py-2 text-xs uppercase rounded-[2px] border border-slate-300 dark:border-slate-700 font-semibold 
              ${tagQuery === tag && "bg-emerald-700 text-white"}`}
            >
              {tag}
            </p>
          </a>
        ))}
      </div>

      {data?.length > 0 ? (
        <div>
          <h2 className="mb-4 text-xl font-semibold">Latest Blogs</h2>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-8">
            {data.map((blog) => (
              <BlogItem key={blog.slug} blog={blog} />
            ))}
          </div>
        </div>
      ) : tagQuery !== null ? (
        <p className="mt-10 text-2xl font-semibold text-center">
          No Blogs found
        </p>
      ) : (
        <p className="text-2xl font-semibold text-center ">Search By Tag</p>
      )}
    </div>
  );
};
export default TagComponent;
