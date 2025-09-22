import { Skeleton } from "@heroui/skeleton";
import { FC } from "react";

const UserPageSkeleton: FC = () => {
  return (
    <main className="flex justify-center min-h-screen bg-white dark:bg-dark/50">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg dark:bg-dark rounded-md mt-6 mx-auto">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex-shrink-0 flex justify-center sm:justify-start w-full sm:w-auto">
            <Skeleton className="rounded-full w-32 h-32" />
          </div>

          <div className="flex-grow flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <Skeleton className="h-6 w-48 rounded-lg mb-1" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>
            </div>

            <div className="flex gap-4">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>

            <Skeleton className="h-4 w-64 rounded-md" />
          </div>
        </div>

        <span className="w-full flex justify-center mt-6">
          <Skeleton className="h-0.5 w-full rounded-lg" />
        </span>

        <div className="mt-6 w-full">
          <div className="flex h-8 justify-center gap-5">
            <Skeleton className="h-5 w-32 rounded-lg" />
            <Skeleton className="h-5 w-32 rounded-lg" />
          </div>
          <Skeleton className="h-32 w-full rounded-lg mt-4" />
        </div>
      </div>
    </main>
  );
};

export default UserPageSkeleton;
