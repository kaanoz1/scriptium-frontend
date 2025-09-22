"use client";

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
  FaEdit,
  FaHeart,
  FaRegCommentAlt,
  FaRegTrashAlt,
  FaReply,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  CommentOwn,
  CommentOwner,
} from "@/types/classes/model/Comment/Comment";
import { RefetchDataFunctionType } from "@/types/types";
import { UserOwn } from "@/types/classes/model/User/User";
import { formatDate } from "@/util/func";

interface Props {
  comment: CommentOwner;
  user: UserOwn;
  refetchDataFunction: RefetchDataFunctionType<unknown>;
  stateControlFunctionOfEditComment: Dispatch<
    SetStateAction<CommentOwn | null>
  >;
  stateControlFunctionOfSelectedComment: Dispatch<
    SetStateAction<CommentOwner | null>
  >;
  stateControlFunctionOfCreateNewComment: Dispatch<
    SetStateAction<CommentOwner | boolean>
  >;
  handleCommentDeleteAndUpdateQueryData: () => Promise<void>;
  toggleCommentLikeAndUpdateQueryData: () => Promise<void>;
}

const VersePageComment: FC<Props> = ({
  comment,
  user,
  handleCommentDeleteAndUpdateQueryData,
  stateControlFunctionOfEditComment,
  stateControlFunctionOfSelectedComment,
  stateControlFunctionOfCreateNewComment,
  toggleCommentLikeAndUpdateQueryData,
}) => {
  const isOwner = user.getId() === comment.getCreator().getId();
  const commentOwnerUsername = comment.getCreator().getUsername();
  const commentOwnerName = `${comment.getCreator().getName()} ${
    comment.getCreator().getSurname() ?? ""
  }`.trim();

  const updatedAt = comment.getUpdatedAt();
  const text = comment.getText();
  const createdAt = comment.getCreatedAt();

  return (
    <Card isBlurred shadow="none" className="border-none w-full">
      <CardHeader className="px-4 py-2 flex items-center justify-between">
        <NEXTUIUserComponent
          classNames={{ name: "text-sm font-semibold", description: "text-xs" }}
          avatarProps={{
            src: comment.getCreator().getImage() ?? "",
            size: "sm",
          }}
          name={commentOwnerName}
          description={
            <Link href={`/user/${commentOwnerUsername}`} size="sm">
              <strong>@{commentOwnerUsername}</strong>
            </Link>
          }
        />

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end text-right">
            <span className="text-xs text-foreground/50">
              {formatDate(createdAt)}
            </span>
            {updatedAt && (
              <span className="text-[10px] text-foreground/40 italic">
                updated {formatDate(updatedAt)}
              </span>
            )}
          </div>

          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light" radius="full">
                <BsThreeDotsVertical size={14} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Comment actions">
              {comment.getParentComment() && (
                <DropdownItem
                  textValue="Inspect"
                  key="inspect"
                  startContent={<FaSearch size={13} />}
                  onPress={() => stateControlFunctionOfSelectedComment(comment)}
                >
                  Inspect
                </DropdownItem>
              )}
              <DropdownItem
                textValue="Reply"
                key="reply"
                startContent={<FaReply size={13} />}
                onPress={() =>
                  stateControlFunctionOfCreateNewComment(comment ?? true)
                }
              >
                Reply
              </DropdownItem>
              <DropdownItem
                textValue="Go to user profile"
                key="profile"
                startContent={<FaUser size={13} />}
              >
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
              {isOwner ? (
                <DropdownSection showDivider aria-label="Actions">
                  <DropdownItem
                    textValue="Edit"
                    key="edit"
                    startContent={<FaEdit size={13} />}
                    onPress={() => stateControlFunctionOfEditComment(comment)}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    textValue="Delete"
                    key="delete"
                    className="text-danger"
                    color="danger"
                    startContent={<FaRegTrashAlt size={13} />}
                    onPress={handleCommentDeleteAndUpdateQueryData}
                  >
                    Delete
                  </DropdownItem>
                </DropdownSection>
              ) : null}
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>

      <CardBody className="px-4 py-2 text-sm">
        <p>{text}</p>
      </CardBody>

      <CardFooter className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            variant="light"
            radius="full"
            onPress={toggleCommentLikeAndUpdateQueryData}
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
          <span className="text-xs">{comment.getReplyCount()}</span>
        </div>

        <Button
          isIconOnly
          variant="light"
          radius="full"
          onPress={() =>
            stateControlFunctionOfCreateNewComment(comment ?? true)
          }
        >
          <FaReply size={14} className="text-default-600" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VersePageComment;
