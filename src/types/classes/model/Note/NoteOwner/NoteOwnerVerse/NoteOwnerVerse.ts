import { User } from "../../../User/User";
import {
  VerseUpperMean,
  T_VerseUpperMeanConstructorParametersJSON,
} from "../../../Verse/VerseMean/VerseUpperMean/VerseUpperMean";
import {
  T_NoteOwnerConstructorParameters,
  T_NoteOwnerConstructorParametersJSON,
  NoteOwner,
} from "../NoteOwner";

export type T_NoteOwnerVerseConstructorParameters =
  T_NoteOwnerConstructorParameters & {
    verse: VerseUpperMean;
  };

export type T_NoteOwnerVerseConstructorParametersJSON =
  T_NoteOwnerConstructorParametersJSON & {
    verse: T_VerseUpperMeanConstructorParametersJSON;
  };
export class NoteOwnerVerse extends NoteOwner {
  private verse: VerseUpperMean;
  constructor(data: T_NoteOwnerVerseConstructorParameters) {
    super({ ...data });

    this.verse = data.verse;
  }

  static override createFromJSON(
    data: T_NoteOwnerVerseConstructorParametersJSON
  ): NoteOwnerVerse {
    const verse = VerseUpperMean.createFromJSON(data.verse);
    const creator = User.createFromJSON(data.creator);
    return new NoteOwnerVerse({ ...data, verse, creator });
  }

  getVerse(): VerseUpperMean {
    return this.verse;
  }
}
