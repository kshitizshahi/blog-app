import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { BsSearch } from "react-icons/bs";

const NavBar = () => {
  return (
    <header className="flex justify-between pt-3 border-b border-slate-200 dark:border-slate-700">
      <Link href="/">
        <p className="text-3xl font-semibold text-logo"> ks</p>
      </Link>
      <div className="flex items-center justify-center gap-2">
        <div className="group">
          <a href="/blogs/search">
            <BsSearch
              size="18"
              className="relative cursor-pointer hover:text-link"
            />
          </a>
          <p className="absolute hidden group-hover:inline-block border border-slate-300 group-hover:top-[4rem] text-sm p-2 rounded-[2px]">
            Search Blog
          </p>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};
export default NavBar;
