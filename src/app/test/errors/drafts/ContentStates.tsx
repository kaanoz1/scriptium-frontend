"use client";

/**
 * DRAFT content-availability states — used only by the dev-only /test/errors
 * gallery. Not wired into any live page. Copy is hard-coded English on purpose.
 *
 * These cover content that exists but is deliberately not shown:
 *  - Disabled            permanently withdrawn
 *  - Temporarily disabled paused while an issue is fixed
 *  - Under review         withheld until its accuracy is verified
 *  - Unverified           shown, but flagged as not yet checked
 *  - Licensing            cannot be shown for legal / rights reasons
 */

import React from "react";
import {
  LuEyeOff,
  LuPause,
  LuShieldQuestion,
  LuShieldAlert,
  LuScale,
  LuArrowLeft,
  LuFlag,
} from "react-icons/lu";
import ErrorTemplate from "@/util/components/Error/ErrorTemplate";
import { ErrorComponentProps } from "@/util/types/ErrorComponentProps";
import { cn } from "@/lib/utils";

/* ---------- shared bits ---------- */

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="max-w-md text-lg text-muted-foreground">{children}</p>
);

const StatusPill: React.FC<{ tone: string; dot: string; children: React.ReactNode; pulse?: boolean }> = ({
  tone,
  dot,
  children,
  pulse,
}) => (
  <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium", tone)}>
    <span className={cn("h-1.5 w-1.5 rounded-full", dot, pulse && "animate-pulse")} />
    {children}
  </span>
);

const BackButton: React.FC<{ label?: string }> = ({ label = "Back to the chapter" }) => (
  <button
    type="button"
    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:border-foreground/30"
  >
    <LuArrowLeft size={15} /> {label}
  </button>
);

/* ---------- full-page states ---------- */

export const ContentDisabledError: React.FC<ErrorComponentProps> = ({ fullPage = true }) => (
  <ErrorTemplate
    icon={<LuEyeOff size={44} />}
    title="This content has been disabled"
    fullPage={fullPage}
    colors={{ text: "text-zinc-600 dark:text-zinc-300", bg: "", glow: "bg-zinc-500" }}
  >
    <Description>
      We have taken this content offline, and it is no longer available on Scriptium.
    </Description>
    <StatusPill tone="border-zinc-500/30 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300" dot="bg-zinc-500">
      Permanently unavailable
    </StatusPill>
    <BackButton />
  </ErrorTemplate>
);

export const ContentTemporarilyDisabledError: React.FC<ErrorComponentProps> = ({ fullPage = true }) => (
  <ErrorTemplate
    icon={<LuPause size={44} />}
    title="Temporarily unavailable"
    fullPage={fullPage}
    colors={{ text: "text-sky-600 dark:text-sky-400", bg: "", glow: "bg-sky-500" }}
  >
    <Description>
      We have paused this content while we fix a problem with it. It will be back as soon as the
      fix is in place.
    </Description>
    <StatusPill tone="border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300" dot="bg-sky-500" pulse>
      Expected back within 48 hours
    </StatusPill>
    <BackButton />
  </ErrorTemplate>
);

export const ContentUnderReviewError: React.FC<ErrorComponentProps> = ({ fullPage = true }) => (
  <ErrorTemplate
    icon={<LuShieldQuestion size={44} />}
    title="Under review for accuracy"
    fullPage={fullPage}
    colors={{ text: "text-amber-600 dark:text-amber-400", bg: "", glow: "bg-amber-500" }}
  >
    <Description>
      We have withdrawn this content while we check that it is accurate and faithful to its
      source. We would rather show nothing than show something wrong.
    </Description>
    <StatusPill
      tone="border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      dot="bg-amber-500"
      pulse
    >
      Reported 12 Nov 2026 · Review in progress
    </StatusPill>
    <BackButton />
  </ErrorTemplate>
);

export const ContentLicensingError: React.FC<ErrorComponentProps> = ({ fullPage = true }) => (
  <ErrorTemplate
    icon={<LuScale size={44} />}
    title="Unavailable for licensing reasons"
    fullPage={fullPage}
    colors={{ text: "text-violet-600 dark:text-violet-400", bg: "", glow: "bg-violet-500" }}
  >
    <Description>
      We can’t display this content because we don’t currently have the rights to publish it.
      Other translations of this text are still available.
    </Description>
    <StatusPill tone="border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300" dot="bg-violet-500">
      Rights holder: pending agreement
    </StatusPill>
    <BackButton />
  </ErrorTemplate>
);

/* ---------- inline states (inside a page, e.g. one translation of a verse) ---------- */

export type InlineContentKind = "disabled" | "temporary" | "review" | "unverified" | "licensing";

const INLINE: Record<
  InlineContentKind,
  { icon: React.ReactNode; title: string; body: string; tone: string; iconTone: string }
> = {
  disabled: {
    icon: <LuEyeOff size={16} />,
    title: "Translation disabled",
    body: "This translation has been removed from Scriptium.",
    tone: "border-zinc-500/25 bg-zinc-500/[0.05]",
    iconTone: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300",
  },
  temporary: {
    icon: <LuPause size={16} />,
    title: "Temporarily unavailable",
    body: "We have paused this translation while we fix a problem with it. It will be back soon.",
    tone: "border-sky-500/25 bg-sky-500/[0.05]",
    iconTone: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  review: {
    icon: <LuShieldQuestion size={16} />,
    title: "Under review",
    body: "This translation is hidden while we verify its accuracy against the source.",
    tone: "border-amber-500/25 bg-amber-500/[0.05]",
    iconTone: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  unverified: {
    icon: <LuShieldAlert size={16} />,
    title: "Not yet verified",
    body: "This translation hasn’t been checked against its source yet. Read it with care.",
    tone: "border-orange-500/25 bg-orange-500/[0.05]",
    iconTone: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  licensing: {
    icon: <LuScale size={16} />,
    title: "Unavailable for licensing reasons",
    body: "We don’t currently have the rights to publish this translation.",
    tone: "border-violet-500/25 bg-violet-500/[0.05]",
    iconTone: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
};

export const InlineContentNotice: React.FC<{ kind: InlineContentKind; className?: string }> = ({
  kind,
  className,
}) => {
  const c = INLINE[kind];
  return (
    <div role="note" className={cn("flex items-start gap-3 rounded-xl border p-3.5", c.tone, className)}>
      <div className={cn("rounded-lg p-1.5", c.iconTone)}>{c.icon}</div>
      <div className="min-w-0">
        <p className="text-sm font-semibold">{c.title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{c.body}</p>
      </div>
    </div>
  );
};

/* ---------- mock verse card to show the inline notices in context ---------- */

const MockTranslation: React.FC<{ name: string; children: React.ReactNode }> = ({ name, children }) => (
  <div className="flex flex-col gap-2">
    <span className="w-fit rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
      {name}
    </span>
    {children}
  </div>
);

export const InlineNoticesPreview: React.FC<{ kinds?: InlineContentKind[] }> = ({
  kinds = ["disabled", "temporary", "review", "licensing"],
}) => (
  <div className="flex flex-col gap-4 p-6 md:p-10">
    <article className="rounded-2xl border border-border/60 bg-card/60 p-5 md:p-7">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 py-1 pl-1 pr-3 text-xs text-muted-foreground">
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-foreground px-1.5 text-[11px] font-semibold text-background">
          5
        </span>
        <span className="font-mono">1:5</span>
      </div>

      <p dir="rtl" className="text-right text-3xl leading-[2.1]">
        إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ
      </p>

      <div className="mt-6 flex flex-col gap-5 border-t border-dashed border-border/60 pt-5">
        <MockTranslation name="Sahih International">
          <p className="text-[15px] leading-7 text-foreground/90">
            It is You we worship and You we ask for help.
          </p>
        </MockTranslation>
        {kinds.map((k, i) => (
          <MockTranslation key={k} name={`Translation ${String.fromCharCode(65 + i)}`}>
            <InlineContentNotice kind={k} />
          </MockTranslation>
        ))}
      </div>
    </article>
  </div>
);

/* ---------- unverified: content IS shown, with a warning ---------- */

export const UnverifiedContentPreview: React.FC = () => (
  <div className="flex flex-col gap-4 p-6 md:p-10">
    <div className="flex flex-col gap-3 rounded-2xl border border-orange-500/25 bg-orange-500/[0.05] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-orange-500/10 p-2 text-orange-600 dark:text-orange-400">
          <LuShieldAlert size={18} />
        </div>
        <div>
          <p className="font-semibold">Not yet verified</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            This translation hasn’t been checked against its source yet, so it may contain mistakes.
            Read it with care.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/30"
      >
        <LuFlag size={14} /> Report a mistake
      </button>
    </div>

    <article className="rounded-2xl border border-dashed border-orange-500/30 bg-card/60 p-5 md:p-7">
      <p dir="rtl" className="text-right text-3xl leading-[2.1]">
        ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ
      </p>
      <div className="mt-6 flex flex-col gap-2 border-t border-dashed border-border/60 pt-5">
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-orange-700 dark:text-orange-300">
          <LuShieldAlert size={11} /> Unverified translation
        </span>
        <p className="text-[15px] leading-7 text-foreground/90">
          All praise is due to God, Lord of all the worlds.
        </p>
      </div>
    </article>
  </div>
);
