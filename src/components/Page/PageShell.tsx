import React from "react";
import { cn } from "@/lib/utils";
import PageBackdrop from "@/components/Page/PageBackdrop";

type Props = {
  children: React.ReactNode;
  size?: "md" | "lg" | "xl";
  className?: string;
};

const SIZES = {
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
} as const;

const PageShell: React.FC<Props> = ({ children, size = "lg", className }) => (
  <main className="relative isolate min-h-[calc(100vh-150px)] overflow-x-clip px-4 pb-24 pt-8 sm:px-6 md:px-8 md:pt-10">
    <PageBackdrop />
    <div
      className={cn(
        "mx-auto flex w-full flex-col gap-10",
        SIZES[size],
        className,
      )}
    >
      {children}
    </div>
  </main>
);

export default PageShell;
