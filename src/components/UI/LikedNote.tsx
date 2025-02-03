import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { ResponseMessage } from "@/types/response";
import {
  AvailableScriptureKey,
  ImageObject,
  LikedNoteDTO,
  RefetchDataFunctionType,
  User,
  VerseCollectionDTO,
  VerseSimpleDTO,
} from "@/types/types";
import {
  OK_RESPONSE_CODE,
  getFormattedNameAndSurname,
  arrangeImageAndReturns,
  formatDate,
  handleNoteLike,
  handleNoteUnlike,
} from "@/util/utils";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/dropdown";
import { Link } from "@heroui/link";
import { AxiosResponse } from "axios";
import { NextPage } from "next";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUser, FaRegTrashAlt, FaHeart } from "react-icons/fa";
import { User as NEXTUIUserComponent } from "@heroui/user";
import { Textarea } from "@heroui/input";

interface Props {
  note: LikedNoteDTO;
  refetchFunction: RefetchDataFunctionType;
  user: User;
}

const LikedNote: NextPage<Props> = ({
  note: noteDisplayed,
  refetchFunction,

  user,
}) => {
  const [note, setNote] = useState<LikedNoteDTO>(noteDisplayed);

  //TODO: Do not recreate this function for every note.
  const deleteComment = async (): Promise<void> => {
    try {
      const response = await axiosCredentialInstance.delete(`/note/delete`, {
        data: { noteId: note.id },
      });

      switch (response.status) {
        case OK_RESPONSE_CODE:
          await refetchFunction();
          return;
        default:
          return;
      }
    } catch (error) {
      // TODO: Add toast.
    }
  };

  const imagePath: string | undefined =
    arrangeImageAndReturns(note.user as ImageObject).image ?? undefined;

  const noteOwnerFormattedName = getFormattedNameAndSurname(note.user);
  const noteOwnerUsername = note.user.username;

  const handleLikeClick = async () => {
    let response: AxiosResponse<ResponseMessage> | null = null;
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
  };

  const verse: VerseCollectionDTO | VerseSimpleDTO = note.verse;

  const scriptureMeaning: string =
    verse.section.scripture.meanings.find((s) => s.language.langCode === "en")
      ?.meaning ?? "Scripture";

  const scriptureCode: AvailableScriptureKey = verse.section.scripture.code;

  const scriptureNameInOwnLanguage: string = verse.section.scripture.name;

  const sectionMeaning: string =
    verse.section.meanings.find((s) => s.language.langCode === "en")?.meaning ??
    "Section";

  const sectionNumber: number = verse.section.number;

  const sectionNameInOwnLanguage: string = verse.section.name;

  const chapterNumber: number = verse.chapterNumber;

  const verseNumber: number = verse.number;

  return (
    <Card className="border-none w-full">
      <CardHeader className=" flex items-center justify-between">
        <NEXTUIUserComponent
          classNames={{
            name: "text-sm font-semibold",
            description: "text-xs",
          }}
          avatarProps={{
            src: imagePath ?? undefined,
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
          <span className="text-xs">
            {formatDate(note.createdAt)}
            {note.updatedAt && ` (Updated: ${formatDate(note.updatedAt)})`}
          </span>

          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light" radius="full">
                <BsThreeDotsVertical size={14} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Comment actions">
              <DropdownItem key="profile" startContent={<FaUser size={13} />}>
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
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    startContent={<FaRegTrashAlt size={13} />}
                    onPress={deleteComment}
                  >
                    Delete
                  </DropdownItem>
                </DropdownSection>
              ) : null}
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>

      <CardBody>
        <Textarea value={note.noteText} isReadOnly />
      </CardBody>

      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            variant="light"
            radius="full"
            onPress={handleLikeClick}
          >
            <FaHeart
              size={16}
              className={`${
                note.isLiked ? "text-red-500" : "text-default-600"
              }`}
            />
          </Button>
          <span className="text-xs">{note.likeCount}</span>

          {/* 
          TODO: Should be activated whenever replying notes is implemented.
          <Button
        isIconOnly
        variant="light"
        radius="full"
      >
        <FaRegCommentAlt size={14} className="text-default-600" />
      </Button>
      <span className="text-xs text-foreground/90">{note.replyCount}</span> */}
        </div>
        <div className="ml-auto px-5">
          Attached on VerseDTO:{" "}
          <Link
            size="sm"
            href={`${scriptureCode}/${sectionNumber}/${chapterNumber}/${verseNumber}`}
          >
            {scriptureMeaning} ({scriptureNameInOwnLanguage}), {sectionMeaning}{" "}
            ({sectionNameInOwnLanguage}), Chapter {chapterNumber}, {verseNumber}{" "}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LikedNote;
