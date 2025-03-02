import { User } from "@heroui/user";
import { Link } from "@heroui/link";
import { getFormattedNameAndSurname } from "@/util/utils";
import { LuReply } from "react-icons/lu";
import {
  CommentDTO,
  CommentDTOExtended,
  ParentCommentDTO,
} from "@/types/types";
import { FC } from "react";

interface Props {
  parentComment: ParentCommentDTO | CommentDTO | CommentDTOExtended;
}

const ReplyingComment: FC<Props> = ({ parentComment }) => {
  const imagePath: string | undefined = parentComment.user?.image ?? undefined;

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
                src: imagePath,
                size: "sm",
              }}
              description={
                parentComment.user ? (
                  <Link
                    isExternal
                    href={`/user/${parentComment.user.username}`}
                    size="sm"
                  >
                    <em> @{parentComment.user.username} </em>
                  </Link>
                ) : null
              }
              name={
                parentComment.user ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold">
                      {getFormattedNameAndSurname(parentComment.user)}
                    </span>
                    {/*TODO: parentComment.user roles. */}
                  </div>
                ) : (
                  "Unknown User"
                )
              }
            />
          </div>
        </div>
        <div className="pl-3 border-gray-300 dark:border-gray-500">
          <p>{parentComment.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ReplyingComment;
