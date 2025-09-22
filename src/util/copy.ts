"use client";

import { T_SharePlatform } from "@/types/types";

import { addToast } from "@heroui/toast";

export async function handleShare(
  platform: T_SharePlatform,
  text: string,
  explicitUrl?: string
) {
  try {
    const href =
      explicitUrl ??
      (typeof window !== "undefined" ? window.location.href : "");

    if (platform === "direct") {
      if (!href) throw new Error("URL is not available in this environment.");
      await handleCopy(href);
      return;
    }

    if (platform === "twitter") {
      const intent = new URL("https://twitter.com/intent/tweet");
      if (text) intent.searchParams.set("text", text);
      if (href) intent.searchParams.set("url", href);
      const opened = window.open(
        intent.toString(),
        "_blank",
        "noopener,noreferrer"
      );
      if (!opened) await handleCopy(`${text} ${href}`.trim());
      return;
    }

    await handleCopy(text);
  } catch (err) {
    addToast({
      title: "Share failed",
      description: String(err),
      color: "danger",
    });
  }
}

export async function handleCopy(text: string) {
  try {
    await navigator.clipboard.writeText(text);

    addToast({
      title: "Copied!",
      color: "success",
    });
  } catch (err) {
    addToast({
      title: "Error",
      color: "danger",
      description: "Failed to copy text. Your browser might not allow to copy.",
    });
  }
}
