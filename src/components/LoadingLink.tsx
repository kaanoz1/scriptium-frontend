"use client";
import { useLoading } from "@/context/LoadingContext";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes, MouseEvent } from "react";

type LoadingLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: React.ReactNode;
  };

export default function LoadingLink({
  children,
  onClick,
  href,
  ...props
}: LoadingLinkProps) {
  const { startLoading } = useLoading();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    const isNewTab = props.target === "_blank";

    const hrefString = typeof href === "string" ? href : href.pathname;
    const isSamePage = hrefString === pathname;

    if (!isModified && !isNewTab && !isSamePage) startLoading();

    onClick?.(e);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
