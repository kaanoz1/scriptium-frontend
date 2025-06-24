import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {
  T_AuthenticationRequestErrorCode,
  Response,
  ResponseMessage,
} from "@/types/response";
import {
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  isAuthenticationRequestErrorCode,
  likeCommentAttachedToEntityAndReturnResponse,
  OK_HTTP_RESPONSE_CODE,
  SOMETHING_WENT_WRONG_TOAST,
  unlikeCommentAttachedToEntityAndReturnResponse,
} from "@/util/utils";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { addToast } from "@heroui/toast";
import { UserFetchedDTO, UserOwnDTO } from "@/types/classes/User";
import {
  CommentBaseDTO,
  CommentOwnerNoteDTO,
  CommentOwnerVerseDTO,
  T_CommentOwnerNoteDTOConstructorParametersJSON,
  T_CommentOwnerVerseDTOConstructorParametersJSON,
} from "@/types/classes/Comment";
import axios, { AxiosResponse } from "axios";
import { getErrorComponent } from "@/util/reactUtil";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Tab, Tabs } from "@heroui/tabs";
import { NoteOwnDTO } from "@/types/classes/Note";
import { VerseBaseDTO } from "@/types/classes/Verse";
import UserPageReflectionsTabVerseComments from "./UserPageReflectionsTabVerseComments";
import UserPageReflectionsTabNoteComments from "./UserPageReflectionsTabNoteComments";

interface Props {
  userInspected: UserFetchedDTO;
  user: UserOwnDTO;
}

const UserPageReflectionsTab: NextPage<Props> = ({ userInspected }) => {
  const { data: helper = null, isLoading } = useQuery<
    CommentHelper | T_AuthenticationRequestErrorCode | null
  >({
    queryKey: ["commentOfUser", userInspected.getId()],
    queryFn: async () => await fetchUserComments(userInspected),
    refetchInterval: 1000 * 60,
  });

  if (helper == null || isAuthenticationRequestErrorCode(helper))
    return getErrorComponent({ code: helper });

  if (isLoading) return <LoadingSpinner />;

  const verseComments = helper.getVerseComments();
  const noteComments = helper.getNoteComments();

  return (
    <Tabs>
      <Tab>
        <UserPageReflectionsTabVerseComments
          comments={verseComments}
          userInspected={userInspected}
          toggleLike={toggleLike}
          isLoading={isLoading}
        />
      </Tab>
      <Tab>
        <UserPageReflectionsTabNoteComments
          comments={noteComments}
          userInspected={userInspected}
          toggleLike={toggleLike}
          isLoading={isLoading}
        />
      </Tab>
    </Tabs>
  );
};

export default UserPageReflectionsTab;

class CommentHelper {
  private verseComments: Array<CommentOwnerVerseDTO>;
  private noteComments: Array<CommentOwnerNoteDTO>;
  constructor(
    verseComments: Array<T_CommentOwnerVerseDTOConstructorParametersJSON>,
    noteComments: Array<T_CommentOwnerNoteDTOConstructorParametersJSON>
  ) {
    this.verseComments = verseComments.map(CommentOwnerVerseDTO.createFromJSON);
    this.noteComments = noteComments.map(CommentOwnerNoteDTO.createFromJSON);
  }

  getVerseComments(): Array<CommentOwnerVerseDTO> {
    return this.verseComments;
  }

  getNoteComments(): Array<CommentOwnerNoteDTO> {
    return this.noteComments;
  }
}

const fetchUserComments = async (
  commentsOfUser: UserFetchedDTO
): Promise<CommentHelper | T_AuthenticationRequestErrorCode> => {
  try {
    const userId = commentsOfUser.getId();

    const response = await axiosCredentialInstance.get<
      Response<T_CommentsPageResponseType>
    >(`/user/comments/${userId}`);

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
      !isAuthenticationRequestErrorCode(error.response.status)
    )
      return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;

    return error.response.status;
  }
};

type T_CommentsPageResponseType = {
  verseComments: Array<T_CommentOwnerVerseDTOConstructorParametersJSON>;
  noteComments: Array<T_CommentOwnerNoteDTOConstructorParametersJSON>;
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
