"use client";

import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { TIsnadGraph } from "@/dto/Islam/Hadith/ArabicOnly";
import { TSerializedResponse } from "@/util/types/SerializedResponse";
import { HadithViewPreferences } from "@/configuration/UserPreferences/Islam/Hadith/HadithViewPreferences";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import IsnadGraph from "@/app/[locale]/i/h/ao/components/IsnadGraph";

type Props = {
  title: string;
  description: string;
  /** Graph rendered on the server, if any. */
  graph?: TIsnadGraph | null;
  /** Fetches the graph when it was not rendered on the server. */
  load?: () => Promise<TSerializedResponse<TIsnadGraph>>;
};

/**
 * The merged isnad tree, drawn by default. The switch (also in the reading
 * settings) hides it; the choice is remembered.
 */
const IsnadTree: React.FC<Props> = observer(({ title, description, graph: initial = null, load }) => {
  const t = useTranslations("Pages.Islam.Hadith.Isnad");
  const prefs = HadithViewPreferences.getInstance();
  const [graph, setGraph] = useState<TIsnadGraph | null>(initial);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  // Children's effects run before the page's: make sure the saved choice is in.
  useEffect(() => prefs.hydrate(), [prefs]);

  const show = prefs.showIsnadTree;
  // Fetch at most once; the request outlives re-renders (its own state
  // changes must not cancel it), only unmounting discards the result.
  const requested = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (!show || graph || !load || requested.current) return;
    requested.current = true;
    setState("loading");
    load().then((res) => {
      if (!mounted.current) return;
      if (res.ok && res.data) {
        setGraph(res.data);
        setState("idle");
      } else setState("error");
    });
  }, [show, graph, load]);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="isnad-tree-toggle" className="text-sm text-muted-foreground">
            {t("Toggle")}
          </Label>
          <Switch id="isnad-tree-toggle" checked={show} onCheckedChange={(v) => (prefs.showIsnadTree = v)} />
        </div>
      </div>
      {show &&
        (graph ? (
          graph.nodes.length > 0 ? (
            <IsnadGraph graph={graph} />
          ) : (
            <p className="text-sm text-muted-foreground">{t("Empty")}</p>
          )
        ) : state === "error" ? (
          <p className="text-sm text-destructive">{t("Error")}</p>
        ) : (
          <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-border/60 text-sm text-muted-foreground">
            {t("Loading")}
          </div>
        ))}
    </section>
  );
});

export default IsnadTree;
