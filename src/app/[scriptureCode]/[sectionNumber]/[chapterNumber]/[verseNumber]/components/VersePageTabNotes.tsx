"use client";

import { Button } from "@heroui/button";
import { NextPage } from "next";
import { Dispatch, SetStateAction, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { IoIosInformationCircleOutline } from "react-icons/io";
import NoteInformationModal from "../../../../../../components/note/NoteInformationModal";
import CreateNoteComponent from "../../../../../../components/note/CreateNoteComponent";
import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";

import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Response,
  ResponseMessage,
  T_AuthenticationRequestErrorCode,
} from "@/types/response";

import {
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  OK_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { addToast } from "@heroui/toast";
import axios from "axios";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import TooManyRequest from "@/components/UI/TooManyRequest";
import EditNoteComponent from "@/components/note/EditNoteComponent";
import ServerError from "@/components/UI/ServerError";
import NoteOwnerComponent from "@/components/note/NoteOwner";
import {
  NoteOwner,
  T_NoteOwnerConstructorParametersJSON,
} from "@/types/classes/model/Note/NoteOwner/NoteOwner";
import { UserOwn } from "@/types/classes/model/User/User";
import { VerseBoth } from "@/types/classes/model/Verse/Verse/VerseBoth/VerseBoth";
import { VerseBase } from "@/types/classes/model/Verse/VerseBase/VerseBase";
import { NoteOwn } from "@/types/classes/model/Note/NoteOwn/NoteOwn";

interface Props {
  verse: VerseBoth;
  user: UserOwn;
}

const VersePageTabNotes: NextPage<Props> = ({ verse, user }) => {
  const [error, setError] = useState<
    T_AuthenticationRequestErrorCode | undefined
  >(undefined);

  const [createNewNote, setCreateNewNote] = useState<boolean>(false);
  const [editNote, setEditNote] = useState<NoteOwn | null>(null);

  const [isInformationModalOpen, setIsInformationModalOpen] =
    useState<boolean>(false);

  const queryKey: unknown[] = ["verse-notes", verse.getId()];

  const queryClient = useQueryClient();

  const {
    data: notes = [],
    isLoading,
    refetch,
  } = useQuery<NoteOwner[]>({
    queryKey,
    queryFn: async () => await fetchNotes(verse, setError),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error && error === TOO_MANY_REQUEST_HTTP_RESPONSE_CODE)
    return <TooManyRequest />;

  if (error && error === INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE)
    return <ServerError />;

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-base mb-4 flex justify-between">
        Notes
        <div className="flex gap-2">
          <Button
            isIconOnly
            variant="light"
            color="warning"
            onPress={() => setCreateNewNote(true)}
          >
            <GoPlusCircle size={19} />
          </Button>
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

      {createNewNote && (
        <CreateNoteComponent
          user={user}
          refetch={refetch}
          verse={verse}
          setCreateNewComment={setCreateNewNote}
        />
      )}

      {editNote && (
        <EditNoteComponent
          note={editNote}
          stateControlFunctionOfEditNote={setEditNote}
          queryKey={queryKey}
          user={user}
        />
      )}

      {notes.length === 0 && (
        <div className="flex justify-center items-center text-sm py-10">
          No notes yet.
        </div>
      )}

      {notes.map((n) => (
        <NoteOwnerComponent
          key={`note-${n.getId()}`}
          note={n}
          user={user}
          stateControlFunctionForSetEditNote={setEditNote}
          handleNoteDelete={async () =>
            await deleteNoteAndUpdateQuery(n, queryClient, queryKey)
          }
          toggleNoteLike={async () =>
            await toggleNoteLikeAndUpdateQuery(n, queryKey, queryClient)
          }
        />
      ))}

      <NoteInformationModal
        isModalOpen={isInformationModalOpen}
        setIsModalOpen={setIsInformationModalOpen}
      />
    </div>
  );
};

export default VersePageTabNotes;

const fetchNotes = async (
  verse: VerseBase,
  setStateActionFunctionForError: Dispatch<
    SetStateAction<T_AuthenticationRequestErrorCode | undefined>
  >
): Promise<NoteOwner[]> => {
  try {
    const response = await axiosCredentialInstance.get<
      Response<T_NoteOwnerConstructorParametersJSON[]>
    >(`/note/${verse.getId()}`);

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      setStateActionFunctionForError(undefined);
      return response.data.data.map(NoteOwner.createFromJSON);
    }

    setStateActionFunctionForError(INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE);
    addToast({
      title: "Unexpected Response",
      description: `Server responded with status code ${response.status}.`,
      color: "warning",
    });

    return [];
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      console.error(error);
      setStateActionFunctionForError(INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE);
      addToast({
        title: "Unknown Error",
        description: "An unknown error occurred while fetching notes.",
        color: "danger",
      });
      return [];
    }

    if (error.code === "ERR_NETWORK") {
      setStateActionFunctionForError(INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE);
      addToast({
        title: "Network Error",
        description:
          "Could not reach the server. Please check your connection.",
        color: "warning",
      });
      return [];
    }

    switch (error.response?.status) {
      case 401:
        setStateActionFunctionForError(error.response.status);
        addToast({
          title: "Unauthorized",
          description: "You must be logged in to view notes.",
          color: "danger",
        });
        break;

      case 404:
        setStateActionFunctionForError(error.response.status);
        addToast({
          title: "Verse Not Found",
          description: "The verse you're looking for does not exist.",
          color: "secondary",
        });
        break;

      case 429:
        setStateActionFunctionForError(TOO_MANY_REQUEST_HTTP_RESPONSE_CODE);
        addToast({
          title: "Too Many Requests",
          description:
            "You are sending requests too quickly. Please slow down.",
          color: "warning",
        });
        break;

      case 500:
        setStateActionFunctionForError(
          INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE
        );
        addToast({
          title: "Server Error",
          description: "A server error occurred while fetching notes.",
          color: "danger",
        });
        break;

      default:
        setStateActionFunctionForError(
          INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE
        );
        addToast({
          title: "Unexpected Error",
          description: `Something went wrong: ${
            error.response?.data?.message ?? "Unknown"
          }`,
          color: "danger",
        });
        break;
    }

    console.error(error);
    return [];
  }
};

const deleteNoteAndUpdateQuery = async (
  note: NoteOwn,
  queryClient: QueryClient,
  queryKey: unknown[]
): Promise<void> => {
  try {
    const response = await axiosCredentialInstance.delete(`/note/delete`, {
      data: { noteId: note.getId() },
    });

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      addToast({ title: "Deleted!", color: "success" });

      queryClient.setQueryData<NoteOwner[]>(
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
  note: NoteOwner,
  queryKey: unknown[],
  queryClient: QueryClient
): Promise<void> => {
  const isLiked = note.isNoteLiked();
  const noteId = note.getId();

  const updatedNote: NoteOwner = Object.assign(
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

    queryClient.setQueryData<NoteOwner[]>(
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

    queryClient.setQueryData<NoteOwner[]>(
      queryKey,
      (prev) => prev?.map((n) => (n.getId() === noteId ? updatedNote : n)) ?? []
    );

    console.error(error);
  }
};
