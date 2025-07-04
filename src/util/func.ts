import { T_ScriptureCode, T_SharePlatform } from "@/types/types";
import { ScripturesDetails } from "./scriptureDetails";
import { addToast } from "@heroui/toast";

export const getScriptureIfCodeIsValid = (
  scriptureCode: string | T_ScriptureCode
) => {
  if (!isValidScriptureCode(scriptureCode)) return null;

  return ScripturesDetails[scriptureCode];
};

export const isValidScriptureCode = (code: string): code is T_ScriptureCode =>
  code in ScripturesDetails;


export const handleShare = async (platform: T_SharePlatform, text: string) => {
  const currentUrl = window.location.href;
  const combinedText = `${text}\n${currentUrl}`;

  switch (platform) {
    case "twitter":
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(combinedText)}`,
        "_blank"
      );
      break;

    case "threads":
      window.open(
        `https://www.threads.net/intent/post?text=${encodeURIComponent(combinedText)}`,
        "_blank"
      );
      break;

    case "direct":
      try {
        await handleCopy(combinedText);
      } catch {
        addToast({ title: "Failed to copy link.", color: "danger" });
      }
      break;

    default:
      addToast({ title: "Unknown platform selected.", color: "danger" });
  }
};




export const handleCopy = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    addToast({ title: "Copied to clipboard!", color: "success" });
  } catch (error) {
    console.error("Failed to copy:", error);
    addToast({ title: "Failed to copy to clipboard.", color: "danger" });
  }
};
