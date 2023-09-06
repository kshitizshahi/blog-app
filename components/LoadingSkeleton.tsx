import { Skeleton } from "@/components/ui/skeleton";

const cards = [1, 2, 3];

const LoadingSkeleton = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col mt-5 gap-y-5">
        <Skeleton className="h-8 w-[200px] mb-2" />
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-8">
          {cards.map((elem, index) => (
            <div className="flex flex-col gap-3" key={index}>
              <Skeleton className="rounded-sm h-[16rem] sm:h-[20rem] md:h-[17rem] lg:h-[16rem] " />
              <Skeleton className="w-full rounded-none h-7" />
              <Skeleton className="w-full h-5 rounded-none" />
              <Skeleton className="h-4 w-[50%] rounded-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LoadingSkeleton;
