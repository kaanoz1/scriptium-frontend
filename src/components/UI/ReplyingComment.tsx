import { User } from "@heroui/user";
import { Link } from "@heroui/link";
import { getFormattedNameAndSurname } from "@/util/utils";
import { LuReply } from "react-icons/lu";

import { FC } from "react";
import { CommentOwnerDTO, ParentCommentDTO } from "@/types/classes/Comment";

interface Props {
  parentComment: CommentOwnerDTO | ParentCommentDTO;
}

const ReplyingComment: FC<Props> = ({ parentComment }) => {
  const parentCommentCreator =
    parentComment instanceof CommentOwnerDTO
      ? parentComment.getCreator()
      : parentComment.getUser();
  const usernameOfCreator: string | undefined =
    parentCommentCreator?.getUsername();
  const imagePath: string | undefined =
    parentCommentCreator?.getImage() ?? undefined;

  const text = parentComment.getText();

  return (
    <div className="w-full ps-4">
      <div className="flex items-center gap-2 text-gray-500 mb-2">
        <LuReply className="text-gray-400" />
        <span className="text-sm font-medium">Replying to</span>
      </div>
      <div className="border rounded-lg bg-white p-3 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200">
        <div className="flex flex-col mb-2">
          <div className="flex items-center gap-2">
            <User
              avatarProps={{
                src: imagePath ?? "",
                size: "sm",
              }}
              description={
                usernameOfCreator ? (
                  <Link
                    isExternal
                    href={`/user/${usernameOfCreator}`}
                    size="sm"
                  >
                    <em> @{usernameOfCreator} </em>
                  </Link>
                ) : (
                  "You don't have permission to access this user."
                )
              }
              name={
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold">
                    {parentCommentCreator
                      ? getFormattedNameAndSurname(parentCommentCreator)
                      : "Unknown user"}
                  </span>
                  {/*TODO: parentComment.user roles. */}
                </div>
              }
            />
          </div>
        </div>
        <div className="pl-3 border-gray-300 dark:border-gray-500">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default ReplyingComment;
