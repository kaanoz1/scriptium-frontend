"use client";
import ScriptureProviderContext from "@/contexts/ScriptureContext";
import { useContext } from "react";

export const useScripture = () => {
  const context = useContext(ScriptureProviderContext);

  if (context === undefined)
    throw new Error("useScripture was not used properly.");

  return context;
};
