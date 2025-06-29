// EditNoteComponent.tsx

import { Dispatch, FC, SetStateAction } from "react";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { ResponseMessage } from "@/types/response";
import { NoteOwnDTO, NoteOwnVerseDTO } from "@/types/classes/Note";
import { UserOwnDTO } from "@/types/classes/User";
import { OK_HTTP_RESPONSE_CODE } from "@/util/constants";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import axios from "axios";
import NoteForm from "./NoteForm";

interface Props {
  note: NoteOwnDTO;
  stateControlFunctionOfEditNote:
    | Dispatch<SetStateAction<NoteOwnDTO | null>>
    | Dispatch<SetStateAction<NoteOwnVerseDTO | null>>;
  queryKey: readonly unknown[];
  user: UserOwnDTO;
}

const EditNoteComponent: FC<Props> = ({
  note,
  user,
  queryKey,
  stateControlFunctionOfEditNote,
}) => {
  const queryClient = useQueryClient();

  return (
    <section className="w-full flex flex-col gap-4">
      <NoteForm
        user={user}
        defaultText={note.getText()}
        onSubmitNote={async (text: string) =>
          onSubmitNote(
            text,
            note,
            queryKey,
            queryClient,
            stateControlFunctionOfEditNote
          )
        }
        onCancel={() => stateControlFunctionOfEditNote(null)}
        submitting={false}
        placeholder="Update your note..."
      />
    </section>
  );
};

export default EditNoteComponent;

const onSubmitNote = async (
  noteText: string,
  note: NoteOwnDTO,
  queryKey: readonly unknown[],
  queryClient: QueryClient,
  stateControlFunctionOfEditNote:
    | Dispatch<SetStateAction<NoteOwnDTO | null>>
    | Dispatch<SetStateAction<NoteOwnVerseDTO | null>>
): Promise<void> => {
  try {
    const noteId = note.getId();

    const response = await axiosCredentialInstance.put<ResponseMessage>(
      `/note/update`,
      {
        noteId,
        noteText,
      }
    );

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      const updatedNote: NoteOwnDTO = Object.assign(
        Object.create(Object.getPrototypeOf(note)),
        note
      );

      updatedNote.setText(noteText);
      updatedNote.setUpdatedAt(new Date());

      queryClient.setQueryData<NoteOwnDTO[]>(
        queryKey,
        (prev) =>
          prev?.map((n) => (n.getId() === noteId ? updatedNote : n)) ?? []
      );

      addToast({
        title: "Updated!",
        description: "Your note has been successfully updated.",
        color: "success",
      });

      stateControlFunctionOfEditNote(null);
      return;
    }

    throw new Error("Unexpected response status: " + response.status);
  } catch (error) {
    console.error(error);

    if (!axios.isAxiosError<ResponseMessage>(error)) {
      addToast({
        title: "Unexpected Error!",
        description: "An unknown error occurred while editing the note.",
        color: "danger",
      });
      return;
    }

    if (error.code === "ERR_NETWORK") {
      addToast({
        title: "Network Error!",
        description:
          "Unable to reach the server. Please check your connection.",
        color: "warning",
      });
      return;
    }

    switch (error.response?.status) {
      case 401:
        addToast({
          title: "Unauthorized!",
          description: "You must be logged in to edit your note.",
          color: "danger",
        });
        break;

      case 404:
        addToast({
          title: "Note Not Found!",
          description: "The note you're trying to update doesn't exist.",
          color: "secondary",
        });
        break;

      case 429:
        addToast({
          title: "Too Many Requests!",
          description: "You're editing too quickly. Please wait and try again.",
          color: "warning",
        });
        break;

      default:
        addToast({
          title: "Update Failed!",
          description: error.response?.data?.message ?? "Unknown error.",
          color: "danger",
        });
        break;
    }
  }
};
