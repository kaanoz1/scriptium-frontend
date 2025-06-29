// Refactored EditCommentComponent.tsx

import { Dispatch, FC, SetStateAction } from "react";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { ResponseMessage } from "@/types/response";
import { CommentOwnDTO } from "@/types/classes/Comment";
import { UserOwnDTO } from "@/types/classes/User";
import ReplyingComment from "./ReplyingComment";
import CommentForm from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]/components/CommentForm";
import { OK_HTTP_RESPONSE_CODE } from "@/util/constants";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import axios from "axios";

interface Props {
  comment: CommentOwnDTO;
  stateControlFunctionOfEditComment: Dispatch<
    SetStateAction<CommentOwnDTO | null>
  >;
  queryKey: readonly unknown[];
  user: UserOwnDTO;
}

const EditCommentComponent: FC<Props> = ({
  comment,
  user,
  queryKey,
  stateControlFunctionOfEditComment,
}) => {
  const parentComment = comment.getParentComment();

  const queryClient = useQueryClient();

  return (
    <section className="w-full flex flex-col gap-4">
      {parentComment && <ReplyingComment parentComment={parentComment} />}

      <CommentForm
        user={user}
        defaultText={comment.getText()}
        onSubmitComment={async (text: string) =>
          onSubmitComment(
            text,
            comment,
            queryKey,
            queryClient,
            stateControlFunctionOfEditComment
          )
        }
        onCancel={() => stateControlFunctionOfEditComment(null)}
        submitting={false} // optional: could be handled as state later
        placeholder="Update your reflection..."
      />
    </section>
  );
};

export default EditCommentComponent;
const onSubmitComment = async (
  newCommentText: string,
  comment: CommentOwnDTO,
  queryKey: readonly unknown[],
  queryClient: QueryClient,
  stateControlFunctionOfEditComment: (val: CommentOwnDTO | null) => void
): Promise<void> => {
  try {
    const commentId = comment.getId();

    const response = await axiosCredentialInstance.put<ResponseMessage>(
      `/comment/update`,
      {
        commentId,
        newCommentText,
      }
    );

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      const updatedComment: CommentOwnDTO = Object.assign(
        Object.create(Object.getPrototypeOf(comment)),
        comment
      );

      updatedComment.setText(newCommentText);

      queryClient.setQueryData<CommentOwnDTO[]>(
        queryKey,
        (prev) =>
          prev?.map((c) => (c.getId() === commentId ? updatedComment : c)) ?? []
      );

      addToast({
        title: "Updated!",
        description: "Your comment has been successfully updated.",
        color: "success",
      });

      stateControlFunctionOfEditComment(null);
      return;
    }

    throw new Error("Unexpected response status: " + response.status);
  } catch (error) {
    console.error(error);

    if (!axios.isAxiosError<ResponseMessage>(error)) {
      addToast({
        title: "Unexpected Error!",
        description: "An unknown error occurred while editing the comment.",
        color: "danger",
      });
      return;
    }

    if (error.code === "ERR_NETWORK") {
      addToast({
        title: "Network Error!",
        description:
          "Unable to reach the server. Please check your connection.",
        color: "warning",
      });
      return;
    }

    switch (error.response?.status) {
      case 401:
        addToast({
          title: "Unauthorized!",
          description: "You must be logged in to edit your comment.",
          color: "danger",
        });
        break;

      case 404:
        addToast({
          title: "Comment Not Found!",
          description: "The comment you're trying to update doesn't exist.",
          color: "secondary",
        });
        break;

      case 429:
        addToast({
          title: "Too Many Requests!",
          description: "You're editing too quickly. Please wait and try again.",
          color: "warning",
        });
        break;

      default:
        addToast({
          title: "Update Failed!",
          description: error.response?.data?.message ?? "Unknown error.",
          color: "danger",
        });
        break;
    }
  }
};
