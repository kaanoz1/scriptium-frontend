"use client";

/**
 * DRAFT error screens — used only by the dev-only /test/errors gallery.
 * They are not wired into any live page. Copy is hard-coded English on
 * purpose; move a draft to `src/util/components/Error/` and add translation
 * keys once it is approved.
 */

import React from "react";
import {
  LuBan,
  LuCircleSlash,
  LuConstruction,
  LuHourglass,
  LuWifiOff,
  LuBug,
  LuRotateCw,
  LuHouse,
  LuTriangleAlert,
} from "react-icons/lu";
import ErrorTemplate from "@/util/components/Error/ErrorTemplate";
import { ErrorComponentProps } from "@/util/types/ErrorComponentProps";
import { cn } from "@/lib/utils";

/* ---------- shared bits ---------- */

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="max-w-md text-lg text-muted-foreground">{children}</p>
);

export const ErrorActions: React.FC<{ retry?: boolean; home?: boolean }> = ({
  retry = true,
  home = true,
}) => (
  <div className="flex flex-wrap items-center justify-center gap-2">
    {retry && (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        <LuRotateCw size={15} /> Try again
      </button>
    )}
    {home && (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:border-foreground/30"
      >
        <LuHouse size={15} /> Home
      </button>
    )}
  </div>
);

/* ---------- 400 ---------- */

export const BadRequestError: React.FC<ErrorComponentProps> = ({ fullPage = true, children }) => (
  <ErrorTemplate
    icon={<LuCircleSlash size={44} />}
    title="Invalid request"
    fullPage={fullPage}
    colors={{ text: "text-orange-600 dark:text-orange-400", bg: "", glow: "bg-orange-500" }}
  >
    {children ?? (
      <>
        <Description>
          This link doesn’t look right. For example, a chapter or verse number may contain letters.
          Check the address and try again.
        </Description>
        <code className="rounded-lg border border-border/60 bg-muted/50 px-3 py-1.5 font-mono text-xs text-muted-foreground">
          /en/i/q/abc/12
        </code>
      </>
    )}
  </ErrorTemplate>
);

/* ---------- 403 ---------- */

export const ForbiddenError: React.FC<ErrorComponentProps> = ({ fullPage = true, children }) => (
  <ErrorTemplate
    icon={<LuBan size={44} />}
    title="Access restricted"
    fullPage={fullPage}
    colors={{ text: "text-rose-600 dark:text-rose-400", bg: "", glow: "bg-rose-500" }}
  >
    {children ?? (
      <>
        <Description>
          This resource exists, but you don’t have permission to view it. If you think this is a
          mistake, contact us at info@scriptium.net.
        </Description>
        <ErrorActions retry={false} />
      </>
    )}
  </ErrorTemplate>
);

/* ---------- 503 ---------- */

export const MaintenanceError: React.FC<ErrorComponentProps> = ({ fullPage = true, children }) => (
  <ErrorTemplate
    icon={<LuConstruction size={44} />}
    title="Down for maintenance"
    fullPage={fullPage}
    colors={{ text: "text-sky-600 dark:text-sky-400", bg: "", glow: "bg-sky-500" }}
  >
    {children ?? (
      <>
        <Description>
          We’re updating the library and will be back shortly. Your saved preferences won’t be affected.
        </Description>
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-700 dark:text-sky-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
          Estimated: ~15 minutes
        </span>
      </>
    )}
  </ErrorTemplate>
);

/* ---------- 504 ---------- */

export const TimeoutError: React.FC<ErrorComponentProps> = ({ fullPage = true, children }) => (
  <ErrorTemplate
    icon={<LuHourglass size={44} />}
    title="This is taking too long"
    fullPage={fullPage}
    colors={{ text: "text-yellow-600 dark:text-yellow-400", bg: "", glow: "bg-yellow-500" }}
  >
    {children ?? (
      <>
        <Description>
          Our server didn’t respond in time. Very large requests, such as roots with thousands of
          occurrences, can occasionally time out.
        </Description>
        <ErrorActions />
      </>
    )}
  </ErrorTemplate>
);

/* ---------- network ---------- */

export const OfflineError: React.FC<ErrorComponentProps> = ({ fullPage = true, children }) => (
  <ErrorTemplate
    icon={<LuWifiOff size={44} />}
    title="You’re offline"
    fullPage={fullPage}
    colors={{ text: "text-slate-600 dark:text-slate-300", bg: "", glow: "bg-slate-500" }}
  >
    {children ?? (
      <>
        <Description>
          We couldn’t reach Scriptium. Please check your internet connection; the page will reload
          when you’re back online.
        </Description>
        <ErrorActions home={false} />
      </>
    )}
  </ErrorTemplate>
);

/* ---------- client crash (error boundary) ---------- */

export const CrashError: React.FC<ErrorComponentProps & { digest?: string; message?: string }> = ({
  fullPage = true,
  digest = "3417820945",
  message = "TypeError: Cannot read properties of undefined (reading 'sequence')",
}) => (
  <ErrorTemplate
    icon={<LuBug size={44} />}
    title="Something broke"
    fullPage={fullPage}
    colors={{ text: "text-red-600 dark:text-red-400", bg: "", glow: "bg-red-500" }}
  >
    <Description>
      Something went wrong while loading this page. Trying again usually fixes it.
    </Description>
    <details className="w-full max-w-md rounded-xl border border-border/60 bg-muted/40 px-4 py-3 text-left text-xs">
      <summary className="cursor-pointer select-none font-medium text-muted-foreground">
        Technical details
      </summary>
      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-muted-foreground">
        {message}
        {"\n"}digest: {digest}
      </pre>
    </details>
    <ErrorActions />
  </ErrorTemplate>
);

/* ---------- inline: one section failed, rest of the page is fine ---------- */

export const InlineSectionError: React.FC<{ title?: string; description?: string; className?: string }> = ({
  title = "Couldn’t load translations",
  description = "The verse text loaded, but its translations didn’t. You can keep reading or try again.",
  className,
}) => (
  <div
    role="alert"
    className={cn(
      "flex flex-col gap-4 rounded-2xl border border-red-500/25 bg-red-500/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between",
      className,
    )}
  >
    <div className="flex items-start gap-3">
      <div className="rounded-xl bg-red-500/10 p-2 text-red-600 dark:text-red-400">
        <LuTriangleAlert size={18} />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    <button
      type="button"
      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/30"
    >
      <LuRotateCw size={14} /> Retry
    </button>
  </div>
);
