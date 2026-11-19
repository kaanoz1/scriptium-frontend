"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  LuMonitor,
  LuSmartphone,
  LuMaximize,
  LuPanelTop,
  LuBell,
  LuFileCode,
  LuMapPin,
  LuChevronUp,
  LuChevronDown,
} from "react-icons/lu";
import NotFoundError from "@/util/components/Error/NotFoundError";
import RateLimitError from "@/util/components/Error/RateLimitError";
import ServerError from "@/util/components/Error/ServerError";
import UnknownError from "@/util/components/Error/UnknownError";
import ThisPageIsUnderConstruction from "@/util/components/ThisPageIsUnderConstruction";
import {
  BadRequestError,
  CrashError,
  ForbiddenError,
  InlineSectionError,
  MaintenanceError,
  OfflineError,
  TimeoutError,
} from "@/app/[locale]/test/errors/drafts/DraftErrors";
import {
  ContentDisabledError,
  ContentLicensingError,
  ContentTemporarilyDisabledError,
  ContentUnderReviewError,
  InlineNoticesPreview,
  UnverifiedContentPreview,
} from "@/app/[locale]/test/errors/drafts/ContentStates";
import { instrumentSerif } from "@/fonts";
import { cn } from "@/lib/utils";

type Group = "live" | "draft" | "content" | "toast";

type Entry = {
  id: string;
  group: Group;
  label: string;
  /** HTTP status or a short tag. */
  code: string;
  file: string;
  /** Where it appears today (live) or where it could be used (draft). */
  usage: string;
  /** Example URL shown in the fake address bar. */
  url: string;
  /** Whether the component supports the embedded (fullPage=false) layout. */
  embeddable?: boolean;
  render?: (fullPage: boolean) => React.ReactNode;
};

const QURAN_ROUTES = "/i/q, /i/q/[chapter], /i/q/[chapter]/[verse], /i/q/root, /i/q/root/[latin]";

const ENTRIES: Entry[] = [
  {
    id: "not-found",
    group: "live",
    label: "Not found",
    code: "404",
    file: "src/util/components/Error/NotFoundError.tsx",
    usage: `Backend returns NOT_FOUND on ${QURAN_ROUTES}`,
    url: "/en/i/q/115",
    embeddable: true,
    render: (fp) => <NotFoundError fullPage={fp} />,
  },
  {
    id: "rate-limit",
    group: "live",
    label: "Rate limited",
    code: "429",
    file: "src/util/components/Error/RateLimitError.tsx",
    usage: `Backend returns TOO_MANY_REQUESTS on ${QURAN_ROUTES}`,
    url: "/en/i/q/2",
    embeddable: true,
    render: (fp) => <RateLimitError fullPage={fp} />,
  },
  {
    id: "server-error",
    group: "live",
    label: "Server error",
    code: "500",
    file: "src/util/components/Error/ServerError.tsx",
    usage: `Backend returns INTERNAL_SERVER_ERROR on ${QURAN_ROUTES}`,
    url: "/en/i/q/2/255",
    embeddable: true,
    render: (fp) => <ServerError fullPage={fp} />,
  },
  {
    id: "unknown-error",
    group: "live",
    label: "Unknown error",
    code: "???",
    file: "src/util/components/Error/UnknownError.tsx",
    usage: `Any other or unreachable response on ${QURAN_ROUTES}`,
    url: "/en/i/q/root/ktb",
    embeddable: true,
    render: (fp) => <UnknownError fullPage={fp} />,
  },
  {
    id: "under-construction",
    group: "live",
    label: "Under construction",
    code: "WIP",
    file: "src/util/components/ThisPageIsUnderConstruction.tsx",
    usage: "/statistics, /developers, /discord",
    url: "/en/statistics",
    render: () => <ThisPageIsUnderConstruction />,
  },
  {
    id: "bad-request",
    group: "draft",
    label: "Invalid request",
    code: "400",
    file: "src/app/[locale]/test/errors/drafts/DraftErrors.tsx",
    usage: "Malformed parameters, such as a non-numeric chapter or verse. These currently fall through to Unknown error.",
    url: "/en/i/q/abc/12",
    embeddable: true,
    render: (fp) => <BadRequestError fullPage={fp} />,
  },
  {
    id: "forbidden",
    group: "draft",
    label: "Access restricted",
    code: "403",
    file: "src/app/[locale]/test/errors/drafts/DraftErrors.tsx",
    usage: "Restricted resources that require permission (for future use).",
    url: "/en/i/q/admin",
    embeddable: true,
    render: (fp) => <ForbiddenError fullPage={fp} />,
  },
  {
    id: "maintenance",
    group: "draft",
    label: "Maintenance",
    code: "503",
    file: "src/app/[locale]/test/errors/drafts/DraftErrors.tsx",
    usage: "The backend reports SERVICE_UNAVAILABLE during deployments or database migrations.",
    url: "/en/i/q",
    embeddable: true,
    render: (fp) => <MaintenanceError fullPage={fp} />,
  },
  {
    id: "timeout",
    group: "draft",
    label: "Timeout",
    code: "504",
    file: "src/app/[locale]/test/errors/drafts/DraftErrors.tsx",
    usage: "A gateway or fetch timeout, for example on very large root pages.",
    url: "/en/i/q/root/qwl",
    embeddable: true,
    render: (fp) => <TimeoutError fullPage={fp} />,
  },
  {
    id: "offline",
    group: "draft",
    label: "Offline",
    code: "NET",
    file: "src/app/[locale]/test/errors/drafts/DraftErrors.tsx",
    usage: "A client-side request fails because the device has no connection.",
    url: "/en/i/q/18",
    embeddable: true,
    render: (fp) => <OfflineError fullPage={fp} />,
  },
  {
    id: "crash",
    group: "draft",
    label: "Render crash",
    code: "JS",
    file: "src/app/[locale]/test/errors/drafts/DraftErrors.tsx",
    usage: "Would power an `error.tsx` boundary. The app has none yet, so a crash currently shows Next.js's default screen.",
    url: "/en/i/q/1/1",
    embeddable: true,
    render: (fp) => <CrashError fullPage={fp} />,
  },
  {
    id: "inline",
    group: "draft",
    label: "Section failed",
    code: "PART",
    file: "src/app/[locale]/test/errors/drafts/DraftErrors.tsx",
    usage: "One part of a page (translations, word table) fails to load while the rest renders.",
    url: "/en/i/q/2/255",
    render: () => (
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="h-28 rounded-2xl border border-border/60 bg-card/60" />
        <InlineSectionError />
        <div className="h-40 rounded-2xl border border-border/60 bg-card/60" />
      </div>
    ),
  },
  {
    id: "content-disabled",
    group: "content",
    label: "Disabled",
    code: "410",
    file: "src/app/[locale]/test/errors/drafts/ContentStates.tsx",
    usage: "Content that has been permanently withdrawn, such as a retired translation.",
    url: "/en/i/q/2/255",
    embeddable: true,
    render: (fp) => <ContentDisabledError fullPage={fp} />,
  },
  {
    id: "content-temporary",
    group: "content",
    label: "Temporarily disabled",
    code: "PAUSE",
    file: "src/app/[locale]/test/errors/drafts/ContentStates.tsx",
    usage: "Content paused while a known problem (bad import, broken encoding) is fixed.",
    url: "/en/i/q/24",
    embeddable: true,
    render: (fp) => <ContentTemporarilyDisabledError fullPage={fp} />,
  },
  {
    id: "content-review",
    group: "content",
    label: "Under review",
    code: "REVIEW",
    file: "src/app/[locale]/test/errors/drafts/ContentStates.tsx",
    usage: "Content withheld until its accuracy has been verified, e.g. after a user report.",
    url: "/en/i/q/4/34",
    embeddable: true,
    render: (fp) => <ContentUnderReviewError fullPage={fp} />,
  },
  {
    id: "content-licensing",
    group: "content",
    label: "Licensing",
    code: "451",
    file: "src/app/[locale]/test/errors/drafts/ContentStates.tsx",
    usage: "Content we can’t publish because we don’t hold the rights to it.",
    url: "/en/i/q/1/1",
    embeddable: true,
    render: (fp) => <ContentLicensingError fullPage={fp} />,
  },
  {
    id: "content-unverified",
    group: "content",
    label: "Unverified (shown)",
    code: "WARN",
    file: "src/app/[locale]/test/errors/drafts/ContentStates.tsx",
    usage: "Content that is shown, but flagged as not yet checked against its source.",
    url: "/en/i/q/1/2",
    render: () => <UnverifiedContentPreview />,
  },
  {
    id: "content-inline",
    group: "content",
    label: "Inline notices",
    code: "PART",
    file: "src/app/[locale]/test/errors/drafts/ContentStates.tsx",
    usage: "One translation of a verse is unavailable while the others still show.",
    url: "/en/i/q/1/5",
    render: () => <InlineNoticesPreview />,
  },
  {
    id: "toasts",
    group: "toast",
    label: "Toast messages",
    code: "UI",
    file: "sonner — ShareButton.tsx, root/[latin]/main.tsx",
    usage: "Copy-to-clipboard result and the high-occurrence warning on root pages.",
    url: "/en/i/q/root/ktb",
  },
];

const GROUP_LABELS: Record<Group, string> = {
  live: "In use",
  draft: "Draft errors (not used yet)",
  content: "Content availability (drafts)",
  toast: "Toasts",
};

const ToastPanel: React.FC = () => {
  const st = useTranslations(
    "Pages.Islam.Quran.Chapter.Components.VerseContainer.VerseContainerHeader.UtilToolButtons.ShareButton",
  );
  const rt = useTranslations("Pages.Islam.Quran.Root.Messages");

  const items: { label: string; tag: string; fire: () => void; draft?: boolean }[] = [
    { label: "Copy succeeded", tag: "success", fire: () => toast.success(st("CopySuccessful")) },
    { label: "Copy failed", tag: "error", fire: () => toast.error(st("CopyFailed")) },
    {
      label: "High occurrences",
      tag: "warning",
      fire: () =>
        toast.warning(rt("HighOccurrencesWarningTitle"), {
          description: rt("HighOccurrencesWarningDesc"),
          duration: 8000,
        }),
    },
    {
      label: "Network error",
      tag: "error · draft",
      draft: true,
      fire: () =>
        toast.error("Couldn’t reach the server", {
          description: "Check your connection and try again.",
          action: { label: "Retry", onClick: () => toast.dismiss() },
        }),
    },
    {
      label: "Rate limited",
      tag: "warning · draft",
      draft: true,
      fire: () => toast.warning("Slow down a little", { description: "You’re sending requests too quickly. Please wait a few seconds." }),
    },
  ];

  return (
    <div className="flex min-h-[28rem] flex-col items-center justify-center gap-6 p-8 text-center">
      <p className="max-w-sm text-sm text-muted-foreground">
        Toasts appear in the app’s global toaster, outside this frame.
      </p>
      <div className="grid w-full max-w-lg grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.fire}
            className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/70 px-4 py-3 text-left text-sm transition-colors hover:border-foreground/30"
          >
            <span className="font-medium">{item.label}</span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-mono text-[10px]",
                item.draft ? "border border-dashed border-border text-muted-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              {item.tag}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const Segmented = <T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; icon: React.ReactNode; disabled?: boolean }[];
}) => (
  <div className="inline-flex rounded-xl border border-border/60 bg-muted/40 p-0.5">
    {options.map((o) => (
      <button
        key={o.value}
        type="button"
        disabled={o.disabled}
        onClick={() => onChange(o.value)}
        aria-pressed={value === o.value}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-[10px] px-2.5 py-1.5 text-xs font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40",
          value === o.value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
        )}
      >
        {o.icon}
        {o.label}
      </button>
    ))}
  </div>
);

const Client: React.FC = () => {
  // Restore the selection from the URL hash (e.g. /en/test/errors#rate-limit).
  const [selectedId, setSelectedId] = useState<string>(() => {
    const fromHash = typeof window === "undefined" ? "" : window.location.hash.slice(1);
    return ENTRIES.some((e) => e.id === fromHash) ? fromHash : ENTRIES[0].id;
  });
  const [layout, setLayout] = useState<"full" | "embedded">("full");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");

  const select = useCallback((id: string) => {
    setSelectedId(id);
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  const index = ENTRIES.findIndex((e) => e.id === selectedId);
  const entry = ENTRIES[index];

  const move = useCallback(
    (delta: number) => select(ENTRIES[(index + delta + ENTRIES.length) % ENTRIES.length].id),
    [index, select],
  );

  // ↑ / ↓ (or k / j) to step through entries.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, [contenteditable]") || e.metaKey || e.ctrlKey) return;
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        move(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  const grouped = useMemo(
    () =>
      (Object.keys(GROUP_LABELS) as Group[]).map((g) => ({
        group: g,
        items: ENTRIES.filter((e) => e.group === g),
      })),
    [],
  );

  const embeddable = !!entry.embeddable;
  const fullPage = layout === "full" || !embeddable;

  return (
    <main className="min-h-[calc(100vh-150px)] px-4 pb-16 pt-8 sm:px-6 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              Development only
            </span>
            <h1 className={cn(instrumentSerif.className, "mt-2 text-5xl tracking-tight")}>Error gallery</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Every error state is rendered directly, so nothing has to go wrong to see it. Use ↑/↓ to move between them.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[17rem_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-card/60 p-3 backdrop-blur-sm">
              {grouped.map(({ group, items }) => (
                <div key={group}>
                  <h2 className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                    {GROUP_LABELS[group]}
                  </h2>
                  <ul className="flex flex-col gap-0.5">
                    {items.map((e) => {
                      const active = e.id === selectedId;
                      return (
                        <li key={e.id}>
                          <button
                            type="button"
                            onClick={() => select(e.id)}
                            aria-current={active ? "true" : undefined}
                            className={cn(
                              "flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors",
                              active ? "bg-foreground text-background" : "hover:bg-muted",
                            )}
                          >
                            <span className="truncate">{e.label}</span>
                            <span
                              className={cn(
                                "shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] tabular-nums",
                                active ? "bg-background/20" : "bg-muted text-muted-foreground",
                                (e.group === "draft" || e.group === "content") && !active && "border border-dashed border-border bg-transparent",
                              )}
                            >
                              {e.code}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Preview */}
          <section className="flex min-w-0 flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm">
              <div className="min-w-0 space-y-1.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">{entry.label}</h2>
                  <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">{entry.code}</span>
                  {(entry.group === "draft" || entry.group === "content") && (
                    <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Draft
                    </span>
                  )}
                </div>
                <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <LuFileCode size={13} className="mt-px shrink-0" />
                  <code className="break-all font-mono">{entry.file}</code>
                </p>
                <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <LuMapPin size={13} className="mt-px shrink-0" />
                  <span>{entry.usage}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Segmented
                  value={fullPage ? "full" : "embedded"}
                  onChange={setLayout}
                  options={[
                    { value: "full", label: "Full page", icon: <LuMaximize size={13} /> },
                    { value: "embedded", label: "Embedded", icon: <LuPanelTop size={13} />, disabled: !embeddable },
                  ]}
                />
                <Segmented
                  value={viewport}
                  onChange={setViewport}
                  options={[
                    { value: "desktop", label: "Desktop", icon: <LuMonitor size={13} /> },
                    { value: "mobile", label: "Mobile", icon: <LuSmartphone size={13} /> },
                  ]}
                />
                <div className="inline-flex rounded-xl border border-border/60 bg-muted/40 p-0.5">
                  <button type="button" onClick={() => move(-1)} aria-label="Previous" className="rounded-[10px] p-1.5 text-muted-foreground hover:bg-background hover:text-foreground">
                    <LuChevronUp size={14} />
                  </button>
                  <button type="button" onClick={() => move(1)} aria-label="Next" className="rounded-[10px] p-1.5 text-muted-foreground hover:bg-background hover:text-foreground">
                    <LuChevronDown size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Fake browser frame */}
            <div
              className={cn(
                "mx-auto w-full overflow-hidden rounded-2xl border border-border/70 bg-background shadow-xl shadow-black/[0.04] transition-[max-width] duration-300",
                viewport === "mobile" ? "max-w-[390px]" : "max-w-full",
              )}
            >
              <div className="flex items-center gap-3 border-b border-border/60 bg-muted/40 px-3 py-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <div className="min-w-0 flex-1 truncate rounded-md bg-background/80 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                  scriptium.net{entry.url}
                </div>
                {entry.group === "toast" && <LuBell size={14} className="text-muted-foreground" />}
              </div>

              <div key={`${entry.id}-${fullPage}-${viewport}`} className="relative">
                {entry.group === "toast" ? (
                  <ToastPanel />
                ) : fullPage ? (
                  entry.render?.(true)
                ) : (
                  // Embedded: how it looks inside an existing page section.
                  <div className="p-6 md:p-10">
                    <div className="mb-4 h-10 w-2/3 rounded-xl bg-muted/60" />
                    <div className="rounded-2xl border border-border/60 bg-card/40">{entry.render?.(false)}</div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Client;
