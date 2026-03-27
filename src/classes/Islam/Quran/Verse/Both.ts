import {TWordDown} from "@/dto/Islam/Quran/Word/Down";
import {TVerseComplete} from "@/dto/Islam/Quran/Verse/Complete";
import {TChapterUpToQuran} from "@/dto/Islam/Quran/Chapter/UpToQuran";
import {ChapterUpToQuran} from "@/classes/Islam/Quran/Chapter/UpToQuran";
import {WordDown} from "@/classes/Islam/Quran/Word/Down";
import {VerseComplete} from "@/classes/Islam/Quran/Verse/Complete";
import {TVerseBoth} from "@/dto/Islam/Quran/Verse/Both";


export class VerseBoth extends VerseComplete {
    private readonly _words: Array<WordDown>
    private readonly _chapter: ChapterUpToQuran

    constructor(data: TVerseBoth) {
        super(data);

        this._words = data.words.map(WordDown.fromJson);
        this._chapter = ChapterUpToQuran.fromJson(data.chapter);
    }

    public get words(){
        return this._words
    }

    public get chapter(){
        return this._chapter;
    }
}

