import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { ResponseMessage } from "@/types/response";
import {
  OK_RESPONSE_CODE,
  getFormattedNameAndSurname,
  MAX_LENGTH_FOR_COMMENT,
  arrangeImageAndReturns,
  displayErrorToast,
} from "@/util/utils";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { useForm } from "react-hook-form";
import ReplyingComment from "./ReplyingComment";
import {
  CommentDTO,
  CommentDTOExtended,
  CommentExtendedParentCommentDTO,
  ImageObject,
  ParentCommentDTO,
  RefetchDataFunctionType,
  User,
  UserSimplified,
} from "@/types/types";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  comment: CommentDTO | CommentExtendedParentCommentDTO;
  parentComment?: ParentCommentDTO;
  user: User;
  stateControlFunctionOfEditComment:
    | Dispatch<SetStateAction<CommentDTOExtended | CommentDTO | null>>
    | Dispatch<SetStateAction<CommentExtendedParentCommentDTO | null>>
    | Dispatch<SetStateAction<CommentDTO | null>>;
  refetchDataFunction: RefetchDataFunctionType; //TODO: Add client side update. Do not bother server again.
}

type EditCommentForm = {
  newCommentText: string;
  commentId: number;
};

const EditCommentComponent: FC<Props> = ({
  comment,
  parentComment,
  user,
  stateControlFunctionOfEditComment,
  refetchDataFunction,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditCommentForm>();

  const onSubmit = handleSubmit(async (commentToUpdate: EditCommentForm) => {
    commentToUpdate.commentId = comment.id;

    try {
      const response = await axiosCredentialInstance.put<ResponseMessage>(
        `/comment/update`,
        commentToUpdate
      );

      switch (response.status) {
        case OK_RESPONSE_CODE:
          await refetchDataFunction();
          stateControlFunctionOfEditComment(null);
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
      {parentComment && (
        <ReplyingComment
          parentComment={{
            ...parentComment,
            user: arrangeImageAndReturns(
              parentComment.user as ImageObject
            ) as UserSimplified,
          }}
        />
      )}

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
            description={`Reflection might contain up to ${MAX_LENGTH_FOR_COMMENT} characters`}
            defaultValue={comment.text}
            errorMessage={errors.newCommentText?.message}
            isInvalid={!!errors.newCommentText}
            maxLength={MAX_LENGTH_FOR_COMMENT}
            {...register("newCommentText", {
              required: {
                value: true,
                message: "You cannot create a blank reflection",
              },
              validate: (value) =>
                value.trim() !== "" || "You cannot create a blank reflection",
              maxLength: {
                value: MAX_LENGTH_FOR_COMMENT,
                message: `Reflections cannot exceed ${MAX_LENGTH_FOR_COMMENT} characters`,
              },
            })}
          />
        </div>

        <div className="flex justify-end gap-2 mt-1">
          <Button
            variant="light"
            color="default"
            onPress={() => stateControlFunctionOfEditComment(null)}
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
    </section>
  );
};

export default EditCommentComponent;
