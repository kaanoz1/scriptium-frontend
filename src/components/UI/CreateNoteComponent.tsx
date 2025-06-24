import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { UserOwnDTO } from "@/types/classes/User";
import { VerseBaseDTO } from "@/types/classes/Verse";
import { ResponseMessage } from "@/types/response";
import { RefetchDataFunctionType } from "@/types/types";
import {
  displayErrorToast,
  getFormattedNameAndSurname,
  MAX_LENGTH_FOR_NOTE,
  OK_HTTP_RESPONSE_CODE,
} from "@/util/utils";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface Props {
  verse: VerseBaseDTO;
  refetch: RefetchDataFunctionType<unknown>;
  setCreateNewComment: Dispatch<SetStateAction<boolean>>;
  user: UserOwnDTO;
}

type CreateNoteForm = {
  noteText: string;
  verseId: number;
};

const CreateNoteComponent: FC<Props> = ({
  verse,
  refetch,
  setCreateNewComment,
  user,
}) => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<CreateNoteForm>();

  const onSubmit = handleSubmit(async (note: CreateNoteForm) => {
    note.verseId = verse.getId();

    try {
      const response = await axiosCredentialInstance.post<ResponseMessage>(
        `/note/create`,
        note
      );

      switch (response.status) {
        case OK_HTTP_RESPONSE_CODE:
          await refetch();
          setCreateNewComment(false);
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

  return (
    <div className="w-full flex flex-col gap-4 p-2">
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <div className="flex items-start gap-2">
          <Avatar
            src={user.getImage() ?? String()}
            name={getFormattedNameAndSurname(user)}
            size="md"
          />
          <Textarea
            placeholder="Write your note..."
            isClearable
            className="w-full"
            isRequired
            minRows={10}
            description={`Notes might contain up to ${MAX_LENGTH_FOR_NOTE} characters`}
            errorMessage={errors.noteText?.message}
            isInvalid={!!errors.noteText}
            maxLength={MAX_LENGTH_FOR_NOTE}
            {...register("noteText", {
              required: {
                value: true,
                message: "You cannot create a blank note",
              },
              validate: (value: string) =>
                value.trim() !== "" || "You cannot create a blank note",
              maxLength: {
                value: MAX_LENGTH_FOR_NOTE,
                message: `Note cannot exceed ${MAX_LENGTH_FOR_NOTE} characters`,
              },
            })}
          />
        </div>

        <div className="flex justify-end gap-2 mt-1">
          <Button
            variant="light"
            color="default"
            onPress={() => setCreateNewComment(false)}
            isDisabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            color="success"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNoteComponent;
