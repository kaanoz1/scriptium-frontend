import { Toast } from "@/types/types";
import { NextPage } from "next";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { SOMETHING_WENT_WRONG_TOAST } from "@/util/utils";
import { Spinner } from "@heroui/spinner";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, Key, useState } from "react";
import {
  T_AuthenticationRequestErrorCode,
  Response,
  ResponseMessage,
} from "@/types/response";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";
import { addToast } from "@heroui/toast";
import { UserFetchedDTO, UserOwnDTO } from "@/types/classes/User";
import {
  NoteOwnDTO,
  NoteOwnerDTO,
  NoteOwnerVerseDTO,
  T_NoteOwnerVerseDTOConstructorParametersJSON,
} from "@/types/classes/Note";
import {
  OK_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  isAuthenticationRequestErrorCode,
} from "@/util/constants";
import axios from "axios";
import { getErrorComponent } from "@/util/reactUtil";
import EditNoteComponent from "@/components/UI/EditNoteComponent";
import NoteOwnerVerse from "@/components/UI/NoteOwnerVerse";

interface Props {
  notesOfUser: UserFetchedDTO;
  user: UserOwnDTO;
  hasUserInspectingPermissionToContentOfUserInspected: boolean
}

const UserPageNotesTab: NextPage<Props> = ({ notesOfUser, user, hasUserInspectingPermissionToContentOfUserInspected }) => {
  const queryKey: readonly unknown[] = ["notes-of", notesOfUser.getId()];
  const queryClient = useQueryClient();
  const {
    data: notes = null,
    refetch,
    isLoading,
  } = useQuery<
    Array<NoteOwnerVerseDTO> | T_AuthenticationRequestErrorCode | null
  >({
    queryKey,
    queryFn: async () => await fetchUserNotes(notesOfUser),
    refetchInterval: 1000 * 60 * 60,
    enabled: hasUserInspectingPermissionToContentOfUserInspected
  });

  const [editNote, setEditNote] = useState<NoteOwnDTO | null>(null);

  const renderCell = useCallback(
    (item: NoteOwnerVerseDTO, columnKey: Key) => {
      switch (columnKey) {
        case "note":
          return (
            <NoteOwnerVerse
              note={item}
              user={user}
              stateControlFunctionForSetEditNote={setEditNote}
              handleNoteDelete={async () =>
                await deleteNoteAndUpdateQuery(item, queryClient, queryKey)
              }
              toggleNoteLike={async () =>
                await toggleNoteLikeAndUpdateQuery(item, queryKey, queryClient)
              }
              showVerse
            />
          );
        default:
          return null;
      }
    },
    [refetch, user]
  );

  if (isLoading) <LoadingSpinner />;

  if (notes === null || isAuthenticationRequestErrorCode(notes))
    return getErrorComponent({ code: notes });

  return (
    <div>
      {editNote && (
        <EditNoteComponent
          note={editNote}
          stateControlFunctionOfEditNote={setEditNote}
          queryKey={queryKey}
          user={user}
        />
      )}

      <Table aria-label="Table with client async pagination">
        <TableHeader>
          <TableColumn
            key="note"
            className="text-lg font-semibold flex items-center"
          >
            {`${notesOfUser.getUsername()}'s notes:`}
          </TableColumn>
        </TableHeader>

        <TableBody
          emptyContent={
            notes?.length === 0 ? "This user has no notes to show." : undefined
          }
          items={notes}
          loadingContent={<Spinner />}
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item.getId()}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserPageNotesTab;

const fetchUserNotes = async (
  noteOfUser: UserFetchedDTO
): Promise<Array<NoteOwnerVerseDTO> | T_AuthenticationRequestErrorCode> => {
  try {
    const response = await axiosCredentialInstance.get<
      Response<Array<T_NoteOwnerVerseDTOConstructorParametersJSON>>
    >(`/user/notes/${noteOfUser.getId()}`);

    if (response.status === OK_HTTP_RESPONSE_CODE)
      return response.data.data.map(NoteOwnerVerseDTO.createFromJSON);

    throw new Error("Unexpected result. Status: " + response.status);
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
        const notFoundToast: Toast = {
          title: "404 Not found!",
          description: "There is no found on that user.",
          color: "secondary",
        };
        console.error(error);
        addToast(notFoundToast);
        return NOT_FOUND_HTTP_RESPONSE_CODE;
      case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
        const tooManyRequestToast: Toast = {
          title: "You are using our sources too much!",
          description: "Slow down and try again later.",
          color: "warning",
        };
        addToast(tooManyRequestToast);
        return TOO_MANY_REQUEST_HTTP_RESPONSE_CODE;

      default:
        console.error(error);
        const unexpectedError: Toast = {
          title: "Something went unexpectedly wrong?",
          description: "We don't even know what the issue is. Check console.",
          color: "warning",
        };
        addToast(unexpectedError);
        return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
    }
  }
};

const deleteNoteAndUpdateQuery = async (
  note: NoteOwnDTO,
  queryClient: QueryClient,
  queryKey: readonly unknown[]
): Promise<void> => {
  try {
    const response = await axiosCredentialInstance.delete(`/note/delete`, {
      data: { noteId: note.getId() },
    });

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      addToast({ title: "Deleted!", color: "success" });

      queryClient.setQueryData<NoteOwnerDTO[]>(
        queryKey,
        (prev) => prev?.filter((n) => n.getId() !== note.getId()) ?? []
      );

      return;
    }

    throw new Error("Unexpected status: " + response.status);
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      console.error(error);
      addToast({
        title: "Unknown error",
        description: "An unexpected error occurred.",
        color: "danger",
      });
      return;
    }

    if (error.code === "ERR_NETWORK") {
      console.error(error);
      addToast({
        title: "Network Error",
        description: "Check your internet connection and try again.",
        color: "warning",
      });
      return;
    }

    switch (error.response?.status) {
      case NOT_FOUND_HTTP_RESPONSE_CODE:
        console.error(error);
        addToast({
          title: "Note not found",
          description:
            "Note might already be deleted or doesn't exist anymore.",
          color: "secondary",
        });
        return;

      case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
        addToast({
          title: "Too many requests",
          description: "Slow down and try again later.",
          color: "warning",
        });
        return;

      default:
        console.error(error);
        addToast({
          title: "Unexpected error",
          description:
            "Something went wrong while deleting the note. Check console for more details.",
          color: "warning",
        });
        return;
    }
  }
};
const toggleNoteLikeAndUpdateQuery = async (
  note: NoteOwnerDTO,
  queryKey: readonly unknown[],
  queryClient: QueryClient
): Promise<void> => {
  const isLiked = note.isNoteLiked();
  const noteId = note.getId();

  const updatedNote: NoteOwnerDTO = Object.assign(
    Object.create(Object.getPrototypeOf(note)),
    note
  );

  try {
    const response = isLiked
      ? await axiosCredentialInstance.delete<ResponseMessage>(
          `/like/unlike/note`,
          { data: { noteId } }
        )
      : await axiosCredentialInstance.post<ResponseMessage>(`/like/note`, {
          noteId,
        });

    const message = response.data.message.toLowerCase();

    if (message.includes("successfully liked")) {
      updatedNote.setIsNoteLiked(true);
      updatedNote.setLikeCount(note.getLikeCount() + 1);
      addToast({
        title: "Liked!",
        description: "You liked this note.",
        color: "success",
      });
    } else if (message.includes("successfully deleted")) {
      updatedNote.setIsNoteLiked(false);
      updatedNote.setLikeCount(Math.max(0, note.getLikeCount() - 1));
      addToast({
        title: "Unliked!",
        description: "You removed your like from this note.",
        color: "secondary",
      });
    } else {
      addToast({
        title: "Unexpected Response",
        description: message || "Server returned an unknown message.",
        color: "warning",
      });
    }

    queryClient.setQueryData<NoteOwnerDTO[]>(
      queryKey,
      (prev) => prev?.map((n) => (n.getId() === noteId ? updatedNote : n)) ?? []
    );
  } catch (error) {
    if (!axios.isAxiosError<ResponseMessage>(error)) {
      console.error(error);
      addToast({
        title: "Unexpected Error",
        description: "An unknown error occurred.",
        color: "danger",
      });
      return;
    }

    const status = error.response?.status;
    const message = error.response?.data?.message?.toLowerCase() ?? "";

    if (error.code === "ERR_NETWORK") {
      addToast({
        title: "Network Error",
        description: "We couldn’t reach the server. Check your internet.",
        color: "warning",
      });
      return;
    }

    switch (status) {
      case 400:
        addToast({
          title: "Invalid Request",
          description: message || "The request was invalid.",
          color: "danger",
        });
        break;

      case 401:
        addToast({
          title: "Unauthorized",
          description: message || "You must be logged in to like notes.",
          color: "danger",
        });
        break;

      case 403:
        addToast({
          title: "Permission Denied",
          description: message || "You are not allowed to like this note.",
          color: "danger",
        });
        break;

      case 404:
        if (isLiked && message.includes("no")) {
          // Zaten unlike edilmiş
          updatedNote.setIsNoteLiked(false);
          updatedNote.setLikeCount(Math.max(0, note.getLikeCount() - 1));
          addToast({
            title: "Already Unliked",
            description: "This note was already unliked.",
            color: "primary",
          });
        } else {
          addToast({
            title: "Note Not Found",
            description: "This note no longer exists.",
            color: "secondary",
          });
        }
        break;

      case 409:
        if (!isLiked && message.includes("already liked")) {
          // Zaten beğenilmiş
          updatedNote.setIsNoteLiked(true);
          updatedNote.setLikeCount(note.getLikeCount() + 1);
          addToast({
            title: "Already Liked",
            description: "You already liked this note.",
            color: "primary",
          });
        } else {
          addToast({
            title: "Conflict",
            description: message || "Conflict occurred.",
            color: "warning",
          });
        }
        break;

      case 429:
        addToast({
          title: "Too Many Requests",
          description: "You're acting too fast. Please wait.",
          color: "warning",
        });
        break;

      default:
        addToast({
          title: "Unexpected Error",
          description: message || "Something went wrong.",
          color: "danger",
        });
        break;
    }

    // 🔄 Her durumda queryClient güncellenir
    queryClient.setQueryData<NoteOwnerDTO[]>(
      queryKey,
      (prev) => prev?.map((n) => (n.getId() === noteId ? updatedNote : n)) ?? []
    );

    console.error(error);
  }
};
