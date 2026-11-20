"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { LuChevronLeft, LuScrollText } from "react-icons/lu";
import { TTopicComplete } from "@/dto/Islam/Hadith/ArabicOnly";
import PageShell from "@/components/Page/PageShell";
import PageHeader from "@/components/Page/PageHeader";
import LoadingLink from "@/components/LoadingLink";
import HadithBreadcrumbs from "@/app/[locale]/i/h/ao/components/Breadcrumbs";
import { GradeBadge } from "@/app/[locale]/i/h/ao/components/Badges";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { cn } from "@/lib/utils";

/** Renders the root subject list as well as any inner node of the tree. */
const TopicView: React.FC<{ topic: TTopicComplete }> = ({ topic }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith");
  const base = `/${locale}/i/h/ao`;
  const isRoot = topic.topic === null;

  return (
    <PageShell size="lg">
      <HadithBreadcrumbs
        items={[
          { label: t("Common.Topics"), href: isRoot ? undefined : `${base}/topic` },
          ...topic.path.map((p) => ({ label: <span dir="rtl" className={Amiri.className}>{p.name}</span>, href: `${base}/topic/${p.id}` })),
          ...(topic.topic ? [{ label: <span dir="rtl" className={Amiri.className}>{topic.topic.name}</span> }] : []),
        ]}
      />

      {isRoot ? (
        <PageHeader
          eyebrow={t("Topics.Eyebrow")}
          title={t("Topics.Title")}
          native="موضوعات الحديث"
          nativeClassName={Amiri.className}
          description={t("Topics.Description")}
        />
      ) : (
        <header dir="rtl" className="flex flex-col items-start gap-3">
          {topic.path.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
              {topic.path.map((p, i) => (
                <React.Fragment key={p.id}>
                  {i > 0 && <span>‹</span>}
                  <LoadingLink href={`${base}/topic/${p.id}`} className={cn(Amiri.className, "hover:text-foreground")}>
                    {p.name}
                  </LoadingLink>
                </React.Fragment>
              ))}
            </div>
          )}
          <h1 className={cn(Amiri.className, "text-4xl leading-snug md:text-5xl")}>{topic.topic!.name}</h1>
        </header>
      )}

      {topic.group && (
        <LoadingLink
          href={`${base}/group/${topic.group.id}`}
          className="flex flex-col gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 transition-colors hover:bg-amber-500/10"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-sm font-medium">
              <LuScrollText /> {t("Topics.LinkedGroup", { count: topic.group.hadithCount.toLocaleString(locale) })}
            </span>
            <GradeBadge grade={topic.group.grade} />
          </div>
          <p dir="rtl" className={cn(Amiri.className, "text-xl leading-loose")}>{topic.group.text}</p>
        </LoadingLink>
      )}

      {topic.children.length > 0 && (
        <ul className="flex flex-col divide-y divide-border/50 overflow-hidden rounded-2xl border border-border/60 bg-card/60">
          {topic.children.map((c) => {
            const href = c.childCount === 0 && c.group ? `${base}/group/${c.group.id}` : `${base}/topic/${c.id}`;
            return (
              <li key={c.id}>
                <LoadingLink href={href} className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-muted/60">
                  <span className="flex shrink-0 items-center gap-2 text-xs tabular-nums text-muted-foreground">
                    <LuChevronLeft />
                    {c.childCount > 0
                      ? t("Topics.Subtopics", { count: c.descendantCount.toLocaleString(locale) })
                      : c.group
                        ? t("Topics.Narrations", { count: c.group.hadithCount.toLocaleString(locale) })
                        : null}
                    {c.group && <GradeBadge grade={c.group.grade} />}
                  </span>
                  <span dir="rtl" className={cn(Amiri.className, "text-right text-lg leading-relaxed")}>{c.name}</span>
                </LoadingLink>
              </li>
            );
          })}
        </ul>
      )}
    </PageShell>
  );
};

export default TopicView;
