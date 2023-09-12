"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TagComponent from "@/components/TagComponent";
import SearchComponent from "@/components/SearchComponent";

export default function Search() {
  const searchParams = useSearchParams();
  const tagQuery = searchParams.get("tag");

  return (
    <Tabs defaultValue={tagQuery ? "tags" : "search"}>
      <TabsList>
        <TabsTrigger value="search">Search By Name</TabsTrigger>
        <TabsTrigger value="tags">Search By Tags</TabsTrigger>
      </TabsList>
      <TabsContent value="search" className="mt-5">
        <SearchComponent />
      </TabsContent>
      <TabsContent value="tags" className="mt-5">
        <TagComponent tagQuery={tagQuery} />
      </TabsContent>
    </Tabs>
  );
}
