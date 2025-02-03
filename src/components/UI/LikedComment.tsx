import React, { FC, useState } from "react";
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
  FaHeart,
  FaRegCommentAlt,
  FaRegTrashAlt,
  FaUser,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  arrangeImageAndReturns,
  formatDate,
  getFormattedNameAndSurname,
  handleCommentVerseLike,
  handleCommentVerseUnlike,
  OK_RESPONSE_CODE,
} from "@/util/utils";
import {
  AvailableScriptureKey,
  ImageObject,
  LikedCommentDTO,
  RefetchDataFunctionType,
  User,
  VerseSimpleDTO,
} from "@/types/types";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { AxiosResponse } from "axios";
import { ResponseMessage } from "@/types/response";

interface Props {
  comment: LikedCommentDTO;
  user: User;
  refetchFunction: RefetchDataFunctionType;
}

const LikedComment: FC<Props> = ({
  comment: commentDisplayed,
  user,
  refetchFunction,
}) => {
  const [comment, setComment] = useState<LikedCommentDTO>(commentDisplayed);

  const deleteComment = async () => {
    try {
      const response = await axiosCredentialInstance.delete(`/comment/delete`, {
        data: { commentId: comment.id },
      });

      if (response.status === OK_RESPONSE_CODE) {
        await refetchFunction();
      } else {
        // TODO: Add toast.
      }
    } catch (error) {
      // TODO: Add toast.
    }
  };

  const handleLikeClick = async () => {
    let response: AxiosResponse<ResponseMessage> | null = null;

    try {
      if (comment.isLiked)
        response = await handleCommentVerseUnlike(comment.id, verse);
      else response = await handleCommentVerseLike(comment.id, verse);

      switch (response.data.message) {
        case "You have successfully liked the comment!":
          setComment((comment) => ({
            ...comment,
            isLiked: true,
            likeCount: comment.likeCount + 1,
          }));
          return;
        case "Like that attached this comment is successfully deleted.":
          setComment((comment) => ({
            ...comment,
            isLiked: false,
            likeCount: comment.likeCount - 1,
          }));
          return;

        default:
          return;
      }
    } catch (error) {
      //TODO: Add toast.
      console.error(error);
      return;
    }
  };

  const commentOwnerUsername = comment.user.username;
  const commentOwnerNameFormatted = getFormattedNameAndSurname(comment.user);
  const imagePath: string | undefined =
    arrangeImageAndReturns(comment.user as ImageObject).image ?? undefined;

  const verse: VerseSimpleDTO = comment.verse;

  const scriptureMeaning: string =
    verse.chapter.section.scripture.meanings.find(
      (s) => s.language.langCode === "en"
    )?.meaning ?? "Scripture";

  const scriptureCode: AvailableScriptureKey =
    verse.chapter.section.scripture.code;

  const scriptureNameInOwnLanguage: string =
    verse.chapter.section.scripture.name;

  const sectionMeaning: string =
    verse.chapter.section.meanings.find((s) => s.language.langCode === "en")
      ?.meaning ?? "Section";

  const sectionNumber: number = verse.chapter.section.number;

  const sectionNameInOwnLanguage: string = verse.chapter.section.name;

  const chapterNumber: number = verse.chapter.number;

  const verseNumber: number = verse.number;

  return (
    <Card
      shadow="sm"
      className="border-none w-full bg-background/60 dark:bg-default-100/50"
    >
      <CardHeader className="px-4 py-2 flex items-center justify-between">
        <NEXTUIUserComponent
          classNames={{
            name: "text-sm font-semibold",
            description: "text-xs",
          }}
          avatarProps={{
            src: imagePath,
            size: "sm",
          }}
          name={commentOwnerNameFormatted}
          description={
            <Link href={`/user/${commentOwnerUsername}`} size="sm">
              @{commentOwnerUsername}
            </Link>
          }
        />

        <div className="flex items-center gap-3">
          <span className="text-xs text-foreground/50">
            {formatDate(comment.createdAt)}
            {comment.updatedAt &&
              ` (Updated: ${formatDate(comment.updatedAt)})`}
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
                  href={`/user/${commentOwnerUsername}`}
                  isExternal
                  size="sm"
                  className="px-1"
                >
                  Go to user profile
                </Link>
              </DropdownItem>
              {user.id === comment.user.id ? (
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

      <CardBody className="px-4 py-2 text-sm">{comment.text}</CardBody>

      <CardFooter className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4 w-full">
          <Button
            isIconOnly
            variant="light"
            radius="full"
            onPress={handleLikeClick}
          >
            <FaHeart
              size={16}
              className={`${
                comment.isLiked ? "text-red-500" : "text-default-600"
              }`}
            />
          </Button>
          <span className="text-xs">{comment.likeCount}</span>

          <Button isIconOnly variant="light" radius="full">
            <FaRegCommentAlt size={14} className="text-default-600" />
          </Button>
          <span className="text-xs">{comment.replyCount}</span>

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
        </div>
      </CardFooter>
    </Card>
  );
};

export default LikedComment;
