import { AuthenticationRequestErrorCode, Response } from "@/types/response";
import {
  CommentDTO,
  CommentDTOExtended,
  CommentExtendedParentCommentDTO,
  ParentCommentDTO,
  User,
} from "@/types/types";
import {
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  TOO_MANY_REQUEST_RESPONSE_CODE,
} from "@/util/utils";
import { Input } from "@heroui/input";
import {
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { NextPage } from "next";
import { Key, useCallback, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import Comment from "./UI/Comment";
import { useQuery } from "@tanstack/react-query";
import ServerErrorComponent from "./UI/ServerErrorComponent";
import TooManyRequestComponent from "./UI/TooManyRequestComponent";
import LoadingSpinner from "./UI/LoadingSpinner";
import EditCommentComponent from "./UI/EditCommentComponent";

interface Props {
  user: User;
}

const getParentCommentFromCommentDTO = (
  comment: CommentDTO | CommentDTOExtended | null,
  comments: Array<CommentExtendedParentCommentDTO>
): ParentCommentDTO | undefined => {
  const commentChildren = comments.find((c) => c.id == comment?.id);

  if (!commentChildren || !commentChildren.parentComment) return undefined;

  const parent = commentChildren.parentComment;

  return parent;
};

const UserSettingsComments: NextPage<Props> = ({ user }) => {
  const [selectedComment, setSelectedComments] = useState<Set<Key>>(
    new Set([])
  );

  const [editComment, setEditComment] = useState<
    CommentDTO | CommentDTOExtended | null
  >(null);

  const [error, setError] = useState<
    AuthenticationRequestErrorCode | undefined
  >(undefined);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: comments = [],
    refetch,
    isLoading,
  } = useQuery<CommentExtendedParentCommentDTO[]>({
    queryKey: ["comments", user.id],
    queryFn: async () => await fetchComments(),
  });

  const fetchComments = async () => {
    const response = await axiosCredentialInstance.get<
      Response<CommentExtendedParentCommentDTO[]>
    >(`/comment/`);

    switch (response.status) {
      case OK_RESPONSE_CODE:
        setError(undefined);
        return response.data.data;

      default:
        setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
        return [];
    }
  };

  const renderCell = useCallback(
    (item: CommentExtendedParentCommentDTO, columnKey: Key) => {
      const cellValue =
        item[columnKey as keyof CommentExtendedParentCommentDTO];
      if (user == null) return <></>;

      switch (columnKey) {
        case "reflection":
          const comment: CommentDTOExtended = {
            id: item.id,
            user: user,
            text: item.text,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            parentCommentId: item.parentComment?.id ?? null,
            isLiked: item.isLiked,
            verse: item.verse,
            likeCount: item.likeCount,
            replyCount: item.replyCount,
          };

          return (
            <Comment
              user={user}
              comment={comment}
              refetch={refetch}
              parentComment={getParentCommentFromCommentDTO(comment, comments)}
              stateFunctionOfEditComment={setEditComment}
            />
          );
        default:
          return <>{cellValue?.toString()}</>;
      }
    },
    [user, refetch, comments]
  );

  const columns = [
    {
      key: "reflection",
      label: "REFLECTION",
    },
  ];

  const filteredComments = useMemo(() => {
    if (!searchQuery) return comments;
    return comments.filter((comment) =>
      comment.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [comments, searchQuery]);

  if (isLoading) return <LoadingSpinner />;

  if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
    return <TooManyRequestComponent />;

  if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
    return <ServerErrorComponent />;

  const parentCommentOfEditComment: ParentCommentDTO | undefined =
    getParentCommentFromCommentDTO(editComment, comments);

  return (
    <div className="flex flex-col items-center py-10 px-4 min-h-screen bg-white dark:bg-neutral-900/80">
      <>
        <div className="w-full mb-6 flex justify-start">
          <Input
            className="w-80"
            placeholder="Search by content..."
            startContent={<CiSearch />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {editComment && (
          <EditCommentComponent
            comment={editComment}
            parentComment={parentCommentOfEditComment}
            user={user}
            stateControlFunctionOfEditComment={setEditComment}
            refetchDataFunction={refetch}
          />
        )}

        <Table
          color="default"
          removeWrapper
          isStriped
          selectedKeys={selectedComment as Selection}
          onSelectionChange={setSelectedComments as (keys: Selection) => void} //Even if it takes Set<Key>, Selection type what it should be. But Selection can only be "all" whenever we manually set it to be. since we don't do that, so we don't need to take any caution for that.
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key} className="text-xl font-semibold">
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={
              <span className="text-gray-500">
                {filteredComments.length !== 0
                  ? undefined
                  : searchQuery
                  ? "You have no reflections with that content."
                  : "   You do not have any reflections."}
              </span>
            }
            isLoading={isLoading}
            items={filteredComments}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>
    </div>
  );
};

export default UserSettingsComments;
