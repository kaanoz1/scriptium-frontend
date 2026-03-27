import {MeaningPlain} from "@/classes/Shared/Meaning/Plain";


export class QuranPlain {
    private readonly _code = "Q";
    private readonly _name: string = "القرآن الكريم";
    private readonly _meanings: Array<MeaningPlain> = [new MeaningPlain({
        language: {
            name: "English",
            nameEnglish: "English",
            code: "en",
        },
        text: "Qur'an"
    })];

    public get code() {
        return this._code;
    }

    public get name() {
        return this._name;
    }

    public get meanings() {
        return this._meanings;
    }

}
