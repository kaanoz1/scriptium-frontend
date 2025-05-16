import { ResponseMessage } from "@/types/response";
import { T_ValidScriptureCode } from "@/types/types";
import {
  formatDate,
  getFormattedNameAndSurname,
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
} from "@heroui/dropdown";
import { Link } from "@heroui/link";
import { User as HEROUIUserComponent } from "@heroui/user";
import { AxiosResponse } from "axios";
import { NextPage } from "next";
import { Dispatch, SetStateAction, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUser, FaHeart } from "react-icons/fa";
import { NoteOwnerDTO } from "@/types/classes/Note";
import { VerseUpperMeanDTO } from "@/types/classes/Verse";
import { ChapterUpperMeanDTO } from "@/types/classes/Chapter";
import { SectionUpperMeanDTO } from "@/types/classes/Section";
import { ScriptureUpperMeanDTO } from "@/types/classes/Scripture";

const handleLikeClick = async (
  note: NoteOwnerDTO,
  setStateActionFunctionForNote: Dispatch<SetStateAction<NoteOwnerDTO>>
) => {
  let response: AxiosResponse<ResponseMessage> | null = null;

  try {
    if (note.isNoteLiked()) response = await handleNoteUnlike(note);
    else response = await handleNoteLike(note);

    switch (response.data.message) {
      case "Note is successfully liked":
        note.setIsNoteLiked(true);
        note.setLikeCount(note.getLikeCount() + 1);

        setStateActionFunctionForNote(Object.create(note));
        return;
      case "Like that attached this note is successfully deleted.":
        note.setIsNoteLiked(false);
        note.setLikeCount(note.getLikeCount() - 1);
        setStateActionFunctionForNote(Object.create(note));
        return;

      default:
        return;
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

interface Props {
  note: NoteOwnerDTO;

  showVerse?: boolean;
}

const Note: NextPage<Props> = ({
  note: noteDisplayed,

  showVerse = false,
}) => {
  const [note, setNote] = useState<NoteOwnerDTO>(noteDisplayed);

  const noteCreator = note.getCreator();
  const imageUrl = noteCreator.getImage();
  const noteOwnerFormattedName = getFormattedNameAndSurname(noteCreator);
  const noteOwnerUsername = noteCreator.getUsername();

  const verse: Readonly<VerseUpperMeanDTO> = note.getVerse();
  const chapter: Readonly<ChapterUpperMeanDTO> = verse.getChapter();
  const section: Readonly<SectionUpperMeanDTO> = chapter.getSection();
  const scripture: Readonly<ScriptureUpperMeanDTO> = section.getScripture();

  const scriptureMeaning: string =
    scripture
      .getMeanings()
      .find((s) => s.getLanguage().getLangCode() === "en")
      ?.getText() ?? "Scripture";

  const scriptureCode: T_ValidScriptureCode = scripture.getCode();

  const scriptureNameInOwnLanguage: string = scripture.getName();

  const sectionMeaning =
    section
      .getMeanings()
      .find((s) => s.getLanguage().getLangCode() === "en")
      ?.getText() ?? "Section";

  const sectionNumber: number = section.getNumber();

  const sectionNameInOwnLanguage: string = section.getName();

  const chapterNumber: number = chapter.getNumber();

  const verseNumber: number = verse.getNumber();

  const noteText: string = note.getText();

  const noteCreatedAt: Readonly<Date> = note.getCreatedAt();

  const noteUpdatedAt: Readonly<Date> | null = note.getUpdatedAt();

  const noteLikeCount: number = note.getLikeCount();

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
            {formatDate(noteCreatedAt)}
            {noteUpdatedAt && ` (Updated: ${formatDate(noteUpdatedAt)})`}
          </span>
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="light"
                radius="full"
                className="data-[hover]:bg-foreground/10"
              >
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
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>

      <CardBody className="px-4 py-2 text-sm text-foreground/90">
        <p>{noteText}</p>
      </CardBody>

      <CardFooter className="flex items-center justify-between">
        <footer className="flex items-center gap-4 w-full">
          <Button
            isIconOnly
            variant="light"
            radius="full"
            className="data-[hover]:bg-foreground/10"
            onPress={async () => await handleLikeClick(note, setNote)}
          >
            <FaHeart
              size={16}
              className={`${
                note.isNoteLiked() ? "text-red-500" : "text-default-600"
              }`}
            />
          </Button>
          <span className="text-xs text-foreground/90">{noteLikeCount}</span>

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
