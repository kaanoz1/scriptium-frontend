import {RootPlain} from "@/classes/Islam/Quran/Root/Plain";

export const createRootShareText = (root:RootPlain) => {
    let result = "";

    const rootLatin = root.latin;
    const rootText = root.text;

    result += `Qur'an, Root: ${rootText} - ${rootLatin}\n\n`



    if (typeof window !== 'undefined')
        result += window.location.href;

    return result.trim();

    return "";
}