"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { useQuery } from "@tanstack/react-query";
import { GoPlusCircle } from "react-icons/go";
import { IoIosInformationCircleOutline } from "react-icons/io";

import CreateCommentComponent from "../../../../../../components/comment/CreateCommentComponent";
import CommentInformationModal from "../../../../../../components/comment/CommentInformationModal";
import RecursiveComment from "./RecursiveComment";
import { getErrorComponent } from "@/util/reactUtil";
import {
  CommentOwn,
  CommentOwner,
  T_CommentOwnerConstructorParametersJSON,
} from "@/types/classes/model/Comment/Comment";
import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";
import {
  T_AuthenticationRequestErrorCode,
  ResponseMessage,
  Response,
} from "@/types/response";
import {
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  OK_HTTP_RESPONSE_CODE,
  SOMETHING_WENT_WRONG_TOAST,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  UNAUTHORIZED_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { addToast } from "@heroui/toast";
import axios from "axios";
import { Toast } from "@/types/types";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import EditCommentComponent from "@/components/comment/EditCommentComponent";
import { UserOwn } from "@/types/classes/model/User/User";
import { VerseSimple } from "@/types/classes/model/Verse/VerseSimple/VerseSimple";
import { isAuthenticationRequestErrorCode } from "@/util/func";
import { Verse } from "@/types/classes/model/Verse/Verse/Verse";

interface Props {
  user: UserOwn;
  verse: Verse;
}

const VersePageTabComments = ({ user, verse }: Props) => {
  const [selectedComment, setSelectedComment] = useState<CommentOwner | null>(
    null
  );
  const [createNewComment, setCreateNewComment] = useState<
    CommentOwner | boolean
  >(false);
  const [editComment, setEditComment] = useState<CommentOwn | null>(null);
  const [isCommentInformationModalOpen, setIsCommentInformationModalOpen] =
    useState(false);

  const queryKey: readonly unknown[] = [
    "comments",
    verse.getId(),
    user.getId(),
  ];

  const {
    data: comments = null,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: queryKey,
    queryFn: async () => await fetchComments(verse),
  });

  if (isLoading) return <LoadingSpinner />;
  if (comments === null || isAuthenticationRequestErrorCode(comments))
    return getErrorComponent({ code: comments });

  const filteredComments = selectedComment
    ? comments.filter(
        (c) => c.getParentComment()?.getId() === selectedComment.getId()
      )
    : comments.filter((c) => c.getParentComment() === null);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-base mb-4 flex justify-between">
        {selectedComment ? "Replies for Selected Reflection:" : "Reflections"}
        <div className="flex gap-2">
          <Button
            isIconOnly
            variant="light"
            color="warning"
            onPress={() => setCreateNewComment(selectedComment ?? true)}
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
          user={user}
          refetchDataFunction={refetch}
          entity={verse}
          parentComment={
            typeof createNewComment === "object" ? createNewComment : null
          }
          stateControlFunctionOfCreateNewComment={setCreateNewComment}
        />
      )}

      {editComment && (
        <EditCommentComponent
          comment={editComment}
          user={user}
          stateControlFunctionOfEditComment={setEditComment}
          queryKey={queryKey}
        />
      )}
      {filteredComments.length === 0 && (
        <div className="text-sm text-center py-10">No reflections yet.</div>
      )}

      {filteredComments.map((comment) => (
        <RecursiveComment
          key={comment.getId()}
          comment={comment}
          allComments={comments}
          verse={verse}
          user={user}
          refetch={refetch}
          stateControlFunctionOfCreateNewComment={setCreateNewComment}
          stateControlFunctionOfSelectedComment={setSelectedComment}
          stateControlFunctionOfEditComment={setEditComment}
          queryKey={queryKey}
        />
      ))}

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

const fetchComments = async (
  verse: VerseSimple
): Promise<Array<CommentOwner> | T_AuthenticationRequestErrorCode> => {
  try {
    const verseId = verse.getId();

    const response = await axiosCredentialInstance.get<
      Response<T_CommentOwnerConstructorParametersJSON[]>
    >(`/comment/verse/${verseId}`);

    if (response.status === OK_HTTP_RESPONSE_CODE)
      return response.data.data.map(CommentOwner.createFromJSON);

    throw new Error("Unexpected status: " + response.status);
  } catch (error) {
    if (!axios.isAxiosError<ResponseMessage>(error)) {
      addToast(SOMETHING_WENT_WRONG_TOAST);
      console.error(error);
      return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
    }

    if (error.code === "ERR_NETWORK") {
      const networkErrorToast: Toast = {
        title: "Network Error!",
        description:
          "We couldn’t connect to the server. Please check your internet or try again later.",
        color: "warning",
      };
      addToast(networkErrorToast);
      console.error(error);
      return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
    }

    switch (error.status) {
      case NOT_FOUND_HTTP_RESPONSE_CODE:
        addToast({
          title: "No Comments Found!",
          description: "We couldn't find any comments for this verse.",
          color: "secondary",
        });
        return NOT_FOUND_HTTP_RESPONSE_CODE;

      case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
        addToast({
          title: "Too many requests!",
          description:
            "You're sending requests too frequently. Try again later.",
          color: "warning",
        });
        return TOO_MANY_REQUEST_HTTP_RESPONSE_CODE;

      case UNAUTHORIZED_HTTP_RESPONSE_CODE:
        addToast({
          title: "You need to login.",
          description: "Please sign in to view or write comments.",
          color: "danger",
        });
        return UNAUTHORIZED_HTTP_RESPONSE_CODE;

      default:
        addToast({
          title: "Unexpected Error!",
          description: "An unknown error occurred while fetching comments.",
          color: "warning",
        });
        return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
    }
  }
};
