import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { UserOwnDTO } from "@/types/classes/User";
import { VerseBaseDTO } from "@/types/classes/Verse";
import { ResponseMessage } from "@/types/response";
import { RefetchDataFunctionType } from "@/types/types";
import { OK_HTTP_RESPONSE_CODE, MAX_LENGTH_FOR_NOTE } from "@/util/constants";
import { displayErrorToast, getFormattedNameAndSurname } from "@/util/utils";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";
import axios from "axios";
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

      if (response.status === OK_HTTP_RESPONSE_CODE) {
        addToast({
          title: "Note Created!",
          description: "Your note was successfully saved.",
          color: "success",
        });
        await refetch();
        setCreateNewComment(false);
        return;
      }

      // Unexpected status
      addToast({
        title: "Unexpected Response",
        description: `Server responded with status ${response.status}`,
        color: "warning",
      });
    } catch (error) {
      if (!axios.isAxiosError<ResponseMessage>(error)) {
        addToast({
          title: "Unexpected Error!",
          description: "An unknown error occurred while creating the note.",
          color: "danger",
        });
        console.error(error);
        return;
      }

      if (error.code === "ERR_NETWORK") {
        addToast({
          title: "Network Error!",
          description:
            "Unable to reach the server. Please check your internet.",
          color: "warning",
        });
        return;
      }

      switch (error.response?.status) {
        case 400:
          addToast({
            title: "Invalid Note",
            description:
              "Please ensure your note is not empty and meets the requirements.",
            color: "danger",
          });
          break;

        case 401:
          addToast({
            title: "Unauthorized",
            description: "Please log in to create a note.",
            color: "danger",
          });
          break;

        case 404:
          addToast({
            title: "Verse Not Found",
            description: "The verse you're trying to annotate may not exist.",
            color: "secondary",
          });
          break;

        case 429:
          addToast({
            title: "Too Many Requests",
            description: "You're creating notes too quickly. Try again later.",
            color: "warning",
          });
          break;

        case 500:
          addToast({
            title: "Server Error",
            description:
              "Something went wrong on the server while saving your note.",
            color: "danger",
          });
          break;

        default:
          addToast({
            title: "Error Creating Note",
            description: `Unexpected error: ${
              error.response?.data.message ?? "No message"
            }`,
            color: "warning",
          });
          break;
      }

      console.error(error);
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
