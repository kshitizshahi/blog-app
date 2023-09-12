"use client";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react";
import { Blog } from "@/interfaces/blog";
import LoadingSkeleton from "./LoadingSkeleton";
import BlogItem from "./BlogItem";

const SearchComponent = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [data, setData] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const timeOut = setTimeout(() => searchBlog(), 500);

    const searchBlog = () => {
      if (query !== null && query !== "") {
        setIsLoading(true);
        fetch(`/api/search?q=${query}`, {
          signal: controller.signal,
        })
          .then((res) => res.json())
          .then((data) => {
            setData(data.blogs);
            setIsLoading(false);
            setMessage(data.message);
          });
      }
      if (query === "") {
        setData([]);
        setQuery(null);
        setMessage("");
      }
    };

    return () => {
      controller.abort();
      clearTimeout(timeOut);
    };
  }, [query]);

  return (
    <div className="min-h-[33rem]">
      <div className="flex items-center justify-center gap-3 px-4 py-3 mb-8 rounded bg-slate-50 dark:bg-gray-800">
        <BsSearch size="17" />
        <input
          placeholder="Search Blogs"
          onKeyUpCapture={(e) => setQuery((e.target as HTMLInputElement).value)}
          className="w-full border-none outline-none bg-slate-50 dark:bg-gray-800"
        />
      </div>
      {isLoading ? (
        <div className="min-h-[33rem]">
          <LoadingSkeleton />
        </div>
      ) : data?.length > 0 ? (
        <div>
          <h2 className="mb-4 text-xl font-semibold">Latest Blogs</h2>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-8">
            {data.map((blog) => (
              <BlogItem key={blog.slug} blog={blog} />
            ))}
          </div>
        </div>
      ) : query !== null ? (
        <p className="mt-10 text-2xl font-semibold text-center">{message}</p>
      ) : (
        <p className="text-2xl font-semibold text-center ">Search By Name</p>
      )}
    </div>
  );
};
export default SearchComponent;
