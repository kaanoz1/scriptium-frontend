import {
  THadithComplete,
  TNarratorPlain,
  TQuranQuote,
} from "@/dto/Islam/Hadith/ArabicOnly";

export type HadithSegment = {
  text: string;
  start: number;
  end: number;
  /** Part of the matn (the report itself) rather than the isnad. */
  inMatn: boolean;
  /** Set when the segment is a narrator name (null = unlinked mention). */
  narrator?: TNarratorPlain | null;
  /** Set when the segment is part of a Qur'an quotation. */
  quote?: TQuranQuote;
};

/** A hadith page's data, with helpers to render its annotated text. */
export class HadithComplete {
  private readonly _narrators: Map<number, TNarratorPlain>;

  constructor(public readonly data: THadithComplete) {
    this._narrators = new Map(data.narrators.map((n) => [n.id, n]));
  }

  public static fromJson(data: THadithComplete) {
    return new HadithComplete(data);
  }

  public narrator(id: number): TNarratorPlain | undefined {
    return this._narrators.get(id);
  }

  public get hasMatnSpan() {
    return this.data.matnStart !== null && this.data.matnEnd !== null;
  }

  public get matn(): string {
    const { text, matnStart, matnEnd } = this.data;
    return this.hasMatnSpan ? text.slice(matnStart!, matnEnd!) : text;
  }

  public get isnadText(): string {
    return this.hasMatnSpan ? this.data.text.slice(0, this.data.matnStart!) : "";
  }

  /**
   * Splits the text at every annotation boundary (matn span, narrator
   * mentions, Qur'an quotes) so each piece can be styled independently.
   */
  public segments(): HadithSegment[] {
    const { text, matnStart, matnEnd, mentions, quotes } = this.data;
    const len = text.length;
    const clamp = (n: number) => Math.max(0, Math.min(len, n));

    const cuts = new Set<number>([0, len]);
    if (this.hasMatnSpan) {
      cuts.add(clamp(matnStart!));
      cuts.add(clamp(matnEnd!));
    }
    for (const m of mentions) {
      cuts.add(clamp(m.start));
      cuts.add(clamp(m.end));
    }
    for (const q of quotes) {
      cuts.add(clamp(q.start));
      cuts.add(clamp(q.end));
    }
    const points = [...cuts].sort((a, b) => a - b);

    const segments: HadithSegment[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];
      if (end <= start) continue;

      const mention = mentions.find((m) => m.start <= start && end <= m.end);
      const quote = quotes.find((q) => q.start <= start && end <= q.end);
      const inMatn = this.hasMatnSpan
        ? start >= matnStart! && end <= matnEnd!
        : true;

      segments.push({
        text: text.slice(start, end),
        start,
        end,
        inMatn,
        narrator: mention
          ? mention.narratorId !== null
            ? (this._narrators.get(mention.narratorId) ?? null)
            : null
          : undefined,
        quote,
      });
    }
    return segments;
  }
}
