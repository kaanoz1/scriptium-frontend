"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { TIsnadGraph, TIsnadNode } from "@/dto/Islam/Hadith/ArabicOnly";
import { rankInfo, TONE_STROKE } from "@/util/Islam/Hadith/Codes";
import { Amiri } from "@/fonts/Arabic/Amiri";

const NODE_W = 150;
const NODE_H = 46;
const GAP_X = 18;
const GAP_Y = 64;
const PAD = 24;

type Placed = TIsnadNode & { x: number; y: number };

/**
 * Layered drawing of a merged isnad: companions on top, book authors at the
 * bottom. Within a layer nodes are ordered by the mean position of their
 * teachers (one barycentre sweep), which removes most edge crossings.
 */
function layout(graph: TIsnadGraph): { nodes: Placed[]; width: number; height: number } {
  const layers = new Map<number, TIsnadNode[]>();
  for (const n of graph.nodes) {
    const list = layers.get(n.depth) ?? [];
    list.push(n);
    layers.set(n.depth, list);
  }
  const depths = [...layers.keys()].sort((a, b) => a - b);
  const teachersOf = new Map<number, number[]>();
  for (const e of graph.edges) {
    const list = teachersOf.get(e.studentId) ?? [];
    list.push(e.teacherId);
    teachersOf.set(e.studentId, list);
  }

  const maxPerLayer = Math.max(1, ...[...layers.values()].map((l) => l.length));
  const width = PAD * 2 + maxPerLayer * NODE_W + (maxPerLayer - 1) * GAP_X;
  const xOf = new Map<number, number>();
  const placed: Placed[] = [];

  depths.forEach((d, row) => {
    const list = layers.get(d)!;
    if (row > 0) {
      const bary = (n: TIsnadNode) => {
        const xs = (teachersOf.get(n.narrator.id) ?? []).map((t) => xOf.get(t)).filter((x): x is number => x !== undefined);
        return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : Number.MAX_SAFE_INTEGER;
      };
      list.sort((a, b) => bary(a) - bary(b) || b.chainCount - a.chainCount);
    }
    const rowWidth = list.length * NODE_W + (list.length - 1) * GAP_X;
    const startX = (width - rowWidth) / 2;
    list.forEach((n, i) => {
      const x = startX + i * (NODE_W + GAP_X);
      const y = PAD + row * (NODE_H + GAP_Y);
      xOf.set(n.narrator.id, x + NODE_W / 2);
      placed.push({ ...n, x, y });
    });
  });

  const height = PAD * 2 + depths.length * NODE_H + Math.max(0, depths.length - 1) * GAP_Y;
  return { nodes: placed, width, height };
}

const IsnadGraph: React.FC<{ graph: TIsnadGraph }> = ({ graph }) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith");
  const [hover, setHover] = useState<number | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const { nodes, width, height } = useMemo(() => layout(graph), [graph]);
  const byId = useMemo(() => new Map(nodes.map((n) => [n.narrator.id, n])), [nodes]);
  const maxEdge = Math.max(1, ...graph.edges.map((e) => e.count));

  // Layers are centred, so start scrolled to the middle: the companions on
  // top would otherwise be off-screen when the tree is wider than the page.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, [width]);

  if (nodes.length === 0)
    return <p className="text-sm text-muted-foreground">{t("Isnad.Empty")}</p>;

  const connected = (id: number) =>
    hover === null || hover === id || graph.edges.some((e) => (e.teacherId === hover && e.studentId === id) || (e.studentId === hover && e.teacherId === id));

  return (
    <div className="flex flex-col gap-3">
      <div ref={scroller} className="overflow-x-auto rounded-2xl border border-border/60 bg-background/50">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={t("Isnad.Title")}
          className="mx-auto block"
        >
          {graph.edges.map((e) => {
            const a = byId.get(e.teacherId);
            const b = byId.get(e.studentId);
            if (!a || !b) return null;
            const x1 = a.x + NODE_W / 2;
            const y1 = a.y + NODE_H;
            const x2 = b.x + NODE_W / 2;
            const y2 = b.y;
            const active = hover === null || hover === e.teacherId || hover === e.studentId;
            const midY = (y1 + y2) / 2;
            return (
              <path
                key={`${e.teacherId}-${e.studentId}`}
                d={y2 > y1 ? `M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}` : `M${x1},${y1} L${x2},${y2}`}
                fill="none"
                stroke="currentColor"
                className="text-foreground"
                strokeOpacity={active ? 0.35 : 0.06}
                strokeWidth={1 + 3 * Math.sqrt(e.count / maxEdge)}
              >
                <title>{t("Isnad.EdgeTitle", { count: e.count })}</title>
              </path>
            );
          })}
          {nodes.map((n) => {
            const info = rankInfo(n.narrator.rankNo);
            const label = n.narrator.nickname || n.narrator.name;
            return (
              <g
                key={n.narrator.id}
                transform={`translate(${n.x},${n.y})`}
                className="cursor-pointer"
                opacity={connected(n.narrator.id) ? 1 : 0.25}
                onMouseEnter={() => setHover(n.narrator.id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => router.push(`/${locale}/i/jt/ao/narrator/${n.narrator.id}`)}
              >
                <title>{`${n.narrator.name}\n${t(`Ranks.${info.key}`)} · ${t("Isnad.NodeChains", { count: n.chainCount })}`}</title>
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx={12}
                  className="fill-card"
                  stroke={TONE_STROKE[info.tone]}
                  strokeWidth={n.isAuthor ? 2.5 : 1.5}
                  strokeDasharray={n.isAuthor ? "5 3" : undefined}
                />
                <text
                  x={NODE_W / 2}
                  y={20}
                  textAnchor="middle"
                  direction="rtl"
                  className={`fill-foreground ${Amiri.className}`}
                  fontSize={15}
                >
                  {label.length > 18 ? `${label.slice(0, 17)}…` : label}
                </text>
                <text x={NODE_W / 2} y={37} textAnchor="middle" className="fill-muted-foreground" fontSize={10}>
                  {n.chainCount.toLocaleString(locale)} · {t(`Ranks.${info.key}`)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="text-xs text-muted-foreground">
        {t("Isnad.Legend", { chains: graph.chainCount.toLocaleString(locale) })}
        {graph.truncated && ` ${t("Isnad.Truncated", { min: graph.minEdgeCount })}`}
      </p>
    </div>
  );
};

export default IsnadGraph;
