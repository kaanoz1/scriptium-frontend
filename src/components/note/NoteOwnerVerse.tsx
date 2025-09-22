import { T_ScriptureCode } from "@/types/types";

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
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUser, FaHeart, FaRegCommentAlt } from "react-icons/fa";
import { NoteOwnerVerse as NoteOwnerVerseClass } from "@/types/classes/model/Note/NoteOwner/NoteOwnerVerse/NoteOwnerVerse";
import { ChapterUpperMean } from "@/types/classes/model/Chapter/ChapterMean/ChapterUpperMean/ChapterUpperMean";
import { ScriptureUpperMean } from "@/types/classes/model/Scripture/ScriptureMean/ScriptureUpperMean/ScriptureUpperMean";
import { SectionUpperMean } from "@/types/classes/model/Section/SectionMean/SectionUpperMean/SectionUpperMean";
import { UserOwn } from "@/types/classes/model/User/User";
import { VerseUpperMean } from "@/types/classes/model/Verse/VerseMean/VerseUpperMean/VerseUpperMean";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { formatDate } from "@/util/func";
import { NoteOwn } from "@/types/classes/model/Note/NoteOwn/NoteOwn";

interface Props {
  note: NoteOwnerVerseClass;
  user: UserOwn;
  handleNoteDelete: () => Promise<void>;
  toggleNoteLike: () => Promise<void>;
  stateControlFunctionForSetEditNote: Dispatch<SetStateAction<NoteOwn | null>>;
  showVerse?: boolean;
}

const NoteOwnerVerse: NextPage<Props> = ({
  note,
  user,
  handleNoteDelete,
  toggleNoteLike,
  stateControlFunctionForSetEditNote,
  showVerse = false,
}) => {
  const noteCreator = note.getCreator();
  const imageUrl = noteCreator.getImage();
  const noteOwnerFormattedName = noteCreator.getFormattedName();
  const noteOwnerUsername = noteCreator.getUsername();

  const verse: Readonly<VerseUpperMean> = note.getVerse();
  const chapter: Readonly<ChapterUpperMean> = verse.getChapter();
  const section: Readonly<SectionUpperMean> = chapter.getSection();
  const scripture: Readonly<ScriptureUpperMean> = section.getScripture();

  const scriptureMeaning: string =
    scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const scriptureCode: T_ScriptureCode = scripture.getCode();

  const scriptureNameInOwnLanguage: string = scripture.getName();

  const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
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
          avatarProps={
            imageUrl
              ? {
                  src: imageUrl,
                  size: "sm",
                }
              : {
                  size: "sm",
                }
          }
          name={noteOwnerFormattedName}
          description={
            <Link href={`/user/${noteOwnerUsername}`} size="sm">
              @{noteOwnerUsername}
            </Link>
          }
        />

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end text-right">
            <span className="text-xs text-foreground/50">
              {formatDate(noteCreatedAt)}
            </span>
            {noteUpdatedAt && (
              <span className="text-[10px] text-foreground/40 italic">
                updated {formatDate(noteUpdatedAt)}
              </span>
            )}
          </div>
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
            <DropdownMenu aria-label="Note actions">
              <DropdownItem
                key="page"
                textValue="Go to note page"
                startContent={<FaUser size={13} />}
              >
                <Link
                  href={`/user/${noteOwnerUsername}`}
                  isExternal
                  size="sm"
                  color="foreground"
                  className="px-1"
                >
                  Go to note page
                </Link>
              </DropdownItem>

              <DropdownItem
                key="profile"
                textValue="Go to user profile"
                startContent={<FaUser size={13} />}
              >
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

              {user.getId() === noteCreator.getId() ? (
                <DropdownItem
                  key="edit"
                  textValue="Edit note"
                  startContent={<FaRegCommentAlt size={13} />}
                  onPress={() => stateControlFunctionForSetEditNote(note)}
                >
                  Edit
                </DropdownItem>
              ) : null}

              {user.getId() === noteCreator.getId() ? (
                <DropdownItem
                  key="delete"
                  textValue="Delete note"
                  color="danger"
                  className="text-danger"
                  startContent={<FaHeart size={13} />}
                  onPress={handleNoteDelete}
                >
                  Delete
                </DropdownItem>
              ) : null}
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
            onPress={async () => await toggleNoteLike()}
          >
            <FaHeart
              size={16}
              className={`${
                note.isNoteLiked() ? "text-red-500" : "text-default-600"
              }`}
            />
          </Button>
          <span className="text-xs text-foreground/90">{noteLikeCount}</span>

          <Button
            isIconOnly
            variant="light"
            radius="full"
            className="data-[hover]:bg-foreground/10"
          >
            <FaRegCommentAlt size={14} className="text-default-600" />
          </Button>
          <span className="text-xs text-foreground/90">
            {note.getReplyCount()}
          </span>

          {showVerse && (
            <div className="ml-auto px-5">
              Attached on Verse:{" "}
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

export default NoteOwnerVerse;
