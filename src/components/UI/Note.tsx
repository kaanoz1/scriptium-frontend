import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {ResponseMessage} from "@/types/response";
import {
    AvailableScriptureKey,
    ImageObject,
    NoteDTO,
    NoteDTOExtended,
    RefetchDataFunctionType, Toast,
    User,
    VerseCollectionDTO,
    VerseSimpleDTO,
} from "@/types/types";
import {
    arrangeImageAndReturns, displayErrorToast,
    formatDate,
    getFormattedNameAndSurname,
    handleNoteLike,
    handleNoteUnlike,
    OK_RESPONSE_CODE,
} from "@/util/utils";
import {Button} from "@heroui/button";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    DropdownSection,
} from "@heroui/dropdown";
import {Link} from "@heroui/link";
import {User as HEROUIUserComponent} from "@heroui/user";
import {AxiosResponse} from "axios";
import {NextPage} from "next";
import {Dispatch, SetStateAction, useState} from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import {FaUser, FaEdit, FaRegTrashAlt, FaHeart} from "react-icons/fa";
import {addToast} from "@heroui/toast";

//TODO: Add reply system.

interface Props {
    note: NoteDTOExtended;
    user?: User;
    refetch: RefetchDataFunctionType;
    stateFunctionForEditNote?:
        | Dispatch<SetStateAction<NoteDTOExtended | null>>
        | Dispatch<SetStateAction<NoteDTO | null>>;

    showVerse?: boolean;
}

const Note: NextPage<Props> = ({
                                   note: noteDisplayed,
                                   refetch,
                                   user,
                                   stateFunctionForEditNote,

                                   showVerse = false,
                               }) => {
    const [note, setNote] = useState<NoteDTOExtended>(noteDisplayed);

    const deleteComment = async () => {
        try {
            const response = await axiosCredentialInstance.delete(`/note/delete`, {
                data: {noteId: note.id},
            });

            switch (response.status) {
                case OK_RESPONSE_CODE:
                    await refetch();
                    return;
                default:

                    const couldnotDeleted: Toast = {
                        title: "Could not deleted.",
                        description: "Note may be already deleted or has never been existed.",
                        color: "danger"
                    }
                    addToast(couldnotDeleted);

                    return;
            }
        } catch (error) {
            console.error(error);
            displayErrorToast(error);
            return;


        }
    };

    const imageUrl = arrangeImageAndReturns(note.user as ImageObject).image;

    const noteOwnerFormattedName = getFormattedNameAndSurname(note.user);
    const noteOwnerUsername = note.user.username;

    const handleLikeClick = async () => {
        let response: AxiosResponse<ResponseMessage> | null = null;

        try {
            if (note.isLiked) response = await handleNoteUnlike(note.id);
            else response = await handleNoteLike(note.id);

            switch (response.data.message) {
                case "Note is successfully liked":
                    setNote((note) => ({
                        ...note,
                        isLiked: true,
                        likeCount: note.likeCount + 1,
                    }));
                    return;
                case "Like that attached this note is successfully deleted.":
                    setNote((note) => ({
                        ...note,
                        isLiked: false,
                        likeCount: note.likeCount - 1,
                    }));
                    return;

                default:
                    return;
            }
        } catch (error) {
            console.error(error);
            return;
        }
    };

    const verse: VerseSimpleDTO | VerseCollectionDTO = note.verse;

    const scriptureMeaning: string =
        verse.chapter.section.scripture.meanings.find(
            (s) => s.language.langCode === "en"
        )?.meaning ?? "Scripture";

    const scriptureCode: AvailableScriptureKey =
        verse.chapter.section.scripture.code;

    const scriptureNameInOwnLanguage: string =
        verse.chapter.section.scripture.name;

    const sectionMeaning =
        verse.chapter.section.meanings.find((s) => s.language.langCode === "en")
            ?.meaning ?? "Section";

    const sectionNumber: number = verse.chapter.section.number;

    const sectionNameInOwnLanguage: string = verse.chapter.section.name;

    const chapterNumber: number = verse.chapter.number;

    const verseNumber: number = verse.number;

    return (
        <Card className="border-none w-full">
            <CardHeader className=" flex items-center justify-between">
                <HEROUIUserComponent
                    classNames={{
                        name: "text-sm font-semibold",
                        description: "text-xs",
                    }}
                    avatarProps={{
                        src: imageUrl ?? undefined,
                        size: "sm",
                    }}
                    name={noteOwnerFormattedName}
                    description={
                        <Link href={`/user/${noteOwnerUsername}`} size="sm">
                            @{noteOwnerUsername}
                        </Link>
                    }
                />

                <div className="flex items-center gap-3">
          <span className="text-xs text-foreground/50">
            {formatDate(note.createdAt)}
              {note.updatedAt && ` (Updated: ${formatDate(note.updatedAt)})`}
          </span>

                    {user && (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    isIconOnly
                                    variant="light"
                                    radius="full"
                                    className="data-[hover]:bg-foreground/10"
                                >
                                    <BsThreeDotsVertical size={14}/>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Comment actions">
                                <DropdownItem key="profile" startContent={<FaUser size={13}/>}>
                                    <Link
                                        href={`/user/${noteOwnerUsername}`}
                                        isExternal
                                        size="sm"
                                        color="foreground"
                                        className="px-1"
                                    >
                                        Go to user profile
                                    </Link>
                                </DropdownItem>
                                {user.id === note.user.id ? (
                                    <DropdownSection showDivider aria-label="Actions">
                                        {stateFunctionForEditNote ? (
                                            <DropdownItem
                                                key="edit"
                                                startContent={<FaEdit size={13}/>}
                                                onPress={() => stateFunctionForEditNote(note)}
                                            >
                                                Edit
                                            </DropdownItem>
                                        ) : null}
                                        <DropdownItem
                                            key="delete"
                                            className="text-danger"
                                            color="danger"
                                            startContent={<FaRegTrashAlt size={13}/>}
                                            onPress={deleteComment}
                                        >
                                            Delete
                                        </DropdownItem>
                                    </DropdownSection>
                                ) : null}
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </div>
            </CardHeader>

            <CardBody className="px-4 py-2 text-sm text-foreground/90">
                <p>{note.noteText}</p>
            </CardBody>

            <CardFooter className="flex items-center justify-between">
                <footer className="flex items-center gap-4 w-full">
                    <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        className="data-[hover]:bg-foreground/10"
                        onPress={handleLikeClick}
                    >
                        <FaHeart
                            size={16}
                            className={`${
                                note.isLiked ? "text-red-500" : "text-default-600"
                            }`}
                        />
                    </Button>
                    <span className="text-xs text-foreground/90">{note.likeCount}</span>

                    {/* <Button
            isIconOnly
            variant="light"
            radius="full"
            className="data-[hover]:bg-foreground/10"
          >
            <FaRegCommentAlt size={14} className="text-default-600" />
          </Button>
          <span className="text-xs text-foreground/90">{note.replyCount}</span> */}

                    {showVerse && (
                        <div className="ml-auto px-5">
                            Attached on VerseDTO:{" "}
                            <Link
                                size="sm"
                                href={`${scriptureCode}/${sectionNumber}/${chapterNumber}/${verseNumber}`}
                            >
                                {scriptureMeaning} ({scriptureNameInOwnLanguage}),{" "}
                                {sectionMeaning} ({sectionNameInOwnLanguage}), Chapter{" "}
                                {chapterNumber}, {verseNumber}{" "}
                            </Link>
                        </div>
                    )}
                </footer>
            </CardFooter>
        </Card>
    );
};

export default Note;
