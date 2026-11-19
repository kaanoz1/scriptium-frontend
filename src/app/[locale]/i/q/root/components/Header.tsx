"use client";

import { useTranslations } from "next-intl";
import PageHeader from "@/components/Page/PageHeader";
import { Amiri } from "@/fonts/Arabic/Amiri";

type Props = {
  count: number;
};

const Header: React.FC<Props> = ({ count }) => {
  const t = useTranslations("Pages.Islam.Quran.Root.Components.Header");
  const it = useTranslations("Terms.Islam.Quran");

  return (
    <PageHeader
      eyebrow={it("this")}
      title={t("Header")}
      native="الجذور"
      nativeClassName={Amiri.className}
      description={t("Description") || undefined}
      actions={
        <span className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-muted-foreground backdrop-blur">
          <span className="font-semibold tabular-nums text-foreground">{count}</span>{" "}
          {it("Root.this")}
        </span>
      }
    />
  );
};

export default Header;
