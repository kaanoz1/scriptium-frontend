import React, { Dispatch, FC, SetStateAction } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { User as NEXTUIUserComponent } from "@heroui/user";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/dropdown";
import { Link } from "@heroui/link";

import {
  FaClock,
  FaEdit,
  FaHeart,
  FaRegCommentAlt,
  FaRegTrashAlt,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import ReplyingComment from "./ReplyingComment";
import { CommentOwnVerse } from "@/types/classes/model/Comment/Comment";
import { T_ScriptureCode } from "@/types/types";
import { UserOwn } from "@/types/classes/model/User/User";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { formatDate } from "@/util/func";
import { CommentOwn as CommentOwnClass } from "@/types/classes/model/Comment/Comment";

interface Props {
  comment: CommentOwnVerse;
  user: UserOwn;
  showVerse?: boolean;
  deleteComment: () => Promise<void>;
  toggleLike: () => Promise<void>;
  setEditComment: Dispatch<SetStateAction<CommentOwnClass | null>>;
}

const CommentOwn: FC<Props> = ({
  comment,
  user,
  showVerse = false,
  toggleLike,
  deleteComment,
  setEditComment,
}) => {
  const username = user.getUsername();

  const displayedName = user.getFormattedName();

  const imageUrl = user.getImage();

  const verse = comment.getVerse();
  const chapter = verse.getChapter();
  const section = chapter.getSection();
  const scripture = section.getScripture();

  const scriptureMeaning: string =
    scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const scriptureCode: T_ScriptureCode = scripture.getCode();

  const scriptureName: string = scripture.getName();

  const sectionMeaning: string =
    section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const sectionNumber: number = section.getNumber();

  const sectionNameInOwnLanguage: string = section.getName();

  const chapterNumber: number = chapter.getNumber();

  const verseNumber: number = verse.getNumber();

  const parentComment = comment.getParentComment();

  const createdAt = comment.getCreatedAt();
  const updatedAt = comment.getUpdatedAt();

  return (
    <Card
      shadow="sm"
      className="border-none w-full bg-background/60 dark:bg-default-100/50"
    >
      {parentComment && <ReplyingComment parentComment={parentComment} />}

      <CardHeader className="px-4 py-2 flex items-center justify-between">
        <NEXTUIUserComponent
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
          name={displayedName}
          description={
            <Link href={`/user/${username}`} size="sm">
              @{username}
            </Link>
          }
        />

        <div className="flex items-center gap-3">
          <FaClock size={15} />
          <span className="text-xs text-foreground/50">
            {formatDate(createdAt)}
            {updatedAt && ` (Updated: ${formatDate(updatedAt)})`}
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
              <DropdownSection showDivider aria-label="Actions">
                <DropdownItem
                  key="edit"
                  startContent={<FaEdit size={13} />}
                  onPress={() => setEditComment(comment)}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={<FaRegTrashAlt size={13} />}
                  onPress={() => deleteComment()}
                >
                  Delete
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>

      <CardBody className="px-4 py-2 text-sm">{comment.getText()}</CardBody>

      <CardFooter className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            variant="light"
            radius="full"
            onPress={() => toggleLike()}
          >
            <FaHeart
              size={16}
              className={`${
                comment.isCommentLiked() ? "text-red-500" : "text-default-600"
              }`}
            />
          </Button>
          <span className="text-xs">{comment.getLikeCount()}</span>

          <Button isIconOnly variant="light" radius="full">
            <FaRegCommentAlt size={14} className="text-default-600" />
          </Button>
          <span>{comment.getReplyCount()}</span>
        </div>

        {showVerse && (
          <div className="ml-auto px-5">
            Attached on Verse:{" "}
            <Link
              size="sm"
              href={`${scriptureCode}/${sectionNumber}/${chapterNumber}/${verseNumber}`}
            >
              {scriptureMeaning} ({scriptureName}), {sectionMeaning} (
              {sectionNameInOwnLanguage}), Chapter {chapterNumber},{" "}
              {verseNumber}{" "}
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CommentOwn;
