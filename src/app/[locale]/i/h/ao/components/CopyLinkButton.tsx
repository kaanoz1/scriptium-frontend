"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { LuCheck, LuShare2 } from "react-icons/lu";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/** Shares the current page (native share sheet, clipboard as fallback). */
const CopyLinkButton: React.FC<{ title: string; text?: string }> = ({ title, text }) => {
  const t = useTranslations("Pages.Islam.Hadith.Common");
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(text ? `${text}\n\n${url}` : url);
      setCopied(true);
      toast.success(t("Copied"));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Share sheet dismissed or clipboard blocked: nothing to do.
    }
  };

  return (
    <Button variant="outline" size="lg" onClick={share} aria-label={t("Share")}>
      {copied ? <LuCheck /> : <LuShare2 />}
      <span className="hidden sm:inline">{t("Share")}</span>
    </Button>
  );
};

export default CopyLinkButton;
