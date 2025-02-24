import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {ResponseMessage} from "@/types/response";
import {
    NoteDTO,
    NoteDTOExtended,
    RefetchDataFunctionType,
    User,
} from "@/types/types";
import {
    OK_RESPONSE_CODE,
    getFormattedNameAndSurname,
    MAX_LENGTH_FOR_NOTE, displayErrorToast,
} from "@/util/utils";
import {Avatar} from "@heroui/avatar";
import {Button} from "@heroui/button";
import {Textarea} from "@heroui/input";
import {NextPage} from "next";
import {Dispatch, SetStateAction} from "react";
import {useForm} from "react-hook-form";

interface Props {
    editNote: NoteDTO;
    stateControlFunctionOfEditNote:
        | Dispatch<SetStateAction<NoteDTOExtended | null>>
        | Dispatch<SetStateAction<NoteDTO | null>>;
    user: User;
    refetchDataFunction: RefetchDataFunctionType;
}

type EditNoteForm = {
    noteText: string;
    noteId: number;
};

const EditNoteComponent: NextPage<Props> = ({
                                                editNote: note,
                                                stateControlFunctionOfEditNote,
                                                user,
                                                refetchDataFunction,
                                            }) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<EditNoteForm>();

    const onSubmit = handleSubmit(async (noteToUpdate: EditNoteForm) => {
        noteToUpdate.noteId = note.id;

        try {
            const response = await axiosCredentialInstance.put<ResponseMessage>(
                `/note/update`,
                noteToUpdate
            );

            switch (response.status) {
                case OK_RESPONSE_CODE:
                    await refetchDataFunction();
                    stateControlFunctionOfEditNote(null);
                    return;
                default:
                    return;
            }
        } catch (error) {
            console.error(error);
            displayErrorToast(error);
            return;
        }
    });

    const imagePath: string | undefined = user.image ?? undefined;

    return (
        <section className="w-full flex flex-col gap-4 p-2">
            <form className="flex flex-col gap-2" onSubmit={onSubmit}>
                <div className="flex items-start gap-2">
                    <Avatar
                        src={imagePath}
                        name={getFormattedNameAndSurname(user)}
                        size="md"
                    />
                    <Textarea
                        placeholder="Update your reflection..."
                        isClearable
                        className="w-full"
                        isRequired
                        minRows={10}
                        description={`Notes might contain up to ${MAX_LENGTH_FOR_NOTE} characters`}
                        defaultValue={note.noteText}
                        errorMessage={errors.noteText?.message}
                        isInvalid={!!errors.noteText}
                        maxLength={MAX_LENGTH_FOR_NOTE}
                        {...register("noteText", {
                            required: {
                                value: true,
                                message: "You cannot create a blank note",
                            },

                            validate: (value) =>
                                value.trim() !== "" || "You cannot create a blank note",
                            maxLength: {
                                value: MAX_LENGTH_FOR_NOTE,
                                message: `Reflections cannot exceed ${MAX_LENGTH_FOR_NOTE} characters`,
                            },
                        })}
                    />
                </div>

                <div className="flex justify-end gap-2 mt-1">
                    <Button
                        variant="light"
                        color="default"
                        onPress={() => stateControlFunctionOfEditNote(null)}
                        isDisabled={isSubmitting}
                    >
                        Cancel
                    </Button>

                    <Button type="submit" color="success" isLoading={isSubmitting}>
                        Submit
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default EditNoteComponent;
