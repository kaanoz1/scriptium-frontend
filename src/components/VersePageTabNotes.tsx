import { Button } from "@heroui/button";
import { NextPage } from "next";
import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { IoIosInformationCircleOutline } from "react-icons/io";
import NoteInformationModal from "./NoteInformationModal";
import CreateNoteComponent from "./UI/CreateNoteComponent";
import { NoteDTO, NoteDTOExtended, User, VerseDTO } from "@/types/types";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {
  OK_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  TOO_MANY_REQUEST_RESPONSE_CODE,
} from "@/util/utils";
import { useQuery } from "@tanstack/react-query";
import { AuthenticationRequestErrorCode, Response } from "@/types/response";
import ServerErrorComponent from "./UI/ServerErrorComponent";
import TooManyRequestComponent from "./UI/TooManyRequestComponent";
import LoadingSpinner from "./UI/LoadingSpinner";
import Note from "./UI/Note";
import EditNoteComponent from "./UI/EditNoteComponent";

interface Props {
  verse: VerseDTO;
  user: User;
}

const VersePageTabNotes: NextPage<Props> = ({ verse, user }) => {
  const [error, setError] = useState<
    AuthenticationRequestErrorCode | undefined
  >(undefined);

  const [createNewNote, setCreateNewNote] = useState<boolean>(false);

  const [isInformationModalOpen, setIsInformationModalOpen] =
    useState<boolean>(false);

  const [editNote, setEditNote] = useState<NoteDTO | null>(null);

  const {
    data: notes = [],
    isLoading,
    refetch,
  } = useQuery<NoteDTOExtended[]>({
    queryKey: ["notes", verse.id],
    queryFn: async () => await fetchNotes(),
  });

  const fetchNotes = async () => {
    try {
      const response = await axiosCredentialInstance.get<Response<NoteDTO[]>>(
        `/note/${verse.id}`
      );

      switch (response.status) {
        case OK_RESPONSE_CODE:
          setError(undefined);

          const noteDTOExtendedArr: NoteDTOExtended[] = [];

          for (const noteDTO of response.data.data)
            noteDTOExtendedArr.push({
              ...noteDTO,
              verse,
            } satisfies NoteDTOExtended);

          return noteDTOExtendedArr;
        default:
          setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
          return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

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

      {editNote && (
        <EditNoteComponent
          editNote={editNote}
          stateControlFunctionOfEditNote={setEditNote}
          user={user}
          refetchDataFunction={refetch}
        />
      )}

      {notes.length === 0 && (
        <div className="flex justify-center items-center text-sm py-10">
          No notes yet.
        </div>
      )}

      {notes.map((n) => (
        <Note
          key={`note-${n.id}`}
          note={n}
          user={user}
          refetch={refetch}
          stateFunctionForEditNote={setEditNote}
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
