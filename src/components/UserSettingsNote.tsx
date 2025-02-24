import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {NoteDTOExtended, User} from "@/types/types";
import {
    OK_RESPONSE_CODE,
    TOO_MANY_REQUEST_RESPONSE_CODE,
    INTERNAL_SERVER_ERROR_RESPONSE_CODE, displayErrorToast,
} from "@/util/utils";
import {Button} from "@heroui/button";
import {useQuery} from "@tanstack/react-query";
import {NextPage} from "next";
import {useState} from "react";
import {IoIosInformationCircleOutline} from "react-icons/io";
import EditNoteComponent from "./UI/EditNoteComponent";
import NoteInformationModal from "./NoteInformationModal";
import ServerErrorComponent from "./UI/ServerErrorComponent";
import TooManyRequestComponent from "./UI/TooManyRequestComponent";
import LoadingSpinner from "./UI/LoadingSpinner";
import Note from "./UI/Note";
import {AuthenticationRequestErrorCode, Response} from "@/types/response";

interface Props {
    user: User;
}

const UserSettingsNote: NextPage<Props> = ({user}) => {
    const [error, setError] = useState<
        AuthenticationRequestErrorCode | undefined
    >(undefined);

    const [isInformationModalOpen, setIsInformationModalOpen] =
        useState<boolean>(false);

    const [editNote, setEditNote] = useState<NoteDTOExtended | null>(null);

    const {
        data: notes = [],
        isLoading,
        refetch,
    } = useQuery<Array<NoteDTOExtended>>({
        queryKey: ["notes"],
        queryFn: async () => await fetchNotes(),
    });

    const fetchNotes = async () => {
        try {
            const response = await axiosCredentialInstance.get<
                Response<NoteDTOExtended[]>
            >(`/note/notes`);

            switch (response.status) {
                case OK_RESPONSE_CODE:
                    setError(undefined);

                    return response.data.data;
                default:
                    setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
                    return [];
            }
        } catch (error) {
            console.error(error);

            displayErrorToast(error);
            return [];
        }
    };

    if (isLoading) return <LoadingSpinner/>;

    if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
        return <TooManyRequestComponent/>;

    if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
        return <ServerErrorComponent/>;

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
                        <IoIosInformationCircleOutline size={19}/>
                    </Button>
                </div>
            </h2>

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
        </main>
    );
};

export default UserSettingsNote;
