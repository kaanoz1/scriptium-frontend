import { Skeleton } from "@heroui/skeleton";
import { NextPage } from "next";

interface Props {}

const UserPageSkeleton: NextPage<Props> = ({}) => {
  return (
    <>
      <div className="flex justify-center min-h-screen bg-white dark:bg-neutral-900">
        <div className="w-full max-w-4xl p-6 bg-white dark:bg-dark rounded-md mt-6 mx-auto">
          <div className="flex flex-col items-center pl-8">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
              <Skeleton className="rounded-full w-32 h-32" />
            </div>
            <div className="flex-grow space-y-4">
              <div className="flex flex-col gap-5">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-48 rounded-lg" />
                  <Skeleton className="h-4 w-24 rounded-lg" />
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Skeleton className="h-10 w-24 rounded-md" />
                  <Skeleton className="h-10 w-10 rounded-md" />
                </div>
              </div>
              <div className="flex space-x-6 mt-4">
                <Skeleton className="h-4 w-20 rounded-lg" />
                <Skeleton className="h-4 w-20 rounded-lg" />
                <Skeleton className="h-4 w-20 rounded-lg" />
                <Skeleton className="h-4 w-20 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-64 rounded-lg mt-4" />
            </div>
          </div>
          <span className="w-full flex justify-center mt-6">
            <Skeleton className="h-0.5 w-4/5 rounded-lg" />
          </span>
          <div className="mt-6 w-full flex flex-col items-center">
            <div className="flex h-8 w-full justify-center gap-5">
              <Skeleton className="h-5 w-1/3 rounded-lg" />
              <Skeleton className="h-5 w-1/3 rounded-lg" />
            </div>
            <Skeleton className="h-32 w-full rounded-lg mt-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPageSkeleton;
