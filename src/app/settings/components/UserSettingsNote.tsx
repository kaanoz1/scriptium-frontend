import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {
  handleNoteLike,
  handleNoteUnlike,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  isAuthenticationRequestErrorCode,
  OK_HTTP_RESPONSE_CODE,
  SOMETHING_WENT_WRONG_TOAST,
} from "@/util/utils";
import { Button } from "@heroui/button";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import EditNoteComponent from "../../../components/UI/EditNoteComponent";
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
  T_NoteOwnDTOConstructorParametersJSON,
} from "@/types/classes/Note";
import { addToast } from "@heroui/toast";
import axios, { AxiosResponse } from "axios";
import { getErrorComponent } from "@/util/reactUtil";
import { Toast } from "@/types/types";

interface Props {
  user: UserOwnDTO;
}

const UserSettingsNote: NextPage<Props> = ({ user }) => {
  const [isInformationModalOpen, setIsInformationModalOpen] =
    useState<boolean>(false);

  const [editNote, setEditNote] = useState<NoteOwnDTO | null>(null);

  const { data: notes = null, isLoading } = useQuery<
    Array<NoteOwnDTO> | T_AuthenticationRequestErrorCode | null
  >({
    queryKey: ["notes"],
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
          editNote={editNote}
          stateControlFunctionOfEditNote={setEditNote}
          user={user}
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
          deleteNote={() => deleteNote(n)}
          setEditNote={setEditNote}
          toggleNoteLike={() => toggleNoteLike(n)}
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
      Response<Array<T_NoteOwnDTOConstructorParametersJSON>>
    >(`/note/notes`);
    if (response.status === OK_HTTP_RESPONSE_CODE)
      return response.data.data.map(NoteOwnDTO.createFromJSON);
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

const deleteNote = async (note: NoteOwnDTO) => {
  try {
    const response = await axiosCredentialInstance.delete(`/note/delete`, {
      data: { noteId: note.getId() },
    });

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      const successfullyDeletedToast: Toast = {
        title: "Deleted!",
        color: "success",
      };
      addToast(successfullyDeletedToast);
      return;
    }

    throw new Error("Unexpected result. Status: " + response.status);
  } catch (error) {
    console.error(error);

    const couldnotDeleted: Toast = {
      title: "Could not deleted.",
      description: "Note may be already deleted or has never been existed.",
      color: "danger",
    };
    addToast(couldnotDeleted);

    return;
  }
};

const toggleNoteLike = async (note: NoteOwnDTO) => {
  let response: AxiosResponse<ResponseMessage> | null = null;

  try {
    if (note.isNoteLiked()) response = await handleNoteUnlike(note);
    else response = await handleNoteLike(note);

    switch (response.data.message) {
      case "Note is successfully liked":
        note.like();
        return;
      case "Like that attached this note is successfully deleted.":
        note.removeLike();
        return;

      default:
        return;
    }
  } catch (error) {
    console.error(error);
    return;
  }
};
