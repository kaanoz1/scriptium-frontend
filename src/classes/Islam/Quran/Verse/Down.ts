import {VerseComplete} from "@/classes/Islam/Quran/Verse/Complete";
import {WordDown} from "@/classes/Islam/Quran/Word/Down";
import {TVerseDown} from "@/dto/Islam/Quran/Verse/Down";

export class VerseDown extends VerseComplete{
    private readonly _words: Array<WordDown>

    constructor(data: TVerseDown) {
        super(data);
        this._words = data.words.map(WordDown.fromJson)
    }

    public get words(){
        return this._words;
    }
}
