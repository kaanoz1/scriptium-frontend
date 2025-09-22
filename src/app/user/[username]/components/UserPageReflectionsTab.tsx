import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";
import {
  T_AuthenticationRequestErrorCode,
  Response,
  ResponseMessage,
} from "@/types/response";
import {
  likeCommentAttachedToEntityAndReturnResponse,
  unlikeCommentAttachedToEntityAndReturnResponse,
} from "@/util/utils";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { addToast } from "@heroui/toast";
import {
  CommentBase,
  CommentOwnerNote,
  CommentOwnerVerse,
  T_CommentOwnerNoteConstructorParametersJSON,
  T_CommentOwnerVerseConstructorParametersJSON,
} from "@/types/classes/model/Comment/Comment";
import axios, { AxiosResponse } from "axios";
import { getErrorComponent } from "@/util/reactUtil";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Tab, Tabs } from "@heroui/tabs";
import UserPageReflectionsTabVerseComments from "./UserPageReflectionsTabVerseComments";
import UserPageReflectionsTabNoteComments from "./UserPageReflectionsTabNoteComments";
import {
  OK_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  SOMETHING_WENT_WRONG_TOAST,
} from "@/util/constants";
import { UserFetched, UserOwn } from "@/types/classes/model/User/User";
import { VerseBase } from "@/types/classes/model/Verse/VerseBase/VerseBase";
import { isAuthenticationRequestErrorCode } from "@/util/func";
import { NoteOwn } from "@/types/classes/model/Note/NoteOwn/NoteOwn";

interface Props {
  userInspected: UserFetched;
  user: UserOwn;
}

const UserPageReflectionsTab: NextPage<Props> = ({ userInspected }) => {
  const { data: helper = null, isLoading } = useQuery<
    CommentHelper | T_AuthenticationRequestErrorCode | null
  >({
    queryKey: ["commentOfUser", userInspected.getId()],
    queryFn: async () => await fetchUserComments(userInspected),
    refetchInterval: 1000 * 60,
  });

  if (helper === null || isAuthenticationRequestErrorCode(helper))
    return getErrorComponent({ code: helper });

  if (isLoading) return <LoadingSpinner />;

  const verseComments = helper.getVerseComments();
  const noteComments = helper.getNoteComments();

  return (
    <div>
      <Tabs
        aria-label="User reflections"
        variant="underlined"
        color="primary"
        classNames={{ base: "flex", tabList: "w-full" }}
      >
        <Tab key="verse reflections" title="Verse reflections">
          <UserPageReflectionsTabVerseComments
            comments={verseComments}
            userInspected={userInspected}
            toggleLike={toggleLike}
            isLoading={isLoading}
          />
        </Tab>
        <Tab key="note reflections" title="Note reflections">
          <UserPageReflectionsTabNoteComments
            comments={noteComments}
            userInspected={userInspected}
            toggleLike={toggleLike}
            isLoading={isLoading}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserPageReflectionsTab;

class CommentHelper {
  private verseComments: Array<CommentOwnerVerse>;
  private noteComments: Array<CommentOwnerNote>;
  constructor(
    verseComments: Array<T_CommentOwnerVerseConstructorParametersJSON>,
    noteComments: Array<T_CommentOwnerNoteConstructorParametersJSON>
  ) {
    this.verseComments = verseComments.map(CommentOwnerVerse.createFromJSON);
    this.noteComments = noteComments.map(CommentOwnerNote.createFromJSON);
  }

  getVerseComments(): Array<CommentOwnerVerse> {
    return this.verseComments;
  }

  getNoteComments(): Array<CommentOwnerNote> {
    return this.noteComments;
  }
}

const fetchUserComments = async (
  commentsOfUser: UserFetched
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
  verseComments: Array<T_CommentOwnerVerseConstructorParametersJSON>;
  noteComments: Array<T_CommentOwnerNoteConstructorParametersJSON>;
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
