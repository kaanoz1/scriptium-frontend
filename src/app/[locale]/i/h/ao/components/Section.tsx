import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** Titled content block used across the hadith pages. */
const Section: React.FC<Props> = ({ id, title, description, actions, children, className }) => (
  <section id={id} className={cn("flex scroll-mt-28 flex-col gap-4", className)}>
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions}
    </div>
    {children}
  </section>
);

export default Section;

/** Small "label / big number" tile. */
export const Stat: React.FC<{ label: React.ReactNode; value: React.ReactNode; className?: string }> = ({
  label,
  value,
  className,
}) => (
  <div className={cn("flex flex-col gap-1 rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm", className)}>
    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
    <span className="text-2xl font-semibold tabular-nums md:text-3xl">{value}</span>
  </div>
);
