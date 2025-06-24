import { Button } from "@heroui/button";
import { NextPage } from "next";
import { Dispatch, SetStateAction, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { IoIosInformationCircleOutline } from "react-icons/io";
import NoteInformationModal from "../../../../../../components/NoteInformationModal";
import CreateNoteComponent from "../../../../../../components/UI/CreateNoteComponent";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {
  OK_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  TOO_MANY_REQUEST_RESPONSE_CODE,
} from "@/util/utils";
import { useQuery } from "@tanstack/react-query";
import { AuthenticationRequestErrorCode, Response } from "@/types/response";
import ServerErrorComponent from "../../../../../../components/UI/ServerErrorComponent";
import TooManyRequestComponent from "../../../../../../components/UI/TooManyRequest";
import LoadingSpinner from "../../../../../../components/UI/LoadingSpinner";
import { NoteOwnerDTO } from "@/types/classes/Note";
import { VerseBaseDTO, VerseBothDTO } from "@/types/classes/Verse";
import { UserOwnDTO } from "@/types/classes/User";
import NoteOwner from "../../../../../../components/UI/NoteOwner";

interface Props {
  verse: VerseBothDTO;
  user: UserOwnDTO;
}

const fetchNotes = async (
  verse: VerseBaseDTO,
  setStateActionFunctionForError: Dispatch<
    SetStateAction<AuthenticationRequestErrorCode | undefined>
  >
) => {
  try {
    const response = await axiosCredentialInstance.get<
      Response<NoteOwnerDTO[]>
    >(`/note/${verse.getId()}`);

    switch (response.status) {
      case OK_RESPONSE_CODE:
        setStateActionFunctionForError(undefined);

        return response.data.data;
      default:
        setStateActionFunctionForError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
        return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const VersePageTabNotes: NextPage<Props> = ({ verse, user }) => {
  const [error, setError] = useState<
    AuthenticationRequestErrorCode | undefined
  >(undefined);

  const [createNewNote, setCreateNewNote] = useState<boolean>(false);

  const [isInformationModalOpen, setIsInformationModalOpen] =
    useState<boolean>(false);

  const {
    data: notes = [],
    isLoading,
    refetch,
  } = useQuery<NoteOwnerDTO[]>({
    queryKey: ["notes", verse.getId()],
    queryFn: async () => await fetchNotes(verse, setError),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
    return <TooManyRequestComponent />;

  if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
    return <ServerErrorComponent />;

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

      {notes.length === 0 && (
        <div className="flex justify-center items-center text-sm py-10">
          No notes yet.
        </div>
      )}

      {notes.map((n) => (
        <NoteOwner key={`note-${n.getId()}`} note={n} />
      ))}

      <NoteInformationModal
        isModalOpen={isInformationModalOpen}
        setIsModalOpen={setIsInformationModalOpen}
      />
    </div>
  );
};

export default VersePageTabNotes;
