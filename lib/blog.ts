import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Blog } from "@/interfaces/blog";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const blogDirectory = path.join(process.cwd(), "/content/blogs");

const getSortedBlogs = (): Blog[] => {
  const fileNames = fs.readdirSync(blogDirectory);
  const markDownFiles = fileNames.filter((file) => file.endsWith(".md"));

  // Get gray-matter data from each file.
  const blogsMetaData = markDownFiles.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents); //data: {title: "", subTitle: ""} ---> metadata of file

    return { ...data, slug } as Blog;
  });

  // Sort blogs by date
  return blogsMetaData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

const getBlogContent = async (slug: string) => {
  const fullPath = path.join(blogDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the content(body) and data(metadata)
  const { data, content } = matter(fileContents);

  const htmlContent = (
    await remark().use(html).use(remarkGfm).process(content)
  ).toString();

  return { ...data, content: htmlContent, slug } as Blog;
};

export { getSortedBlogs, getBlogContent };
