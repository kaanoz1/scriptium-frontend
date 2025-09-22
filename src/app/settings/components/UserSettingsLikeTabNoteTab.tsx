import { Column } from "@/types/types";
import { NextPage } from "next";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Key, useCallback, useState } from "react";

import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";
import {
  OK_HTTP_RESPONSE_CODE,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { addToast } from "@heroui/toast";
import axios from "axios";
import {
  Response,
  ResponseMessage,
  T_AuthenticationRequestErrorCode,
} from "@/types/response";
import { getErrorComponent } from "@/util/reactUtil";
import EditNoteComponent from "@/components/note/EditNoteComponent";
import NoteOwnComponent from "@/components/note/NoteOwn";
import {
  NoteOwnVerse,
  T_NoteOwnVerseConstructorParametersJSON,
} from "@/types/classes/model/Note/NoteOwn/NoteOwnVerse/NoteOwnVerse";
import { UserOwn } from "@/types/classes/model/User/User";
import { isAuthenticationRequestErrorCode } from "@/util/func";
import { NoteOwn } from "@/types/classes/model/Note/NoteOwn/NoteOwn";

interface Props {
  user: UserOwn;
}

const UserSettingsLikeTabNoteTab: NextPage<Props> = ({ user }) => {
  const queryClient = useQueryClient();

  const [editNote, setEditNote] = useState<NoteOwnVerse | null>(null);

  const queryKey: readonly unknown[] = ["liked-notes", user.getId()];

  const { data: notes = null, isLoading } = useQuery<
    NoteOwnVerse[] | T_AuthenticationRequestErrorCode
  >({
    queryKey,
    queryFn: fetchLikedNotes,
  });

  const renderCell = useCallback(
    (item: NoteOwnVerse, columnKey: Key) => {
      const note = item;

      switch (columnKey) {
        case "like":
          return (
            <NoteOwnComponent
              note={note}
              user={user}
              showVerse={true}
              deleteNote={async () =>
                await deleteNoteAndUpdateQuery(note, queryClient, queryKey)
              }
              setEditNote={setEditNote}
              toggleNoteLike={async () =>
                await toggleNoteLikeAndUpdateQuery(note, queryClient, queryKey)
              }
            />
          );

        default:
          return <></>;
      }
    },
    [user]
  );

  if (notes == null || isAuthenticationRequestErrorCode(notes))
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

      <Table aria-label="Liked Reflections Table" selectionMode="none">
        <TableHeader
          aria-label="Liked Reflections Table Header"
          columns={columns}
        >
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          aria-label="Liked Reflections Table Body"
          items={notes}
          emptyContent="You did not liked any notes."
        >
          {(item: NoteOwnVerse) => (
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

export default UserSettingsLikeTabNoteTab;

const deleteNoteAndUpdateQuery = async (
  note: NoteOwn,
  queryClient: QueryClient,
  queryKey: readonly unknown[]
): Promise<void> => {
  try {
    const response = await axiosCredentialInstance.delete(`/note/delete`, {
      data: { noteId: note.getId() },
    });

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      addToast({ title: "Deleted!", color: "success" });

      queryClient.setQueryData<NoteOwnVerse[]>(
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
  note: NoteOwnVerse,
  queryClient: QueryClient,
  queryKey: readonly unknown[]
): Promise<void> => {
  const isLiked = note.isNoteLiked();
  const noteId = note.getId();

  const updatedNote: NoteOwnVerse = Object.assign(
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

    queryClient.setQueryData<NoteOwnVerse[]>(
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

    queryClient.setQueryData<NoteOwnVerse[]>(
      queryKey,
      (prev) => prev?.map((n) => (n.getId() === noteId ? updatedNote : n)) ?? []
    );

    console.error(error);
  }
};

const columns: Array<Column> = [{ key: "like", label: "NOTE" }];

const fetchLikedNotes = async (): Promise<
  Array<NoteOwnVerse> | T_AuthenticationRequestErrorCode
> => {
  try {
    const response = await axiosCredentialInstance.get<
      Response<Array<T_NoteOwnVerseConstructorParametersJSON>>
    >("like/note");

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      return response.data.data.map(NoteOwnVerse.createFromJSON);
    }

    addToast({
      title: "Unexpected Response",
      description: `Server returned status code ${response.status}`,
      color: "warning",
    });

    throw new Error("Unexpected result. Status: " + response.status);
  } catch (error) {
    if (!axios.isAxiosError<ResponseMessage>(error)) {
      console.error(error);
      addToast({
        title: "Unknown Error",
        description: "An unexpected error occurred while fetching liked notes.",
        color: "danger",
      });
      return 500;
    }

    const status = error.response?.status;
    const message = error.response?.data?.message ?? "";

    if (error.code === "ERR_NETWORK") {
      addToast({
        title: "Network Error",
        description:
          "We couldn’t reach the server. Please check your internet connection.",
        color: "warning",
      });
      return 500;
    }

    switch (status) {
      case 401:
        addToast({
          title: "Unauthorized",
          description: "You need to log in to see liked notes.",
          color: "danger",
        });
        return 401;

      case 404:
        addToast({
          title: "No Liked Notes",
          description: "You haven't liked any notes yet.",
          color: "secondary",
        });
        return 404;

      case 429:
        addToast({
          title: "Too Many Requests",
          description: "You're sending requests too quickly. Please slow down.",
          color: "warning",
        });
        return 429;

      case 500:
        addToast({
          title: "Server Error",
          description: "An error occurred on the server.",
          color: "danger",
        });
        return 500;

      default:
        addToast({
          title: "Unexpected Error",
          description: message || "Something went wrong while fetching notes.",
          color: "danger",
        });
        return 500;
    }
  }
};
