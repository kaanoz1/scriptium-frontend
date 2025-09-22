import { FC, useState } from "react";
import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";
import { ResponseMessage } from "@/types/response";
import {
  CommentOwner,
  CommentOwnerVerse,
} from "@/types/classes/model/Comment/Comment";

import { RefetchDataFunctionType } from "@/types/types";
import ReplyingComment from "./ReplyingComment";
import CommentForm from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]/components/CommentForm";
import { addToast } from "@heroui/toast";
import axios from "axios";
import { UserOwn } from "@/types/classes/model/User/User";
import { VerseSimple } from "@/types/classes/model/Verse/VerseSimple/VerseSimple";
import { NoteOwn } from "@/types/classes/model/Note/NoteOwn/NoteOwn";

interface Props {
  user: UserOwn;
  entityType?: "verse" | "note";
  parentComment: CommentOwner | null;
  refetchDataFunction: RefetchDataFunctionType<unknown>;
  stateControlFunctionOfCreateNewComment: (
    val: CommentOwnerVerse | boolean
  ) => void;
  entity: NoteOwn | VerseSimple;
}

const CreateCommentComponent: FC<Props> = ({
  user,
  entityType = "verse",
  parentComment,
  refetchDataFunction,
  stateControlFunctionOfCreateNewComment,
  entity,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitComment = async (text: string) => {
    const parentCommentId = parentComment?.getId() ?? null;

    try {
      setIsLoading(true);
      const response = await axiosCredentialInstance.post<ResponseMessage>(
        `/comment/create/${entityType}`,
        {
          entityId: entity.getId(),
          commentText: text,
          parentCommentId,
        }
      );

      if (response.status === 200) {
        addToast({
          title: "Comment created successfully!",
          description: "Your comment has been posted.",
          color: "success",
        });

        await refetchDataFunction();
        stateControlFunctionOfCreateNewComment(false);
        return;
      }

      throw new Error("Unexpected status code: " + response.status);
    } catch (error) {
      if (!axios.isAxiosError<ResponseMessage>(error)) {
        addToast({
          title: "Something went wrong!",
          description: "An unexpected error occurred.",
          color: "warning",
        });
        console.error(error);
        return;
      }

      if (error.code === "ERR_NETWORK") {
        addToast({
          title: "Network Error!",
          description: "Please check your internet connection.",
          color: "warning",
        });
        console.error(error);
        return;
      }

      switch (error.response?.status) {
        case 401:
          addToast({
            title: "Unauthorized!",
            description: "Please log in to submit a comment.",
            color: "danger",
          });
          break;

        case 404:
          addToast({
            title: "Resource Not Found!",
            description: "The associated entity could not be found.",
            color: "secondary",
          });
          break;

        case 429:
          addToast({
            title: "Too many requests!",
            description: "You are commenting too frequently. Please slow down.",
            color: "warning",
          });
          break;

        case 400:
          addToast({
            title: "Invalid Comment",
            description:
              "Your comment could not be processed. Check your input.",
            color: "danger",
          });
          break;

        case 500:
          addToast({
            title: "Server Error!",
            description:
              "A server error occurred while submitting your comment.",
            color: "danger",
          });
          break;

        default:
          addToast({
            title: "Unexpected Error!",
            description: "Something went wrong while submitting your comment.",
            color: "warning",
          });
          break;
      }

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {parentComment && <ReplyingComment parentComment={parentComment} />}

      <CommentForm
        user={user}
        onSubmitComment={onSubmitComment}
        onCancel={() => stateControlFunctionOfCreateNewComment(false)}
        submitting={isLoading}
      />
    </div>
  );
};

export default CreateCommentComponent;
