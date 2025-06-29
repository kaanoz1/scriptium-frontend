import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { SOMETHING_WENT_WRONG_TOAST } from "@/util/utils";
import { Button } from "@heroui/button";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import NoteInformationModal from "../../../components/NoteInformationModal";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import NoteOwn from "../../../components/UI/NoteOwn";
import {
  Response,
  ResponseMessage,
  T_AuthenticationRequestErrorCode,
} from "@/types/response";
import { UserOwnDTO } from "@/types/classes/User";
import {
  NoteOwnDTO,
  NoteOwnVerseDTO,
  T_NoteOwnVerseDTOConstructorParametersJSON,
} from "@/types/classes/Note";
import { addToast } from "@heroui/toast";
import axios from "axios";
import { getErrorComponent } from "@/util/reactUtil";
import {
  isAuthenticationRequestErrorCode,
  OK_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import EditNoteComponent from "@/components/UI/EditNoteComponent";

interface Props {
  user: UserOwnDTO;
}

const UserSettingsNote: NextPage<Props> = ({ user }) => {
  const [isInformationModalOpen, setIsInformationModalOpen] =
    useState<boolean>(false);

  const [editNote, setEditNote] = useState<NoteOwnDTO | null>(null);

  const queryClient = useQueryClient();
  const queryKey: readonly unknown[] = ["notes"];

  const { data: notes = null, isLoading } = useQuery<
    Array<NoteOwnVerseDTO> | T_AuthenticationRequestErrorCode | null
  >({
    queryKey: queryKey,
    queryFn: fetchNotes,
  });

  if (isLoading) return <LoadingSpinner />;

  if (notes == null || isAuthenticationRequestErrorCode(notes))
    return getErrorComponent({ code: notes });

  return (
    <main className="space-y-6 w-full">
      <h2 className="font-semibold text-base mb-4 flex justify-between">
        Notes
        <div className="flex gap-2">
          <Button
            isIconOnly
            variant="light"
            color="primary"
            onPress={() => setIsInformationModalOpen(true)}
          >
            <IoIosInformationCircleOutline size={19} />
          </Button>
        </div>
      </h2>

      {editNote && (
        <EditNoteComponent
          note={editNote}
          user={user}
          stateControlFunctionOfEditNote={setEditNote}
          queryKey={queryKey}
        />
      )}

      {notes.length === 0 && (
        <div className="flex justify-center items-center text-sm py-10">
          No notes yet.
        </div>
      )}

      {notes.map((n) => (
        <NoteOwn
          key={`note-${n.getId()}`}
          note={n}
          user={user}
          deleteNote={async () =>
            await deleteNoteAndUpdateQuery(n, queryClient, queryKey)
          }
          setEditNote={setEditNote}
          toggleNoteLike={async () =>
            await toggleNoteLikeAndUpdateQuery(n, queryClient, queryKey)
          }
        />
      ))}

      <NoteInformationModal
        isModalOpen={isInformationModalOpen}
        setIsModalOpen={setIsInformationModalOpen}
      />
    </main>
  );
};

export default UserSettingsNote;

const fetchNotes = async () => {
  try {
    const response = await axiosCredentialInstance.get<
      Response<Array<T_NoteOwnVerseDTOConstructorParametersJSON>>
    >(`/note/notes`);
    if (response.status === OK_HTTP_RESPONSE_CODE)
      return response.data.data.map(NoteOwnVerseDTO.createFromJSON);
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

      queryClient.setQueryData<NoteOwnVerseDTO[]>(
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
      case OK_HTTP_RESPONSE_CODE:
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
  note: NoteOwnVerseDTO,
  queryClient: QueryClient,
  queryKey: readonly unknown[]
): Promise<void> => {
  const isLiked = note.isNoteLiked();
  const noteId = note.getId();

  const updatedNote: NoteOwnVerseDTO = Object.assign(
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

    queryClient.setQueryData<NoteOwnVerseDTO[]>(
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

    queryClient.setQueryData<NoteOwnVerseDTO[]>(
      queryKey,
      (prev) => prev?.map((n) => (n.getId() === noteId ? updatedNote : n)) ?? []
    );

    console.error(error);
  }
};
