import {FootNoteDTO, T_FootNoteDTOConstructorParametersJSON} from "./FootNote";
import {T_TranslationDTOConstructorParametersJSON, TranslationDTO} from "./Translation";
import {VerseUpperConfinedDTO, VerseUpperMeanDTO} from "./Verse";

export type T_TranslationTextDTOConstructorParameters = {
    text: string,
    translation: TranslationDTO,
    footNotes: Array<FootNoteDTO>
}
export type T_TranslationTextDTOConstructorParametersJSON = {
    text: string,
    translation: T_TranslationDTOConstructorParametersJSON,
    footNotes: Array<T_FootNoteDTOConstructorParametersJSON>
}


export class TranslationTextDTO {
    private readonly text: string
    private readonly translation: Readonly<TranslationDTO>
    private readonly footNotes: ReadonlyArray<FootNoteDTO>

    constructor(
        data: T_TranslationTextDTOConstructorParameters
    ) {

        this.text = data.text
        this.translation = data.translation
        this.footNotes = data.footNotes
    }

    static createFromJSON(data: T_TranslationTextDTOConstructorParametersJSON): TranslationTextDTO {
        const translation = TranslationDTO.createFromJSON(data.translation);
        const footNotes = data.footNotes.map(FootNoteDTO.createFromJSON);
        return new TranslationTextDTO({...data, translation, footNotes});
    }

    getText(): string {
        return this.text;
    }

    getTranslation(): Readonly<TranslationDTO> {
        return Object.freeze(this.translation);
    }

    getFootNotes(): ReadonlyArray<FootNoteDTO> {
        return Object.freeze([...this.footNotes]);
    }
}

export class TranslationTextWithVerseUpperConfinedDTO {
    constructor(
        private readonly translationText: TranslationTextDTO,
        private readonly verse: Readonly<VerseUpperConfinedDTO>
    ) {
    }

    getTranslationText(): Readonly<TranslationTextDTO> {
        return Object.freeze(this.translationText);
    }

    getVerse(): Readonly<VerseUpperConfinedDTO> {
        return Object.freeze(this.verse);
    }
}

export class TranslationTextWithVerseUpperMeanDTO {
    constructor(
        private readonly translationText: TranslationTextDTO,
        private readonly verse: Readonly<VerseUpperMeanDTO>
    ) {
    }

    getTranslationText(): Readonly<TranslationTextDTO> {
        return Object.freeze(this.translationText);
    }

    getVerse(): Readonly<VerseUpperMeanDTO> {
        return Object.freeze(this.verse);
    }
}
