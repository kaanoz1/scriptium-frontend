import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { AuthenticationRequestErrorCode, Response } from "@/types/response";
import { CommentDTO, User, VerseDTO } from "@/types/types";
import {
  handleCommentVerseLike,
  handleCommentVerseUnlike,
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  TOO_MANY_REQUEST_RESPONSE_CODE,
} from "@/util/utils";

import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useState } from "react";

import TooManyRequestComponent from "../../../../../../components/UI/TooManyRequest";
import ServerErrorComponent from "../../../../../../components/UI/ServerErrorComponent";
import LoadingSpinner from "../../../../../../components/UI/LoadingSpinner";
import { Button } from "@heroui/button";
import { IoIosInformationCircleOutline } from "react-icons/io";
import CommentInformationModal from "../../../../../../components/UI/CommentInformationModal";
import { GoPlusCircle } from "react-icons/go";
import CreateCommentComponent from "../../../../../../components/UI/CreateCommentComponent";
import EditCommentComponent from "../../../../../../components/UI/EditCommentComponent";
import VersePageComment from "./VersePageComment";

interface Props {
  user: User;
  verse: VerseDTO;
}

function isCommentDTO(value: unknown): value is CommentDTO {
  return typeof value === "object" && value !== null && "id" in value;
}

const VersePageTabComments: NextPage<Props> = ({ verse, user }) => {
  const [error, setError] = useState<
    AuthenticationRequestErrorCode | undefined
  >(undefined);

  const [createNewComment, setCreateNewComment] = useState<
    CommentDTO | boolean
  >(false);

  const [editComment, setEditComment] = useState<CommentDTO | null>(null);

  const [isCommentInformationModalOpen, setIsCommentInformationModalOpen] =
    useState<boolean>(false);

  const [selectedComment, setSelectedComment] = useState<CommentDTO | null>(
    null
  );

  const {
    data: allComments = [],
    isLoading,
    refetch,
  } = useQuery<CommentDTO[]>({
    queryKey: ["comments", verse.id],
    queryFn: async () => await fetchComments(),
  });

  const fetchComments = async () => {
    const response = await axiosCredentialInstance.get<Response<CommentDTO[]>>(
      `/comment/verse/${verse.id}`
    );

    switch (response.status) {
      case OK_RESPONSE_CODE:
        setError(undefined);

        return response.data.data;
      default:
        setError(response.status as AuthenticationRequestErrorCode);
        return [];
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
    return <TooManyRequestComponent />;
  if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
    return <ServerErrorComponent />;

  const getChildComments = (commentId: number) =>
    allComments.filter((c) => c.parentCommentId === commentId);

  let topLevelComments: CommentDTO[] = [];
  let showTitle = "Reflections";

  if (!selectedComment)
    topLevelComments = allComments.filter((c) => c.parentCommentId == null);
  else {
    topLevelComments = [selectedComment];
    showTitle = "Replies for Selected Reflection:";
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-base mb-4 flex justify-between">
        {showTitle}
        <div className="flex gap-2">
          <Button
            isIconOnly
            variant="light"
            color="warning"
            onPress={() => setCreateNewComment((prev) => !prev)}
          >
            <GoPlusCircle size={19} />
          </Button>
          <Button
            isIconOnly
            variant="light"
            color="primary"
            onPress={() => setIsCommentInformationModalOpen(true)}
          >
            <IoIosInformationCircleOutline size={19} />
          </Button>
        </div>
      </h2>

      {createNewComment && (
        <CreateCommentComponent
          entityId={verse.id}
          entityType="verse"
          parentComment={
            isCommentDTO(createNewComment) ? createNewComment : undefined
          }
          user={user}
          refetchDataFunction={refetch}
          stateControlFunctionOfCreateNewComment={setCreateNewComment}
        />
      )}

      {editComment && (
        <EditCommentComponent
          comment={editComment}
          parentComment={allComments.find(
            (c) => c.id == editComment.parentCommentId
          )}
          user={user}
          stateControlFunctionOfEditComment={setEditComment}
          refetchDataFunction={refetch}
        />
      )}

      {topLevelComments.length === 0 && (
        <div className="flex justify-center items-center text-sm py-10">
          No reflections yet.
        </div>
      )}

      {topLevelComments.map((comment) => {
        const childComments = getChildComments(comment.id);

        return (
          <div key={comment.id} className="space-y-2">
            <VersePageComment
              stateControlFunctionOfEditComment={setEditComment}
              handleUnlikeCommentNote={handleCommentVerseUnlike}
              handleLike={handleCommentVerseLike}
              verse={verse}
              comment={comment}
              user={user}
              refetchDataFunction={refetch}
              stateControlFunctionOfSelectedComment={setSelectedComment}
              stateControlFunctionOfCreateNewComment={setCreateNewComment}
            />

            {childComments.length > 0 && (
              <div className="pl-10 mt-2 space-y-2">
                {childComments.map((child) => (
                  <VersePageComment
                    verse={verse}
                    stateControlFunctionOfEditComment={setEditComment}
                    handleUnlikeCommentNote={handleCommentVerseUnlike}
                    handleLike={handleCommentVerseLike}
                    refetchDataFunction={refetch}
                    key={child.id}
                    comment={child}
                    user={user}
                    stateControlFunctionOfSelectedComment={setSelectedComment}
                    stateControlFunctionOfCreateNewComment={setCreateNewComment}
                    isChild
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

      {selectedComment && (
        <div className="mt-4">
          <Button
            variant="light"
            onPress={() => setSelectedComment(null)}
            className="text-sm text-primary"
          >
            Go back to root reflections
          </Button>
        </div>
      )}

      <CommentInformationModal
        isModalOpen={isCommentInformationModalOpen}
        setModalOpen={setIsCommentInformationModalOpen}
      />
    </div>
  );
};

export default VersePageTabComments;
