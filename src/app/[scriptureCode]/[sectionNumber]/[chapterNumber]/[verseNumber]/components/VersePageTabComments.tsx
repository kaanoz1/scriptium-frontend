// Refactored VersePageTabComments.tsx for comment flow

import { useState } from "react";
import { Button } from "@heroui/button";
import { useQuery } from "@tanstack/react-query";
import { GoPlusCircle } from "react-icons/go";
import { IoIosInformationCircleOutline } from "react-icons/io";

import CreateCommentComponent from "../../../../../../components/UI/CreateCommentComponent";
import CommentInformationModal from "../../../../../../components/UI/CommentInformationModal";
import LoadingSpinner from "../../../../../../components/UI/LoadingSpinner";
import RecursiveComment from "./RecursiveComment";
import { getErrorComponent } from "@/util/reactUtil";
import { UserOwnDTO } from "@/types/classes/User";
import { VerseDTO, VerseSimpleDTO } from "@/types/classes/Verse";
import {
  CommentOwnDTO,
  CommentOwnerDTO,
  T_CommentOwnerDTOConstructorParametersJSON,
} from "@/types/classes/Comment";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {
  T_AuthenticationRequestErrorCode,
  ResponseMessage,
  Response,
} from "@/types/response";
import {
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  isAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  OK_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  UNAUTHORIZED_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { SOMETHING_WENT_WRONG_TOAST } from "@/util/utils";
import { addToast } from "@heroui/toast";
import axios from "axios";
import { Toast } from "@/types/types";
import EditCommentComponent from "@/components/UI/EditCommentComponent";

interface Props {
  user: UserOwnDTO;
  verse: VerseDTO;
}

const VersePageTabComments = ({ user, verse }: Props) => {
  const [selectedComment, setSelectedComment] =
    useState<CommentOwnerDTO | null>(null);
  const [createNewComment, setCreateNewComment] = useState<
    CommentOwnerDTO | boolean
  >(false);
  const [editComment, setEditComment] = useState<CommentOwnDTO | null>(null);
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
  verse: VerseSimpleDTO
): Promise<Array<CommentOwnerDTO> | T_AuthenticationRequestErrorCode> => {
  try {
    const verseId = verse.getId();

    const response = await axiosCredentialInstance.get<
      Response<T_CommentOwnerDTOConstructorParametersJSON[]>
    >(`/comment/verse/${verseId}`);

    if (response.status === OK_HTTP_RESPONSE_CODE)
      return response.data.data.map(CommentOwnerDTO.createFromJSON);

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
