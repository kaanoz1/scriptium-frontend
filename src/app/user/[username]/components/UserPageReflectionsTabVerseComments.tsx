import {
  CommentBase,
  CommentOwnerVerse,
} from "@/types/classes/model/Comment/Comment";
import { UserFetched } from "@/types/classes/model/User/User";
import { VerseBase } from "@/types/classes/model/Verse/VerseBase/VerseBase";
import { Spinner } from "@heroui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { NextPage } from "next";
import { Key, useCallback } from "react";
import CommentOwnerVerseComponent from "@/components/comment/CommentOwnerVerse";
import { NoteOwn } from "@/types/classes/model/Note/NoteOwn/NoteOwn";

type Props = {
  userInspected: UserFetched;
  comments: Array<CommentOwnerVerse>;
  isLoading: boolean;
  toggleLike: (
    comment: CommentBase,
    entity: NoteOwn | VerseBase
  ) => Promise<void>;
};

const UserPageReflectionsTabVerseComments: NextPage<Props> = ({
  userInspected,
  comments,
  isLoading,
  toggleLike,
}) => {
  const renderCell = useCallback(
    (comment: CommentOwnerVerse, columnKey: Key) => {
      switch (columnKey) {
        case "comment":
          const verse = comment.getVerse();
          return (
            <CommentOwnerVerseComponent
              comment={comment}
              toggleLike={() => toggleLike(comment, verse)}
              showVerse={true}
            />
          );
        default:
          return null;
      }
    },
    []
  );

  return (
    <>
      <Table aria-label="Table with client async pagination">
        <TableHeader>
          <TableColumn key="comment" className="text-lg font-semibold">
            {`${userInspected.getUsername()}'s reflections:`}
          </TableColumn>
        </TableHeader>

        <TableBody
          emptyContent={
            comments.length === 0
              ? "This user has no reflection to show."
              : undefined
          }
          items={comments}
          loadingContent={<Spinner />}
          loadingState={isLoading ? "loading" : "idle"}
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
    </>
  );
};

export default UserPageReflectionsTabVerseComments;
