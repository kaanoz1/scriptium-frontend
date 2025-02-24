import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import axiosNoCredentialInstance from "@/client/axiosNoCredentialInstance";
import {Response, ResponseMessage} from "@/types/response";
import {
    AvailableScriptureKey,
    TranslationWithSingleTextDTO,
    User,
    UserFetched,
    UserSimplified,
    VerseDTO,
    VerseCollectionDTO,
    ConfinedVerseDTO,
    VerseSimpleDTO,
    ParentCommentOwnerUserDTO,
    RootDTO,
    VerseAndTranslationForRoot,
    WordConfinedDTO,
    RootSimpleDTO,
    TranslationDTO,
    TranslationTextDTO,
    FollowUserDTO,
    BlockDTO,
    TranslationWithMultiTextDTO,
    TranslationTextExtendedVerseDTO,
    ImageObject,
    ScriptureDetails, Toast,
} from "@/types/types";
import {SlotsToClasses} from "@heroui/theme";
import * as dotenv from "dotenv";
import {Key} from "react";
import {addToast} from "@heroui/toast";

dotenv.config({path: "./.env"});

export const PROJECT_NAME = "Scriptium";

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL; //TODO: For development, will be changed.
export const PROJECT_URL = process.env.NEXT_PUBLIC_PROJECT_URL; //TODO: For development, will be changed.
export const PROJECT_EMAIL_ADDRESS = process.env.NEXT_PUBLIC_EMAIL_ADDRESS; //TODO: For development, will be changed.
export const PROJECT_INSTAGRAM_ADDRESS = process.env.NEXT_PUBLIC_INSTAGRAM_ADDRESS; //TODO: For development, will be changed.
export const PROJECT_X_ADDRESS = process.env.NEXT_PUBLIC_X_ADDRESS; //TODO: For development, will be changed.
export const DISCORD_BOT_ADD_URL = process.env.NEXT_PUBLIC_DISCORD_BOT_ADD_URL; //TODO: For development, will be changed.
export const PATREON_SUPPORT_URL = process.env.NEXT_PUBLIC_PATREON_SUPPORT_URL; //TODO: For development, will be changed.
export const PAYPAL_SUPPORT_URL = process.env.NEXT_PUBLIC_PAYPAL_SUPPORT_URL; //TODO: For development, will be changed.
export const GITHUB_SCRIPTIUM_PROJECT_URL =
    process.env.NEXT_PUBLIC_GITHUB_SCRIPTIUM_PROJECT_URL; //TODO: For development, will be changed.
export const GITHUB_SCRIPTIUM_FRONTEND_PROJECT_URL =
    process.env.NEXT_PUBLIC_GITHUB_SCRIPTIUM_FRONTEND_PROJECT_URL; //TODO: For development, will be changed.
export const GITHUB_SCRIPTIUM_BACKEND_PROJECT_URL =
    process.env.NEXT_PUBLIC_GITHUB_SCRIPTIUM_BACKEND_PROJECT_URL; //TODO: For development, will be changed.
export const GITHUB_SCRIPTIUM_DISCORD_BOT_PROJECT_URL =
    process.env.NEXT_PUBLIC_GITHUB_SCRIPTIUM_DISCORD_BOT_PROJECT_URL; //TODO: For development, will be changed.
export const GITHUB_SCRIPTIUM_MOBILE_PROJECT_URL =
    process.env.NEXT_PUBLIC_GITHUB_SCRIPTIUM_MOBILE_PROJECT_URL; //TODO: For development, will be changed.

export const ACCEPTED_PROFILE_PICTURE_EXTENSIONS = ["image/jpeg", "image/jpg"];

export const AvailableLanguages = {
    1: "en",
} as const;

export const AvailableScriptures = {
    t: {
        number: 1,
        defaultTranslationId: 1,
        code: "t",
        textSymbol: "אָ֑",
        textSimplifiedSymbol: "אָ",
        textWithoutVowelSymbol: "א",
        defaultScriptureFont: "font-davidLibre",
    },
} as const;

export function formatDate(input: string): string;
export function formatDate(input: Date): string;
export function formatDate(input: string | Date): string {
    let date: Date;

    if (input instanceof Date) date = input;
    else date = new Date(input);

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };

    return date.toLocaleString("en-US", options).replace(",", "");
}

export function formatDateDMY(input: Date): string;
export function formatDateDMY(input: string): string;
export function formatDateDMY(input: string | Date): string {
    let date: Date;

    if (input instanceof Date) date = input;
    else date = new Date(input);

    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

const isValidBase64 = (str: string) => {
    try {
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
};

export const arrangeImageAndReturns = (input: ImageObject) => {
    if (input.image && isValidBase64(input.image))
        input.image = `data:image/jpeg;base64,${input.image}`;

    return input;
};

export const isAvailableScriptureKey = (
    code: string
): code is AvailableScriptureKey => code in AvailableScriptures;

export const getScripture = (
    scriptureCode: string
): ScriptureDetails | undefined => {
    if (!isAvailableScriptureKey(scriptureCode)) return undefined;

    return AvailableScriptures[scriptureCode];
};

export const getLocalItem = (key: string) => localStorage.getItem(key);
export const setLocalItem = (key: string, data: unknown) => {
    const stringifyData = JSON.stringify(data);
    localStorage.setItem(key, stringifyData);
};

export const UNDEFINED_TRANSLATION_DTO: TranslationDTO = {
    id: 0,
    name: "Unknown Translation",
    language: {
        langCode: "unknown",
        langEnglish: "unknown",
        langOwn: "unknown",
    },
    translators: [
        {
            name: "Unknown Translator",
            url: null,
            language: {
                langCode: "unknown",
                langEnglish: "unknown",
                langOwn: "unknown",
            },
        },
    ],
    isEager: false,
};

export const UNDEFINED_TRANSLATION_TEXT_COLLECTION: TranslationWithSingleTextDTO =
    {
        translation: UNDEFINED_TRANSLATION_DTO,
        translationText: {
            text: "This translation is not available. This circumstance should not be occurred. Please report this to us.",
            footNotes: [],
        },
    };

export const UNDEFINED_TRANSLATION_TEXT_CHAPTER: TranslationWithMultiTextDTO = {
    translation: {
        id: 0,
        name: "Unknown Translation",
        language: {
            langCode: "unknown",
            langEnglish: "unknown",
            langOwn: "unknown",
        },
        translators: [
            {
                name: "Unknown Translator",
                url: null,
                language: {
                    langCode: "unknown",
                    langEnglish: "unknown",
                    langOwn: "unknown",
                },
            },
        ],
        isEager: false,
    },
    translationTexts: [
        {
            text: "This translation is not available. This circumstance should not be occurred. Please report this to us.",
            footNotes: [],
        },
    ],
};

export const DEFAULT_LANG_CODE = "en";
export const SIGN_UP_URL = "/auth/signup";
export const SIGN_IN_URL = "/auth/signin";

export const MAX_LENGTH_FOR_COLLECTION_NAME = 24;
export const MAX_LENGTH_FOR_COLLECTION_DESCRIPTION = 72;
export const MAX_LENGTH_FOR_COMMENT = 250;
export const MAX_LENGTH_FOR_NOTE = 1000;

export const NOT_FOUND_RESPONSE_CODE = 404;
export const CONFLICT_RESPONSE_CODE = 409;
export const UNAUTHORIZED_RESPONSE_CODE = 401;
export const METHOD_NOT_ALLOWED_RESPONSE_CODE = 405;
export const TOO_MANY_REQUEST_RESPONSE_CODE = 429;
export const INTERNAL_SERVER_ERROR_RESPONSE_CODE = 500;
export const OK_RESPONSE_CODE = 200;

export const MAX_USER_COLLECTION_COUNT = 3;

export const DEFAULT_NOTFOUND_WORD: WordConfinedDTO = {
    sequenceNumber: 0,
    text: "NOTFOUND",
    textSimplified: null,
    textWithoutVowel: null,
    roots: [],
};

export const AvailableScripturesData: Record<
    AvailableScriptureKey,
    number[][]
> = {
    t: [
        [
            31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33,
            38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43,
            36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26,
        ],
        [
            22, 25, 22, 31, 23, 30, 29, 28, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27,
            25, 26, 37, 30, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38,
            29, 31, 43, 38,
        ],
        [
            17, 16, 17, 35, 26, 23, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37,
            27, 24, 33, 44, 23, 55, 46, 34,
        ],
        [
            54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 35, 28, 32,
            22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 39, 17, 54, 42, 56, 29, 34, 13,
        ],
        [
            46, 37, 29, 49, 30, 25, 26, 20, 29, 22, 32, 31, 19, 29, 23, 22, 20, 22,
            21, 20, 23, 29, 26, 22, 19, 19, 26, 69, 28, 20, 30, 52, 29, 12,
        ],
        [
            18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28,
            51, 9, 45, 34, 16, 33,
        ],
        [
            36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31,
            30, 48, 25,
        ],
        [
            28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30,
            24, 42, 16, 23, 28, 23, 44, 25, 12, 25, 11, 31, 13,
        ],
        [
            27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 32,
            44, 26, 22, 51, 39, 25,
        ],
        [
            53, 46, 28, 20, 32, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46,
            21, 43, 29, 54,
        ],
        [
            18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 20, 22, 25, 29, 38, 20, 41, 37,
            37, 21, 26, 20, 37, 20, 30,
        ],
        [
            31, 22, 26, 6, 30, 13, 25, 23, 20, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6,
            17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8,
            31, 29, 25, 28, 28, 25, 13, 15, 12, 17, 13, 12, 21, 14, 12, 19, 11, 25,
            24,
        ],
        [
            19, 37, 25, 31, 31, 30, 34, 23, 25, 25, 23, 17, 27, 22, 21, 21, 27, 23,
            15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32,
            21, 28, 18, 16, 33, 24, 41, 30, 32, 34,
        ],
        [
            28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14,
            44, 37, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28,
            23, 29, 49, 26, 20, 27, 31, 25, 24, 35,
        ],
        [9, 25, 5, 19, 15, 11, 16, 14, 17, 15, 11, 15, 15, 10],
        [20, 27, 5, 21],
        [15, 16, 15, 13, 27, 14, 17, 14, 15],
        [21],
        [16, 11, 10, 11],
        [16, 13, 12, 14, 14, 16, 20],
        [14, 14, 19],
        [17, 20, 19],
        [18, 15, 20],
        [15, 23],
        [17, 17, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21],
        [14, 17, 24],
        [
            6, 12, 9, 9, 13, 11, 18, 10, 21, 18, 7, 9, 6, 7, 5, 11, 15, 51, 15, 10,
            14, 32, 6, 10, 22, 12, 14, 9, 11, 13, 25, 11, 22, 23, 28, 13, 40, 23, 14,
            18, 14, 12, 5, 27, 18, 12, 10, 15, 21, 23, 21, 11, 7, 9, 24, 14, 12, 12,
            18, 14, 9, 9, 5, 8, 29, 22, 35, 45, 48, 43, 14, 31, 7, 10, 10, 9, 8, 18,
            19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9,
            8, 24, 14, 10, 8, 12, 15, 21, 10, 20, 14, 9, 6,
        ],
        [
            33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24,
            29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31,
        ],
        [
            22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21,
            29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24,
            41, 30, 32, 26, 17,
        ],
        [17, 17, 11, 16, 16, 12, 14, 14],
        [22, 23, 18, 22],
        [22, 22, 66, 22, 22],
        [18, 26, 22, 17, 19, 12, 29, 17, 18, 20, 10, 14],
        [22, 23, 15, 17, 14, 14, 10, 17, 32, 3],
        [21, 49, 33, 34, 30, 29, 28, 27, 27, 21, 45, 13],
        [11, 70, 13, 24, 17, 22, 28, 36, 15, 44],
        [11, 20, 38, 17, 19, 19, 72, 18, 37, 40, 36, 47, 31],
        [
            54, 55, 24, 43, 41, 66, 40, 40, 44, 14, 47, 41, 14, 17, 29, 43, 27, 17,
            19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30,
        ],
        [
            18, 17, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 23, 14, 19, 14, 19, 34,
            11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23,
        ],
    ],
};

export const getChapterInformation = (
    scriptureCode: AvailableScriptureKey,
    sectionNumber: number,
    chapterNumber: number
) => {
    let doesPreviousChapterExists = true;
    let doesNextChapterExists = true;

    const chapterIndex = chapterNumber - 1;
    const sectionIndex = sectionNumber - 1;

    if (
        AvailableScripturesData[scriptureCode][sectionIndex]?.[chapterIndex - 1] ==
        undefined
    )
        doesPreviousChapterExists = false;

    if (
        AvailableScripturesData[scriptureCode][sectionIndex]?.[chapterIndex + 1] ==
        undefined
    )
        doesNextChapterExists = false;

    return {doesPreviousChapterExists, doesNextChapterExists};
};

export const getVerseInformation = (
    scriptureCode: AvailableScriptureKey,
    sectionNumber: number,
    chapterNumber: number,
    verseNumber: number
) => {
    let doesPreviousVerseExists = true;
    let doesNextVerseExists = true;

    const chapterIndex = chapterNumber - 1;
    const sectionIndex = sectionNumber - 1;

    if (verseNumber === 1) doesPreviousVerseExists = false;

    if (
        AvailableScripturesData[scriptureCode][sectionIndex]?.[chapterIndex] <=
        verseNumber
    )
        doesNextVerseExists = false;

    return {doesPreviousVerseExists, doesNextVerseExists};
};

export function getFormattedNameAndSurname(
    user:
        | User
        | UserSimplified
        | UserFetched
        | ParentCommentOwnerUserDTO
        | FollowUserDTO
        | BlockDTO
): string {
    return user.surname ? `${user.name} ${user.surname}`.trim() : user.name;
}

export const handleCommentVerseLike = async (
    commentId: number,
    verse: VerseDTO | VerseCollectionDTO | ConfinedVerseDTO | VerseSimpleDTO
) => {
    return await axiosCredentialInstance.post<ResponseMessage>(
        `/like/comment/verse`,
        {commentId, entityId: verse.id}
    );
};

export function getFormattedNameAndSurnameFromString(
    name: string,
    surname: string | null | undefined
) {
    return surname ? `${name} ${surname}`.trim() : name;
}

export const handleCommentVerseUnlike = async (
    commentId: number,
    verse: VerseDTO | VerseCollectionDTO | ConfinedVerseDTO | VerseSimpleDTO
) => {
    return await axiosCredentialInstance.delete<ResponseMessage>(
        `/like/unlike/comment`,
        {data: {commentId, entityId: verse.id}}
    );
};

export const handleNoteLike = async (noteId: number) => {
    return await axiosCredentialInstance.post<ResponseMessage>(`/like/note`, {
        noteId,
    });
};

export const handleNoteUnlike = async (noteId: number) => {
    return await axiosCredentialInstance.delete<ResponseMessage>(
        `/like/unlike/note`,
        {data: {noteId}}
    );
};

//TODO: Amend;
export const getArrangedVerseAndTranslationForRootArray = (
    root: RootDTO,
    preferredTranslationIds: Set<Key>
): Array<VerseAndTranslationForRoot> => {
    const arr: Array<VerseAndTranslationForRoot> = [];

    for (const i in root.verses) {
        const verse = root.verses[i];

        const translation = (
            root.translations.find((t) =>
                preferredTranslationIds.has(t.translation.id.toString())
            ) ?? UNDEFINED_TRANSLATION_TEXT_CHAPTER
        ).translationTexts[i];

        arr.push({verse, translation});
    }

    return arr;
};

export const getRootSimpleDTOFromRootDTO = (root: RootDTO): RootSimpleDTO => {
    return {latin: root.latin, own: root.own};
};

export const getShareTextForVersePage = (
    scriptureMeaning: string,
    scriptureNameInOwnLanguage: string,
    sectionNameInOwnLanguage: string,
    sectionMeaning: string,
    chapterNumber: number,
    preferredTranslationIds: Set<Key>,
    verseText: string,
    verseNumber: number,
    translationTexts: Array<TranslationTextDTO>
): string => {
    return `${scriptureMeaning} (${scriptureNameInOwnLanguage}), ${sectionMeaning} (${sectionNameInOwnLanguage}), Chapter: ${chapterNumber}, Verse: ${verseNumber}\n
                      ${verseText}\n\n${translationTexts
        .filter((t) => preferredTranslationIds.has(t.translation.id))
        .map((e) => `${e.translation.name}\n ${e.text}`)
        .join("\n")}\n\n${window.location.href}`;
};

export const TOOL_TIP_CLASS_NAMES: SlotsToClasses<
    "base" | "content" | "arrow"
> = {
    content: ["text-white bg-black dark:text-black dark:bg-white"],
    base: [`before:bg-black dark:before:bg-white`],
};

export const fetchQuery = async (query: string) => {
    try {
        const response = await axiosNoCredentialInstance.get<
            Response<TranslationTextExtendedVerseDTO[]>
        >(`/query/search?query=${encodeURIComponent(query)}`);

        return response.data.data ?? [];
    } catch (error) {
        console.error(error);
        addToast(SOMETHING_WENT_WRONG_TOAST);
        return [];
    }
};

export const SOMETHING_WENT_WRONG_TOAST: Toast = {
    title: "Something went unexpectedly wrong?",
    description: "An unexpected issue occurred. If the issue persists, please report it.",
    color: "danger"
}

export const getErrorToast = (error: unknown, description?: string): Toast => {
    const toast: Toast = {
        title: "Error?",
        description: description ?? "Something went wrong, please try again later. If persist, please report this situation.",
        color: "danger"
    };

    if (error instanceof Error)
        toast.description = error.message;

    return toast;

}

export const displayErrorToast = (error: unknown, description?: string) => {
    const errorToast: Toast = getErrorToast(error, description);
    addToast(errorToast);

}


export const handleCopy = async (textToBeCopied: string) => {

    let toastToBeDisplayed: Toast | null = null;
    try {
        await navigator.clipboard.writeText(textToBeCopied);

        toastToBeDisplayed = {
            title: "Copied!",
            color: "success"
        };
    } catch (error) {


        console.error(error);

        toastToBeDisplayed = {
            title: "Couldn't copy. Try again later.",
            description: `Error: ${error}`,
            color: "danger",
        };
    } finally {
        addToast(toastToBeDisplayed);
    }
};