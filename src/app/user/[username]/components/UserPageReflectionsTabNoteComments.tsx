import CommentOwnerNote from "@/components/UI/CommentOwnerNote";
import { CommentBaseDTO, CommentOwnerNoteDTO } from "@/types/classes/Comment";
import { NoteOwnDTO } from "@/types/classes/Note";
import { UserFetchedDTO } from "@/types/classes/User";
import { VerseBaseDTO } from "@/types/classes/Verse";
import { Spinner } from "@heroui/spinner";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { NextPage } from "next";
import { Key, useCallback } from "react";

type Props = {
  userInspected: UserFetchedDTO;
  comments: Array<CommentOwnerNoteDTO>;
  isLoading: boolean;
  toggleLike: (
    comment: CommentBaseDTO,
    entity: NoteOwnDTO | VerseBaseDTO
  ) => Promise<void>;
};

const UserPageReflectionsTabNoteComments: NextPage<Props> = ({
  userInspected,
  comments,
  isLoading,
  toggleLike,
}) => {
  const renderCell = useCallback(
    (comment: CommentOwnerNoteDTO, columnKey: Key) => {
      switch (columnKey) {
        case "comment":
          const note = comment.getNote();
          return (
            <CommentOwnerNote
              comment={comment}
              toggleLike={() => toggleLike(comment, note)}
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

export default UserPageReflectionsTabNoteComments;
