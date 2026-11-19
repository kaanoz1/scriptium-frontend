"use client";

import { useTranslations } from "next-intl";
import PageHeader from "@/components/Page/PageHeader";
import { Amiri } from "@/fonts/Arabic/Amiri";

const Header = () => {
  const t = useTranslations("Pages.Islam.Quran.Components.Header");
  const it = useTranslations("Terms.Islam");

  return (
    <PageHeader
      eyebrow={it("this")}
      title={t("Header")}
      native="القرآن الكريم"
      nativeClassName={Amiri.className}
      description={t("Description")}
    />
  );
};

export default Header;
