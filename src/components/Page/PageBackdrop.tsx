import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const PageBackdrop: React.FC<Props> = ({ className }) => (
  <div
    aria-hidden
    className={cn(
      "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] overflow-hidden",
      className,
    )}
  >
    <div
      className="absolute inset-0 opacity-[0.3] dark:opacity-[0.15]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)",
        backgroundSize: "28px 28px",
        maskImage:
          "radial-gradient(ellipse 70% 80% at 50% 0%, black 10%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 80% at 50% 0%, black 10%, transparent 70%)",
      }}
    />
    <div className="absolute left-1/2 -top-24 h-72 w-[min(90vw,52rem)] -translate-x-1/2 rounded-full bg-linear-to-r from-amber-300/20 via-emerald-300/15 to-sky-300/20 blur-[100px] dark:from-amber-500/10 dark:via-emerald-500/10 dark:to-sky-500/10" />
  </div>
);

export default PageBackdrop;
