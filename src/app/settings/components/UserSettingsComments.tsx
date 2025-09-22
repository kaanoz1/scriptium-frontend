import {
  T_AuthenticationRequestErrorCode,
  Response,
  ResponseMessage,
} from "@/types/response";

import {
  likeCommentAttachedToEntityAndReturnResponse,
  unlikeCommentAttachedToEntityAndReturnResponse,
} from "@/util/utils";
import { NextPage } from "next";
import { useState } from "react";
import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import {
  CommentBase,
  CommentOwn,
  CommentOwnNote,
  CommentOwnVerse,
  T_CommentOwnNoteConstructorParametersJSON,
  T_CommentOwnVerseConstructorParametersJSON,
} from "@/types/classes/model/Comment/Comment";
import axios, { AxiosResponse } from "axios";
import { addToast } from "@heroui/toast";
import { getErrorComponent } from "@/util/reactUtil";
import { Tab, Tabs } from "@heroui/tabs";
import UserSettingsCommentsTabVerseComments from "./UserSettingsCommentsTabVerseComments";
import UserSettingsCommentsTabNoteComments from "./UserSettingsCommentsTabNoteComments";
import {
  OK_HTTP_RESPONSE_CODE,
  isNoAuthenticationRequestErrorCode,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  SOMETHING_WENT_WRONG_TOAST,
} from "@/util/constants";
import EditCommentComponent from "@/components/comment/EditCommentComponent";
import { UserOwn } from "@/types/classes/model/User/User";
import { VerseBase } from "@/types/classes/model/Verse/VerseBase/VerseBase";
import { isAuthenticationRequestErrorCode } from "@/util/func";
import { NoteOwn } from "@/types/classes/model/Note/NoteOwn/NoteOwn";

interface Props {
  user: UserOwn;
}

const UserSettingsComments: NextPage<Props> = ({ user }) => {
  const [editComment, setEditComment] = useState<CommentOwn | null>(null);

  const queryKey = ["commentsOwn", user.getId()];

  const { data: comments = null, isLoading } = useQuery<
    CommentHelper | T_AuthenticationRequestErrorCode | null
  >({
    queryKey,
    queryFn: fetchComments,
  });

  if (comments == null || isAuthenticationRequestErrorCode(comments))
    return getErrorComponent({ code: comments });

  if (isLoading) return <LoadingSpinner />;

  const verseComments = comments.getVerseComments();
  const noteComments = comments.getNoteComments();

  return (
    <div className="flex flex-col items-center py-10 px-4 min-h-screen bg-white dark:bg-neutral-900/80">
      {editComment && (
        <EditCommentComponent
          comment={editComment}
          user={user}
          stateControlFunctionOfEditComment={setEditComment}
          queryKey={queryKey}
        />
      )}

      <Tabs>
        <Tab>
          <UserSettingsCommentsTabVerseComments
            comments={verseComments}
            user={user}
            setEditComment={setEditComment}
            isLoading={isLoading}
            toggleLike={toggleLike}
          />
        </Tab>
        <Tab>
          <UserSettingsCommentsTabNoteComments
            comments={noteComments}
            user={user}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserSettingsComments;

type T_CommentsPageResponseType = {
  verseComments: Array<T_CommentOwnVerseConstructorParametersJSON>;
  noteComments: Array<T_CommentOwnNoteConstructorParametersJSON>;
};

class CommentHelper {
  private verseComments: Array<CommentOwnVerse>;
  private noteComments: Array<CommentOwnNote>;
  constructor(
    verseComments: Array<T_CommentOwnVerseConstructorParametersJSON>,
    noteComments: Array<T_CommentOwnNoteConstructorParametersJSON>
  ) {
    this.verseComments = verseComments.map(CommentOwnVerse.createFromJSON);
    this.noteComments = noteComments.map(CommentOwnNote.createFromJSON);
  }

  getVerseComments(): Array<CommentOwnVerse> {
    return this.verseComments;
  }

  getNoteComments(): Array<CommentOwnNote> {
    return this.noteComments;
  }
}

const fetchComments = async (): Promise<
  CommentHelper | T_AuthenticationRequestErrorCode
> => {
  try {
    const response = await axiosCredentialInstance.get<
      Response<T_CommentsPageResponseType>
    >(`/comment/`);

    if (response.status === OK_HTTP_RESPONSE_CODE)
      return new CommentHelper(
        response.data.data.verseComments,
        response.data.data.noteComments
      );

    throw new Error("Unexpected result. Status: " + response.status);
  } catch (error) {
    addToast(SOMETHING_WENT_WRONG_TOAST);
    console.error(error);

    if (
      !axios.isAxiosError(error) ||
      !error.response ||
      !isNoAuthenticationRequestErrorCode(error.response.status)
    )
      return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;

    return error.response.status;
  }
};

const toggleLike = async (
  comment: CommentBase,
  entity: NoteOwn | VerseBase
) => {
  let response: AxiosResponse<ResponseMessage> | null;

  const entityId = entity.getId();
  const isLiked = comment.isCommentLiked();

  if (isLiked)
    response = await likeCommentAttachedToEntityAndReturnResponse(
      comment,
      entityId
    );
  else
    response = await unlikeCommentAttachedToEntityAndReturnResponse(
      comment,
      entityId
    );

  switch (response.data.message) {
    case "You have successfully liked the comment!":
      return;
    case "Like that attached this comment is successfully deleted.":
      return;

    default:
      return;
  }
};
