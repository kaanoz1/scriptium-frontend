// Shared form component for both create and edit
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { MAX_LENGTH_FOR_COMMENT } from "@/util/constants";
import { getFormattedNameAndSurname } from "@/util/utils";
import { UserOwnDTO } from "@/types/classes/User";

interface Props {
  user: UserOwnDTO;
  defaultText?: string;
  onCancel: () => void;
  onSubmitComment: (text: string) => Promise<void>;
  submitting: boolean;
  placeholder?: string;
}

const CommentForm: FC<Props> = ({
  user,
  defaultText = "",
  onCancel,
  onSubmitComment,
  submitting,
  placeholder = "Write your reflection...",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ text: string }>({
    defaultValues: { text: defaultText },
  });

  const imagePath = user.getImage() ?? undefined;

  const onSubmit = handleSubmit(async ({ text }) => {
    await onSubmitComment(text);
  });

  return (
    <form className="flex flex-col gap-2 w-full p-2" onSubmit={onSubmit}>
      <div className="flex items-start gap-2">
        {imagePath ? (
          <Avatar
            src={imagePath}
            name={getFormattedNameAndSurname(user)}
            size="md"
          />
        ) : (
          <Avatar name={getFormattedNameAndSurname(user)} size="md" />
        )}
        <Textarea
          placeholder={placeholder}
          isClearable
          className="w-full"
          description={`Reflection might contain up to ${MAX_LENGTH_FOR_COMMENT} characters`}
          isRequired
          errorMessage={errors.text?.message}
          isInvalid={!!errors.text}
          maxLength={MAX_LENGTH_FOR_COMMENT}
          {...register("text", {
            required: {
              value: true,
              message: "You cannot submit a blank reflection.",
            },
            maxLength: {
              value: MAX_LENGTH_FOR_COMMENT,
              message: `Reflection cannot exceed ${MAX_LENGTH_FOR_COMMENT} characters`,
            },
            validate: (value) =>
              value.trim() !== "" || "Comment cannot be empty",
          })}
        />
      </div>

      <div className="flex justify-end gap-2 mt-1">
        <Button
          variant="light"
          color="default"
          onPress={onCancel}
          isDisabled={submitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="success"
          isLoading={submitting}
          isDisabled={submitting}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
