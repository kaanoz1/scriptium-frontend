import {AvailableLanguages, AvailableScriptures} from "@/util/utils";
import {ToastProps} from "@heroui/toast/dist/use-toast";
import {UUID} from "crypto";

export type User = {
    id: UUID;
    username: string;
    name: string;
    surname: string | null;
    gender: string | null;
    email: string;
    langId: keyof typeof AvailableLanguages;
    image: string | null;
    biography: string | null;
    privateFrom?: Date;
    roles: string[];
    createdAt: Date | null;
};

export type UserSimplified = Pick<
    User,
    "id" | "username" | "image" | "name" | "surname"
>;

export type UserFetched = {
    id: UUID;
    name: string;
    surname: string | null;
    username: string;
    privateFrom: Date | null;
    biography: string | null;
    followerCount: number;
    followingCount: number;
    image: string | null;
    noteCount: number;
    suggestionCount: number;
    reflectionCount: number;
    roles: string[];
    followStatusUserInspecting?: FollowStatus;
    followStatusUserInspected?: FollowStatus;
    createdAt: Date;
    updateAccountCount: number;
    isUserInspectedBlocked?: boolean;
};

export type FollowStatus = "Accepted" | "Pending";

export type CommentExtendedParentCommentDTO = {
    id: number;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    likeCount: number;
    replyCount: number;
    isLiked: boolean;
    verse: VerseSimpleDTO;
    parentComment: ParentCommentDTO | null;
};

export type ParentCommentDTO = {
    id: number;
    text: string;
    createdAt: Date;
    updatedAt: Date | null;
    user: ParentCommentOwnerUserDTO | null;
};

export type ParentCommentOwnerUserDTO = {
    username: string;
    image: string | null;
    name: string;
    surname: string | null;
};

export type FollowUserDTO = {
    username: string;
    image: string | null;
    name: string;
    surname: string | null;
    occurredAt: Date;
    isFrozen: boolean;
};

export type VerseDTO = {
    id: number;
    number: number;
    text: string;
    textWithoutVowel: string | null;
    textSimplified: string | null;
    chapter: ChapterDTO;
    words: WordConfinedDTO[];
    transliterations: TransliterationDTO[];
    translationTexts: TranslationTextDTO[];
    isSaved: boolean;
};

export type ChapterDTO = {
    name: string;
    number: number;
    section: SectionDTO;
    meanings: Meaning[];
};

export type ScriptureConfinedDTO = {
    name: string;
    code: AvailableScriptureKey;
    number: number;
    meanings: Meaning[];
};

export type Meaning = {
    meaning: string;
    language: LanguageDTO;
};

export type LanguageDTO = {
    langCode: string;
    langOwn: string;
    langEnglish: string;
};

export type WordConfinedDTO = {
    sequenceNumber: number;
    text: string;
    textWithoutVowel: string | null;
    textSimplified: string | null;
    roots: RootSimpleDTO[];
};

export type RootSimpleDTO = {
    latin: string;
    own: string;
};

export type RootDTO = {
    own: string;
    latin: string;
    translations: Array<TranslationWithMultiTextDTO>;
    verses: Array<VerseExpendedWordDTO>;
};

export type VerseExpendedWordDTO = {
    id: number;
    text: string;
    textWithoutVowel: string | null;
    textSimplified: string | null;
    number: number;
    transliterations: Array<TransliterationDTO>;
    words: Array<WordConfinedDTO>;
    chapter: ChapterDTO;
};

export type TransliterationDTO = {
    transliteration: string;
    language: LanguageDTO;
};

export type TranslationTextDTO = {
    text: string;
    translation: TranslationDTO;
    footNotes: FootNoteDTO[];
};

export type TranslationDTO = {
    id: number;
    name: string;
    language: LanguageDTO;
    translators: TranslatorDTO[];
    isEager: boolean;
};

export type TranslatorDTO = {
    name: string;
    url: string | null;
    language: LanguageDTO;
};

export type FootNoteDTO = { index: number; text: string };

export type ScripturePageParams = {
    scriptureCode: string;
};
export type SectionPageParams = {
    scriptureCode: string;
    sectionNumber: string;
};
export type ChapterPageParams = {
    scriptureCode: string;
    sectionNumber: string;
    chapterNumber: string;
};

export type ScriptureDTO = {
    id: number;
    name: string;
    code: AvailableScriptureKey;
    number: number;
    sections: SectionWithMeaningDTO[];
    meanings: Meaning[];
};

export type SectionWithMeaningDTO = {
    meanings: Meaning[];
    name: string;
};
export type SectionSimpleDTO = {
    scriptureName: string;
    scriptureMeanings: Meaning[];
    name: string;
    sectionMeanings: Meaning[];
    chapterCount: number;
};

export type ChapterConfinedDTO = {
    scriptureName: string;
    scriptureMeanings: Meaning[];
    sectionName: string;
    sectionMeanings: Meaning[];
    chapterName: string;
    chapterMeanings: Meaning[];
    verses: ConfinedVerseDTO[];
    translations: TranslationWithMultiTextDTO[];
};

export type TranslationWithMultiTextDTO = {
    translation: TranslationDTO;
    translationTexts: TranslationTextSimpleDTO[];
};

export type ConfinedVerseDTO = {
    id: number;
    text: string;
    textSimplified: string | null;
    textWithoutVowel: string | null;
    number: number;
    transliterations: TransliterationDTO[];
};

export type TranslationTextSimpleDTO = {
    text: string;
    footNotes: FootNoteDTO[];
};

export type VerseOptions = {
    showTranslation: boolean;
    showOriginalText: boolean;
    showTransliteration: boolean;
};

export type VerseTextVariation = "text" | "textSimplified" | "textWithoutVowel";

export type CollectionWithVerseSavedInformationDTO = {
    name: string;
    description: string | null;
    isSaved: boolean;
};

export type CreateCollectionForm = {
    collectionName: string;
    description: string | null;
};

export type CollectionDTO = {
    id: number;
    name: string;
    description: string | null;
    saveCount: number;
};

export type BlockDTO = {
    id: UUID;
    username: string;
    name: string;
    surname: string | null;
    blockedAt: string;
    image: string | null;
    reason: string | null;
};

export type VerseCollectionDTO = {
    id: number;
    number: number;
    text: string;
    textWithoutVowel: string;
    textSimplified: string;
    chapterNumber: number;
    section: SectionDTO;
    transliterations: TransliterationDTO[];
    translations: TranslationWithSingleTextDTO[];
};

export type SectionDTO = {
    name: string;
    number: number;
    scripture: ScriptureDTO;
    meanings: Meaning[];
};


export type TranslationWithSingleTextDTO = {
    translation: TranslationDTO;
    translationText: TranslationTextSimpleDTO;
};

export type RefetchDataFunctionType = (
    options?: RefetchOptions
) => Promise<QueryObserverResult<CollectionDTO[], Error>>;

export type AvailableScriptureKey = keyof typeof AvailableScriptures;

export type CommentDTO = {
    id: number;
    user: UserSimplified;
    text: string;
    createdAt: Date;
    updatedAt: Date | null;
    parentCommentId: number | null;
    likeCount: number;
    replyCount: number;
    isLiked: boolean;
};

export type CommentDTOExtended = {
    id: number;
    user: UserSimplified;
    text: string;
    createdAt: Date;
    updatedAt: Date | null;
    parentCommentId: number | null;
    likeCount: number;
    replyCount: number;
    isLiked: boolean;
    verse: VerseSimpleDTO;
};

export type LikedCommentDTO = {
    id: number;
    user: UserSimplified;
    text: string;
    createdAt: Date;
    updatedAt: Date | null;
    parentCommentId: number | null;
    likeCount: number;
    replyCount: number;
    isLiked: boolean;
    verse: VerseSimpleDTO;
};

export type LikedNoteDTO = {
    id: number;
    user: UserSimplified;
    noteText: string;
    createdAt: Date;
    updatedAt: Date | null;
    parentCommentId: number | null;
    likeCount: number;
    replyCount: number;
    isLiked: boolean;
    verse: VerseCollectionDTO;
};

export type NoteDTO = {
    id: number;
    noteText: string;
    user: UserSimplified;
    createdAt: Date;
    updatedAt: Date | null;
    likeCount: number;
    replyCount: number;
    isLiked: boolean;
};

export type NoteDTOExtended = {
    id: number;
    noteText: string;
    user: UserSimplified;
    createdAt: Date;
    updatedAt: Date | null;
    likeCount: number;
    replyCount: number;
    isLiked: boolean;
    verse: VerseSimpleDTO;
};

export type VerseSimpleDTO = {
    id: number;
    number: number;
    text: string;
    textWithoutVowel: string | null;
    textSimplified: string | null;
    chapter: ChapterDTO;
};

export type UnblockUserForm = {
    username: string;
};

export type BlockReason = {
    username: string;
    reason: string | null;
};

export type RootPageParams = {
    scriptureCode: string | AvailableScriptureKey;
    rootLatin: string;
};

export type VerseAndTranslationForRoot = {
    verse: VerseExpendedWordDTO;
    translation: TranslationTextSimpleDTO;
};

export type InformationalTranslatorsDTO = TranslationDTO & {
    scripture: ScriptureDTO;
};

export type UserPageParams = {
    username: string;
};

export type TranslationTextExtendedVerseDTO = {
    text: string;
    translation: TranslationDTO;
    footNotes: FootNoteDTO[];
    verse: VerseSimpleDTO;
};
export type Column = { key: string; label: string };
export type ScriptureDetails = {
    number: number;
    defaultTranslationId: number;
    textSymbol: string;
    textSimplifiedSymbol: string;
    textWithoutVowelSymbol: string;
    defaultScriptureFont: string;
    code: AvailableScriptureKey;
};

export type ImageObject = {
    image: string | null;
    [key: string]: unknown;
};

export type Toast = ToastProps;