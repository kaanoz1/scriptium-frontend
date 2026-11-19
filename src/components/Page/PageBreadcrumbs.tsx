"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { LuChevronRight, LuHouse } from "react-icons/lu";
import LoadingLink from "@/components/LoadingLink";
import { cn } from "@/lib/utils";

export type Crumb = {
  label: React.ReactNode;
  href?: string;
  hideOnMobile?: boolean;
};

type Props = {
  items: Crumb[];
  className?: string;
};

const PageBreadcrumbs: React.FC<Props> = ({ items, className }) => {
  const locale = useLocale();
  const gt = useTranslations("Terms.General");

  const all: Crumb[] = [
    {
      label: (
        <span className="flex items-center gap-1.5">
          <LuHouse size={13} />
          <span className="hidden sm:inline">{gt("HomePage")}</span>
        </span>
      ),
      href: `/${locale}`,
    },
    ...items,
  ];

  return (
    <motion.nav
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("w-full overflow-x-auto scrollbar-hide", className)}
    >
      <ol className="inline-flex items-center gap-0.5 whitespace-nowrap rounded-full border border-border/60 bg-background/70 p-1 text-[13px] shadow-xs backdrop-blur">
        {all.map((item, i) => {
          const isLast = i === all.length - 1;
          return (
            <li
              key={i}
              className={cn(
                "flex items-center gap-0.5",
                item.hideOnMobile && "hidden sm:flex",
              )}
            >
              {item.href && !isLast ? (
                <LoadingLink
                  href={item.href}
                  className="rounded-full px-2.5 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </LoadingLink>
              ) : (
                <span
                  aria-current="page"
                  className="rounded-full bg-muted px-2.5 py-1 font-medium text-foreground"
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <LuChevronRight
                  size={13}
                  className="text-muted-foreground/50"
                />
              )}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
};

export default PageBreadcrumbs;
