import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { ResponseMessage } from "@/types/response";
import { RefetchDataFunctionType } from "@/types/types";
import {
  displayErrorToast,
  getFormattedNameAndSurname,
  MAX_LENGTH_FOR_COMMENT,
  OK_HTTP_RESPONSE_CODE,
} from "@/util/utils";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import ReplyingComment from "./ReplyingComment";
import { Dispatch, SetStateAction } from "react";
import { UserOwnDTO } from "@/types/classes/User";
import { CommentOwnDTO, ParentCommentDTO } from "@/types/classes/Comment";

interface Props {
  user: UserOwnDTO;
  entityType?: "verse" | "note";
  parentComment?: ParentCommentDTO;
  refetchDataFunction: RefetchDataFunctionType<unknown>;
  stateControlFunctionOfCreateNewComment: Dispatch<
    SetStateAction<CommentOwnDTO | boolean>
  >;
  entityId: number;
}

type CreateCommentForm = {
  entityId: number;
  commentText: string;
  parentCommentId: number | null;
};

const CreateCommentComponent: NextPage<Props> = ({
  user,
  entityType = "verse",
  parentComment,
  refetchDataFunction,
  stateControlFunctionOfCreateNewComment,
  entityId,
}) => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<CreateCommentForm>();

  const onSubmit = handleSubmit(async (comment: CreateCommentForm) => {
    comment.entityId = entityId;

    comment.parentCommentId = parentComment?.getId() ?? null;

    try {
      const response = await axiosCredentialInstance.post<ResponseMessage>(
        `/comment/create/${entityType}`,
        comment
      );

      switch (response.status) {
        case OK_HTTP_RESPONSE_CODE:
          await refetchDataFunction();
          stateControlFunctionOfCreateNewComment(false);
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

  const imagePath: string | undefined = user.getImage() ?? undefined;

  return (
    <div className="w-full flex flex-col gap-4 p-2">
      {parentComment && <ReplyingComment parentComment={parentComment} />}

      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <div className="flex items-start gap-2">
          <Avatar
            src={imagePath}
            name={getFormattedNameAndSurname(user)}
            size="md"
          />
          <Textarea
            placeholder="Write your reflection..."
            isClearable
            className="w-full"
            description={`Reflections might contain up to ${MAX_LENGTH_FOR_COMMENT} characters`}
            isRequired
            errorMessage={errors.commentText?.message}
            isInvalid={!!errors.commentText}
            maxLength={MAX_LENGTH_FOR_COMMENT}
            {...register("commentText", {
              required: {
                value: true,
                message: "You cannot create a blank reflection",
              },
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
            onPress={() => stateControlFunctionOfCreateNewComment(false)}
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

export default CreateCommentComponent;
