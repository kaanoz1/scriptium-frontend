// Updated: RecursiveComment.tsx — NO recursive nesting

import { Dispatch, FC, SetStateAction } from "react";
import VersePageComment from "./VersePageComment";
import { CommentOwnDTO, CommentOwnerDTO } from "@/types/classes/Comment";
import { UserOwnDTO } from "@/types/classes/User";
import { RefetchDataFunctionType } from "@/types/types";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/util/constants";
import { ResponseMessage } from "@/types/response";
import { addToast } from "@heroui/toast";
import axios from "axios";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { VerseBaseDTO } from "@/types/classes/Verse";

interface Props {
  comment: CommentOwnerDTO;
  allComments: CommentOwnerDTO[];
  queryKey: readonly unknown[];
  user: UserOwnDTO;
  verse: VerseBaseDTO;
  refetch: RefetchDataFunctionType<unknown>;
  stateControlFunctionOfEditComment: Dispatch<
    SetStateAction<CommentOwnDTO | null>
  >;
  stateControlFunctionOfSelectedComment: Dispatch<
    SetStateAction<CommentOwnerDTO | null>
  >;
  stateControlFunctionOfCreateNewComment: Dispatch<
    SetStateAction<CommentOwnerDTO | boolean>
  >;
}

const RecursiveComment: FC<Props> = ({
  comment,
  allComments,
  user,
  verse,
  refetch,
  stateControlFunctionOfEditComment,
  stateControlFunctionOfSelectedComment,
  stateControlFunctionOfCreateNewComment,
  queryKey,
}) => {
  const childComments = allComments.filter(
    (c) => c.getParentComment()?.getId() === comment.getId()
  );

  const queryClient = useQueryClient();

  return (
    <div className="space-y-2">
      <VersePageComment
        comment={comment}
        user={user}
        refetchDataFunction={refetch}
        stateControlFunctionOfEditComment={stateControlFunctionOfEditComment}
        stateControlFunctionOfSelectedComment={
          stateControlFunctionOfSelectedComment
        }
        stateControlFunctionOfCreateNewComment={
          stateControlFunctionOfCreateNewComment
        }
        handleCommentDeleteAndUpdateQueryData={async () =>
          await handleCommentDeleteAndUpdateQueryData(
            comment,
            queryKey,
            queryClient
          )
        }
        toggleCommentLikeAndUpdateQueryData={async () =>
          await toggleCommentLikeAndUpdateQueryData(
            comment,
            queryKey,
            queryClient,
            verse
          )
        }
      />

      {childComments.length > 0 && (
        <div className="pl-6 border-l-2 border-default-200 dark:border-default-100 ml-3 mt-2 space-y-2">
          {childComments.map((child) => (
            <VersePageComment
              key={child.getId()}
              comment={child}
              user={user}
              refetchDataFunction={refetch}
              stateControlFunctionOfEditComment={
                stateControlFunctionOfEditComment
              }
              stateControlFunctionOfSelectedComment={
                stateControlFunctionOfSelectedComment
              }
              stateControlFunctionOfCreateNewComment={
                stateControlFunctionOfCreateNewComment
              }
              handleCommentDeleteAndUpdateQueryData={async () =>
                await handleCommentDeleteAndUpdateQueryData(
                  child,
                  queryKey,
                  queryClient
                )
              }
              toggleCommentLikeAndUpdateQueryData={async () =>
                await toggleCommentLikeAndUpdateQueryData(
                  child,
                  queryKey,
                  queryClient,
                  verse
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecursiveComment;

const handleCommentDeleteAndUpdateQueryData = async (
  comment: CommentOwnerDTO,
  queryKey: readonly unknown[],
  queryClient: QueryClient
): Promise<void> => {
  try {
    const response = await axiosCredentialInstance.delete<ResponseMessage>(
      `/comment/delete`,
      {
        data: { commentId: comment.getId() },
      }
    );

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      queryClient.setQueryData<CommentOwnerDTO[]>(
        queryKey,
        (prev) => prev?.filter((c) => c.getId() !== comment.getId()) ?? []
      );

      addToast({
        title: "Comment deleted!",
        description: "Your comment has been successfully removed.",
        color: "success",
      });

      return;
    }

    throw new Error("Unexpected status: " + response.status);
  } catch (error) {
    if (!axios.isAxiosError<ResponseMessage>(error)) {
      console.error(error);
      addToast({
        title: "Unexpected Error!",
        description: "An unknown error occurred while deleting the comment.",
        color: "warning",
      });
      return;
    }

    if (error.code === "ERR_NETWORK") {
      addToast({
        title: "Network Error!",
        description:
          "Unable to connect to the server. Please check your internet connection.",
        color: "warning",
      });
      return;
    }

    switch (error.response?.status) {
      case 401:
        addToast({
          title: "Unauthorized!",
          description: "Please log in to delete your comment.",
          color: "danger",
        });
        break;

      case 404:
        addToast({
          title: "Comment Not Found!",
          description: "This comment may have already been deleted.",
          color: "secondary",
        });
        break;

      case 429:
        addToast({
          title: "Too Many Requests!",
          description: "You're deleting comments too fast. Please wait.",
          color: "warning",
        });
        break;

      default:
        addToast({
          title: "Error Deleting Comment",
          description: "Something went wrong during deletion.",
          color: "danger",
        });
        break;
    }

    console.error(error);
  }
};

const toggleCommentLikeAndUpdateQueryData = async (
  comment: CommentOwnerDTO,
  queryKey: readonly unknown[],
  queryClient: QueryClient,
  verse: VerseBaseDTO
): Promise<void> => {
  const isLiked = comment.isCommentLiked();
  const commentId = comment.getId();
  const verseId = verse.getId();

  const updatedComment: CommentOwnerDTO = Object.assign(
    Object.create(Object.getPrototypeOf(comment)),
    comment
  );

  try {
    const response = isLiked
      ? await axiosCredentialInstance.delete<ResponseMessage>(
          `/like/unlike/comment`,
          { data: { commentId, entityId: verseId } }
        )
      : await axiosCredentialInstance.post<ResponseMessage>(
          `/like/comment/verse`,
          { commentId, entityId: verseId }
        );

    const message = response.data.message.toLowerCase();

    if (message.includes("successfully liked")) {
      updatedComment.setIsLiked(true);
      updatedComment.setLikedCount(comment.getLikeCount() + 1);

      addToast({
        title: "Liked!",
        description: "You liked this comment.",
        color: "success",
      });
    } else if (message.includes("successfully deleted")) {
      updatedComment.setIsLiked(false);
      updatedComment.setLikedCount(Math.max(0, comment.getLikeCount() - 1));

      addToast({
        title: "Unliked!",
        description: "You removed your like from this comment.",
        color: "secondary",
      });
    } else {
      addToast({
        title: "Unexpected Server Response",
        description: message || "No response message returned.",
        color: "warning",
      });
    }

    queryClient.setQueryData<CommentOwnerDTO[]>(
      queryKey,
      (prev) =>
        prev?.map((c) => (c.getId() === commentId ? updatedComment : c)) ?? []
    );
  } catch (error) {
    if (!axios.isAxiosError<ResponseMessage>(error)) {
      console.error(error);
      addToast({
        title: "Unexpected Error!",
        description: "An unknown error occurred while updating your like.",
        color: "danger",
      });
      return;
    }

    const status = error.response?.status;
    const message = error.response?.data?.message?.toLowerCase() ?? "";

    if (error.code === "ERR_NETWORK") {
      addToast({
        title: "Network Error!",
        description:
          "We couldn’t reach the server. Please check your connection.",
        color: "warning",
      });
      return;
    }

    switch (status) {
      case 400:
        addToast({
          title: "Invalid Request!",
          description: message || "The request was not properly formatted.",
          color: "danger",
        });
        break;

      case 401:
        addToast({
          title: "Unauthorized!",
          description:
            message || "You must be logged in to like/unlike a comment.",
          color: "danger",
        });
        break;

      case 403:
        addToast({
          title: "Permission Denied!",
          description:
            message || "You don't have permission to perform this action.",
          color: "danger",
        });
        break;

      case 404:
        if (isLiked && message.includes("no")) {
          // ❗ Already unliked, update cache to reflect this
          updatedComment.setIsLiked(false);
          updatedComment.setLikedCount(Math.max(0, comment.getLikeCount() - 1));
          addToast({
            title: "Already Unliked!",
            description: "This comment was already unliked.",
            color: "primary",
          });
        } else {
          addToast({
            title: "Not Found!",
            description: message || "The comment was not found.",
            color: "warning",
          });
        }
        break;

      case 409:
        if (!isLiked && message.includes("already liked")) {
          // ❗ Already liked, update cache to reflect this
          updatedComment.setIsLiked(true);
          updatedComment.setLikedCount(comment.getLikeCount() + 1);
          addToast({
            title: "Already Liked!",
            description: "You already liked this comment.",
            color: "primary",
          });
        } else {
          addToast({
            title: "Conflict!",
            description: message || "Conflict occurred.",
            color: "warning",
          });
        }
        break;

      case 429:
        addToast({
          title: "Too Many Requests!",
          description: "You're clicking too fast. Please wait a moment.",
          color: "warning",
        });
        break;

      default:
        addToast({
          title: "Unexpected Error!",
          description:
            message || "Something went wrong while processing your request.",
          color: "danger",
        });
        break;
    }

    // 🔁 Mutlaka cache'i güncelle
    queryClient.setQueryData<CommentOwnerDTO[]>(
      queryKey,
      (prev) =>
        prev?.map((c) => (c.getId() === commentId ? updatedComment : c)) ?? []
    );

    console.error(error);
  }
};
