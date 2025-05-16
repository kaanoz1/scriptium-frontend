import React, { Dispatch, FC, SetStateAction, useState } from "react";
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
  FaReply,
  FaUser,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  arrangeImageAndReturns,
  displayErrorToast,
  formatDate,
  handleCommentVerseLike,
  handleCommentVerseUnlike,
  OK_RESPONSE_CODE,
} from "@/util/utils";
import { RefetchDataFunctionType } from "@/types/types";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { AxiosResponse } from "axios";
import { ResponseMessage } from "@/types/response";
import ReplyingComment from "./ReplyingComment";
import { addToast } from "@heroui/toast";
import { CommentOwnerDTO, ParentCommentDTO } from "@/types/classes/Comment";
import { UserOwnDTO } from "@/types/classes/User";

interface Props {
  comment: CommentOwnerDTO;
  user: UserOwnDTO;
  parentComment?: ParentCommentDTO;
  refetch: RefetchDataFunctionType;
  showVerse?: boolean;
  stateFunctionOfCreateNewComment?:
    | Dispatch<SetStateAction<CommentOwnerDTO | null>>
    | Dispatch<SetStateAction<CommentDTOExtended | null>>;

  stateFunctionOfEditComment?:
    | Dispatch<SetStateAction<CommentDTO | CommentDTOExtended | null>>
    | Dispatch<SetStateAction<CommentDTOExtended | null>>;
}

const Comment: FC<Props> = ({
  comment: commentDisplayed,
  user,
  refetch,
  stateFunctionOfEditComment,
  stateFunctionOfCreateNewComment,
  parentComment,
  showVerse = false,
}) => {
  const [comment, setComment] = useState<CommentOwnerDTO>(commentDisplayed);

  const deleteComment = async () => {
    try {
      const response = await axiosCredentialInstance.delete(`/comment/delete`, {
        data: { commentId: comment.id },
      });

      switch (response.status) {
        case OK_RESPONSE_CODE:
          await refetch();

          const successToast: Toast = {
            title: "Success!",
            description: "Reflection has been deleted!",
            color: "success",
          };

          addToast(successToast);
          return;
        default:
          const couldnotDeletedToast: Toast = {
            title: "Reflection could not be deleted",
            description: "Reflection may be already deleted.",
            color: "warning",
          };
          addToast(couldnotDeletedToast);

          return;
      }
    } catch (error) {
      console.error(error);

      displayErrorToast(error);

      return;
    }
  };

  const handleLikeClick = async () => {
    let response: AxiosResponse<ResponseMessage> | null;
    if (comment.isLiked)
      response = await handleCommentVerseUnlike(comment.id, comment.verse);
    else response = await handleCommentVerseLike(comment.id, comment.verse);

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
  };

  const commentOwnerUsername = comment.user.username;
  const commentOwnerName = `${comment.user.name} ${
    comment.user.surname ?? ""
  }`.trim();

  const imageUrl = arrangeImageAndReturns(comment.getCreator()).image;

  const verse: VerseSimpleDTO = comment.verse;

  const scriptureMeaning: string =
    verse.chapter.section.scripture.meanings.find(
      (s) => s.language.langCode === "en"
    )?.meaning ?? "Scripture";

  const scriptureCode: AvailableScriptureKey =
    verse.chapter.section.scripture.code;

  const scriptureName: string = verse.chapter.section.scripture.name;

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
      {parentComment && (
        <ReplyingComment
          parentComment={{
            ...parentComment,
            user: arrangeImageAndReturns(
              parentComment.user as ImageObject
            ) as UserSimplified,
          }}
        />
      )}
      <CardHeader className="px-4 py-2 flex items-center justify-between">
        <NEXTUIUserComponent
          classNames={{
            name: "text-sm font-semibold",
            description: "text-xs",
          }}
          avatarProps={{
            src: imageUrl ?? undefined,
            size: "sm",
          }}
          name={commentOwnerName}
          description={
            <Link href={`/user/${commentOwnerUsername}`} size="sm">
              @{commentOwnerUsername}
            </Link>
          }
        />

        <div className="flex items-center gap-3">
          <FaClock size={15} />
          <span className="text-xs text-foreground/50">
            {formatDate(comment.createdAt)}
            {comment.updatedAt &&
              ` (Updated: ${formatDate(comment.updatedAt)})`}
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
                  <BsThreeDotsVertical size={14} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Comment actions">
                {stateFunctionOfCreateNewComment ? (
                  <DropdownItem
                    key="reply"
                    startContent={<FaReply size={13} />}
                    onPress={() => stateFunctionOfCreateNewComment(comment)}
                  >
                    Reply
                  </DropdownItem>
                ) : null}
                <DropdownItem key="profile" startContent={<FaUser size={13} />}>
                  <Link
                    href={`/user/${commentOwnerUsername}`}
                    isExternal
                    size="sm"
                    color="foreground"
                    className="px-1"
                  >
                    Go to user profile
                  </Link>
                </DropdownItem>
                {user.id === comment.getCreator().getId() ? (
                  <DropdownSection showDivider aria-label="Actions">
                    {stateFunctionOfEditComment ? (
                      <DropdownItem
                        key="edit"
                        startContent={<FaEdit size={13} />}
                        onPress={() => stateFunctionOfEditComment(comment)}
                      >
                        Edit
                      </DropdownItem>
                    ) : null}
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
          )}
        </div>
      </CardHeader>

      <CardBody className="px-4 py-2 text-sm">{comment.getText()}</CardBody>

      <CardFooter className="px-4 py-2 flex items-center justify-between">
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

        {stateFunctionOfCreateNewComment && (
          <Button
            isIconOnly
            variant="light"
            radius="full"
            className="data-[hover]:bg-foreground/10"
            onPress={() => stateFunctionOfCreateNewComment(comment)}
          >
            <FaReply size={14} className="text-default-600" />
          </Button>
        )}
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

export default Comment;
