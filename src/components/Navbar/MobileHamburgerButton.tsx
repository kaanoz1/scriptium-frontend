"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  LuMenu,
  LuChevronRight,
  LuHouse,
  LuBookOpen,
  LuSprout,
  LuGithub,
} from "react-icons/lu";
import { FaCross, FaStarAndCrescent, FaStarOfDavid } from "react-icons/fa6";
import { FaDiscord, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Info, Moon, Sun, Terminal } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadingLink from "@/components/LoadingLink";
import StatisticsCustomSvgIcon from "./StatisticsCustomSvgIcon";
import ScriptiumText from "@/components/Navbar/ScriptiumText";
import { Theme, useTheme } from "@/hooks/useTheme";
import {
  SUPPORTED_LOCAL_KEYS,
  SUPPORTED_LOCALES,
} from "@/locale/SupportedLocales/_index";
import { usePathname as useIntlPathname, useRouter } from "@/navigation";
import { ClientUtils } from "@/util/ClientUtils";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href?: string;
  icon: React.ReactNode;
  description?: string;
  /** Nested items are indented under their parent. */
  nested?: boolean;
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h4 className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
    {children}
  </h4>
);

const MobileHamburgerButton = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const intlPathname = useIntlPathname();
  const router = useRouter();
  const [theme, setTheme] = useTheme();

  const t = useTranslations("Navbar.QuickNavigation.MobileHamburgerButton");
  const bt = useTranslations("Navbar.Buttons");
  const dt = useTranslations("Navbar.Buttons.Documentation");
  const ht = useTranslations("Pages.Home");
  const it = useTranslations("Terms.Islam");

  const explore: NavItem[] = [
    { label: t("Home"), href: `/${locale}`, icon: <LuHouse size={16} /> },
    {
      label: ht("IslamCard.Title"),
      href: `/${locale}/i`,
      icon: <FaStarAndCrescent size={15} />,
    },
    {
      label: it("Quran.this"),
      href: `/${locale}/i/q`,
      icon: <LuBookOpen size={15} />,
      nested: true,
    },
    {
      label: it("Quran.Root.this"),
      href: `/${locale}/i/q/root`,
      icon: <LuSprout size={15} />,
      nested: true,
    },
    {
      label: ht("ChristianityCard.Title"),
      href: `/${locale}/c`,
      icon: <FaCross size={14} />,
    },
    {
      label: ht("JudaismCard.Title"),
      href: `/${locale}/j`,
      icon: <FaStarOfDavid size={14} />,
    },
  ];

  const resources: NavItem[] = [
    {
      label: bt("Statistics"),
      href: `/${locale}/statistics`,
      icon: <StatisticsCustomSvgIcon className="h-4 w-4" />,
    },
    {
      label: dt("About.Header"),
      description: dt("About.Description"),
      href: `/${locale}/about`,
      icon: <Info className="size-4" />,
    },
    {
      label: dt("Discord.Header"),
      description: dt("Discord.Description"),
      href: `/${locale}/discord`,
      icon: <FaDiscord size={16} />,
    },
    {
      label: dt("ForDevelopers.Header"),
      description: dt("ForDevelopers.Description"),
      href: `/${locale}/developers`,
      icon: <Terminal className="size-4" />,
    },
  ];

  const isActive = (href?: string) => !!href && pathname === href;

  const renderItem = (item: NavItem) => {
    const active = isActive(item.href);
    const content = (
      <>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
            active
              ? "border-transparent bg-foreground text-background"
              : "border-border/60 bg-background text-muted-foreground group-hover:text-foreground",
          )}
        >
          {item.icon}
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span
            className={cn("text-sm", active ? "font-semibold" : "font-medium")}
          >
            {item.label}
          </span>
          {item.description && (
            <span className="truncate text-xs text-muted-foreground">
              {item.description}
            </span>
          )}
        </span>
        {item.href ? (
          <LuChevronRight
            size={16}
            className="text-muted-foreground/50 transition-transform group-hover:translate-x-0.5"
          />
        ) : (
          <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {t("Soon")}
          </span>
        )}
      </>
    );

    const base = cn(
      "group flex w-full items-center gap-3 rounded-xl px-2 py-2 transition-colors",
      item.nested &&
        "ml-5 w-[calc(100%-1.25rem)] border-l border-border/60 rounded-l-none pl-3",
      active ? "bg-muted" : "hover:bg-muted/60",
    );

    if (!item.href)
      return (
        <li key={item.label}>
          <div
            className={cn(
              base,
              "cursor-not-allowed opacity-55 hover:bg-transparent",
            )}
          >
            {content}
          </div>
        </li>
      );

    return (
      <li key={item.label}>
        <SheetClose asChild>
          <LoadingLink
            href={item.href}
            className={base}
            aria-current={active ? "page" : undefined}
          >
            {content}
          </LoadingLink>
        </SheetClose>
      </li>
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("Title")}
          className="h-10 w-10 shrink-0 rounded-full transition-colors hover:bg-accent/50"
        >
          <LuMenu size={22} className="text-foreground" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-[88vw] max-w-sm flex-col gap-0 overflow-hidden p-0"
      >
        <SheetHeader className="border-b border-border/60 px-5 py-4 text-left">
          <SheetTitle className="flex items-center gap-2.5">
            <Image
              src={ClientUtils.AssetManager.ScriptiumIconLightSvg}
              alt=""
              width={28}
              height={28}
              className="dark:hidden"
            />
            <Image
              src={ClientUtils.AssetManager.ScriptiumIconDarkSvg}
              alt=""
              width={28}
              height={28}
              className="hidden dark:block"
            />
            <ScriptiumText className="text-lg! sm:text-lg!" />
          </SheetTitle>
          <SheetDescription className="sr-only">{t("Title")}</SheetDescription>
        </SheetHeader>

        {/* Radix wraps children in a `display: table` div that grows to fit the
            widest content (breaking `truncate`); force it back to block. */}
        <ScrollArea className="min-h-0 flex-1 [&_[data-slot=scroll-area-viewport]>div]:block!">
          <div className="flex min-w-0 flex-col gap-7 px-4 py-5">
            <section>
              <SectionTitle>{t("Explore")}</SectionTitle>
              <ul className="flex flex-col gap-0.5">
                {explore.map(renderItem)}
              </ul>
            </section>

            <section>
              <SectionTitle>{t("Resources")}</SectionTitle>
              <ul className="flex flex-col gap-0.5">
                {resources.map(renderItem)}
              </ul>
            </section>

            <section>
              <SectionTitle>{t("Appearance")}</SectionTitle>
              <div className="grid grid-cols-2 gap-1 rounded-xl border border-border/60 bg-muted/40 p-1">
                {[
                  {
                    value: Theme.LIGHT,
                    label: t("Light"),
                    icon: <Sun className="size-4" />,
                  },
                  {
                    value: Theme.DARK,
                    label: t("Dark"),
                    icon: <Moon className="size-4" />,
                  },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTheme(opt.value)}
                    aria-pressed={theme === opt.value}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all",
                      theme === opt.value
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <SectionTitle>{t("Language")}</SectionTitle>
              <div className="flex flex-wrap gap-1.5">
                {SUPPORTED_LOCAL_KEYS.map((key) => {
                  // Turkish is not active yet.
                  if (key === "tr") return null;
                  const info = SUPPORTED_LOCALES[key];
                  const selected = key === locale;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() =>
                        router.replace(intlPathname, { locale: key })
                      }
                      aria-pressed={selected}
                      className={cn(
                        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors",
                        selected
                          ? "border-foreground/20 bg-foreground text-background"
                          : "border-border/60 hover:bg-muted",
                      )}
                    >
                      <span className="font-mono text-[10px] uppercase opacity-70">
                        {key}
                      </span>
                      {info.nameOwn}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </ScrollArea>

        <footer className="flex items-center justify-between border-t border-border/60 px-5 py-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Scriptium
          </p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a
              href="https://instagram.com/scriptium_en"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-pink-500"
            >
              <FaInstagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://x.com/scriptium_en"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              <FaXTwitter className="h-4 w-4" />
              <span className="sr-only">X</span>
            </a>
            <a
              href="https://github.com/scriptium"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              <LuGithub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </footer>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHamburgerButton;
