import {
  T_AuthenticationRequestErrorCode,
  Response,
  ResponseMessage,
} from "@/types/response";

import {
  likeCommentAttachedToEntityAndReturnResponse,
  SOMETHING_WENT_WRONG_TOAST,
  unlikeCommentAttachedToEntityAndReturnResponse,
} from "@/util/utils";
import { NextPage } from "next";
import { SetStateAction, useState } from "react";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import EditCommentComponent from "../../../components/UI/EditCommentComponent";
import { UserOwnDTO } from "@/types/classes/User";
import {
  CommentBaseDTO,
  CommentOwnDTO,
  CommentOwnNoteDTO,
  CommentOwnVerseDTO,
  T_CommentOwnNoteDTOConstructorParametersJSON,
  T_CommentOwnVerseDTOConstructorParametersJSON,
} from "@/types/classes/Comment";
import axios, { AxiosResponse } from "axios";
import { addToast } from "@heroui/toast";
import { getErrorComponent } from "@/util/reactUtil";
import { Tab, Tabs } from "@heroui/tabs";
import UserSettingsCommentsTabVerseComments from "./UserSettingsCommentsTabVerseComments";
import UserSettingsCommentsTabNoteComments from "./UserSettingsCommentsTabNoteComments";
import {
  isAuthenticationRequestErrorCode,
  OK_HTTP_RESPONSE_CODE,
  isNoAuthenticationRequestErrorCode,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { NoteOwnDTO } from "@/types/classes/Note";
import { VerseBaseDTO } from "@/types/classes/Verse";

interface Props {
  user: UserOwnDTO;
}

const UserSettingsComments: NextPage<Props> = ({ user }) => {
  const [editComment, setEditComment] = useState<CommentOwnDTO | null>(null);

  const {
    data: comments = null,
    refetch,
    isLoading,
  } = useQuery<CommentHelper | T_AuthenticationRequestErrorCode | null>({
    queryKey: ["commentsOwn", user.getId()],
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
          refetchDataFunction={refetch}
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
  verseComments: Array<T_CommentOwnVerseDTOConstructorParametersJSON>;
  noteComments: Array<T_CommentOwnNoteDTOConstructorParametersJSON>;
};

class CommentHelper {
  private verseComments: Array<CommentOwnVerseDTO>;
  private noteComments: Array<CommentOwnNoteDTO>;
  constructor(
    verseComments: Array<T_CommentOwnVerseDTOConstructorParametersJSON>,
    noteComments: Array<T_CommentOwnNoteDTOConstructorParametersJSON>
  ) {
    this.verseComments = verseComments.map(CommentOwnVerseDTO.createFromJSON);
    this.noteComments = noteComments.map(CommentOwnNoteDTO.createFromJSON);
  }

  getVerseComments(): Array<CommentOwnVerseDTO> {
    return this.verseComments;
  }

  getNoteComments(): Array<CommentOwnNoteDTO> {
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
  comment: CommentBaseDTO,
  entity: NoteOwnDTO | VerseBaseDTO
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
