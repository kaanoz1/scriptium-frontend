import React, { FC } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { User as NEXTUIUserComponent } from "@heroui/user";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { FaClock, FaHeart, FaRegCommentAlt } from "react-icons/fa";

import {
  DEFAULT_LANG_CODE,
  formatDate,
  getFormattedNameAndSurname,
} from "@/util/utils";
import ReplyingComment from "./ReplyingComment";
import { CommentOwnerVerseDTO } from "@/types/classes/Comment";
import { T_ScriptureCode } from "@/types/types";

interface Props {
  comment: CommentOwnerVerseDTO;
  showVerse?: boolean;
  toggleLike: () => Promise<void>;
}

const CommentOwn: FC<Props> = ({ comment, showVerse = false, toggleLike }) => {
  const user = comment.getCreator();
  const username = user.getUsername();

  const displayedName = getFormattedNameAndSurname(user);

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
          avatarProps={{
            src: imageUrl ?? "",
            size: "sm",
          }}
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
            Attached on VerseDTO:{" "}
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
