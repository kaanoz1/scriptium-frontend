"use client";
import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";
import { ResponseMessage } from "@/types/response";
import { Toast } from "@/types/types";
import { addToast } from "@heroui/toast";

import { CommentBase } from "@/types/classes/model/Comment/Comment";
import { NoteOwn } from "@/types/classes/model/Note/NoteOwn/NoteOwn";

export const likeCommentAttachedToEntityAndReturnResponse = async (
  comment: CommentBase,
  entityId: number
) => {
  const commentId = comment.getId();
  return await axiosCredentialInstance.post<ResponseMessage>(
    `/like/comment/verse`,
    { commentId, entityId }
  );
};

export const unlikeCommentAttachedToEntityAndReturnResponse = async (
  comment: CommentBase,
  entityId: number
) => {
  const commentId = comment.getId();

  return await axiosCredentialInstance.delete<ResponseMessage>(
    `/like/unlike/comment`,
    { data: { commentId, entityId } }
  );
};

export const handleNoteLike = async (note: NoteOwn) => {
  return await axiosCredentialInstance.post<ResponseMessage>(`/like/note`, {
    note: note.getId(),
  });
};

export const handleNoteUnlike = async (note: NoteOwn) => {
  return await axiosCredentialInstance.delete<ResponseMessage>(
    `/like/unlike/note`,
    { data: { noteId: note.getId() } }
  );
};

export const getErrorToast = (error: unknown, description?: string): Toast => {
  const toast: Toast = {
    title: "Error?",
    description:
      description ??
      "Something went wrong, please try again later. If persist, please report this situation.",
    color: "danger",
  };

  if (error instanceof Error) toast.description = error.message;

  return toast;
};

export const displayErrorToast = (error: unknown, description?: string) => {
  const errorToast: Toast = getErrorToast(error, description);
  addToast(errorToast);
};
