import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";
import {
  CommentBase,
  CommentOwn,
  CommentOwnVerse,
} from "@/types/classes/model/Comment/Comment";
import { UserOwn } from "@/types/classes/model/User/User";
import { VerseBase } from "@/types/classes/model/Verse/VerseBase/VerseBase";
import { Toast } from "@/types/types";
import { OK_HTTP_RESPONSE_CODE } from "@/util/constants";
import { displayErrorToast } from "@/util/utils";
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
import { addToast } from "@heroui/toast";
import { NextPage } from "next";
import {
  Dispatch,
  Key,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { CiSearch } from "react-icons/ci";
import CommentOwnComponent from "@/components/comment/CommentOwnVerse";
import { NoteOwn } from "@/types/classes/model/Note/NoteOwn/NoteOwn";

type Props = {
  comments: Array<CommentOwnVerse>;
  user: UserOwn;
  setEditComment: Dispatch<SetStateAction<CommentOwn | null>>;
  isLoading: boolean;
  toggleLike: (
    comment: CommentBase,
    entity: NoteOwn | VerseBase
  ) => Promise<void>;
};

const UserSettingsCommentsTabVerseComments: NextPage<Props> = ({
  comments,
  user,
  setEditComment,
  toggleLike,
  isLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedComment, setSelectedComments] = useState<Selection>(
    new Set([])
  );

  const filteredComments = useMemo(() => {
    if (!searchQuery) return comments;
    return comments.filter((comment) =>
      comment.getText().toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [comments, searchQuery]);

  const renderCell = useCallback(
    (comment: CommentOwnVerse, columnKey: Key) => {
      switch (columnKey) {
        case "reflection":
          const verse = comment.getVerse();
          return (
            <CommentOwnComponent
              user={user}
              deleteComment={() => deleteComment(comment)}
              comment={comment}
              toggleLike={() => toggleLike(comment, verse)}
              setEditComment={setEditComment}
            />
          );
        default:
          return <p>This text should not appear. Report if persist.</p>;
      }
    },
    [user, comments]
  );

  return (
    <div className="flex flex-col items-center py-10 px-4 min-h-screen bg-white dark:bg-neutral-900/80">
      <div className="w-full mb-6 flex justify-start">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>
      <Table
        color="default"
        removeWrapper
        isStriped
        selectedKeys={selectedComment}
        onSelectionChange={setSelectedComments} //Even if it takes Set<Key>, Selection type what it should be. But Selection can only be "all" whenever we manually set it to be. since we don't do that, so we don't need to take any caution for that.
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="text-xl font-semibold">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          loadingState={isLoading ? "loading" : "idle"}
          emptyContent={
            <span className="text-gray-500">
              {filteredComments.length !== 0
                ? undefined
                : searchQuery
                ? "You have no reflections with that content."
                : "   You do not have any reflections."}
            </span>
          }
          items={filteredComments}
        >
          {(comment) => (
            <TableRow key={comment.getId()}>
              {(columnKey) => (
                <TableCell>{renderCell(comment, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserSettingsCommentsTabVerseComments;

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "w-80",
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <Input
      className={className}
      placeholder={placeholder}
      startContent={<CiSearch />}
      value={value}
      onValueChange={onChange}
    />
  );
};

const columns = [
  {
    key: "reflection",
    label: "REFLECTION",
  },
];

const deleteComment = async (comment: CommentOwn) => {
  try {
    const response = await axiosCredentialInstance.delete(`/comment/delete`, {
      data: { commentId: comment.getId() },
    });

    switch (response.status) {
      case OK_HTTP_RESPONSE_CODE:
        const successToast: Toast = {
          title: "Success!",
          description: "Reflection has been deleted!",
          color: "success",
        };

        addToast(successToast);
        return;
      default:
        const couldnotDeletedToast: Toast = {
          title: "Reflection could not be deleted",
          description: "Reflection may be already deleted.",
          color: "warning",
        };
        addToast(couldnotDeletedToast);

        return;
    }
  } catch (error) {
    console.error(error);

    displayErrorToast(error);

    return;
  }
};
