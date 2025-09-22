import {
  VerseUpperMean,
  T_VerseUpperMeanConstructorParametersJSON,
} from "../../../Verse/VerseMean/VerseUpperMean/VerseUpperMean";
import {
  T_NoteOwnConstructorParameters,
  T_NoteOwnConstructorParametersJSON,
  NoteOwn,
} from "../NoteOwn";

export type T_NoteOwnVerseConstructorParameters =
  T_NoteOwnConstructorParameters & {
    verse: VerseUpperMean;
  };

export type T_NoteOwnVerseConstructorParametersJSON =
  T_NoteOwnConstructorParametersJSON & {
    verse: T_VerseUpperMeanConstructorParametersJSON;
  };

export class NoteOwnVerse extends NoteOwn {
  private verse: VerseUpperMean;
  constructor(data: T_NoteOwnVerseConstructorParameters) {
    super({ ...data });
    this.verse = data.verse;
  }

  static override createFromJSON(
    data: T_NoteOwnVerseConstructorParametersJSON
  ): NoteOwnVerse {
    const verse = VerseUpperMean.createFromJSON(data.verse);
    return new NoteOwnVerse({ ...data, verse });
  }

  getVerse(): VerseUpperMean {
    return this.verse;
  }
}
