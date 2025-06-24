"use client";
import { Column } from "@/types/types";
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
import { CommentOwnNoteDTO } from "@/types/classes/Comment";
import { UserOwnDTO } from "@/types/classes/User";

interface Props {
  comments: Array<CommentOwnNoteDTO>;
  user: UserOwnDTO;
}

const UserSettingsCommentsTabNoteComments: NextPage<Props> = ({
  user,
  comments,
}) => {
  const renderCell = useCallback(
    (item: CommentOwnNoteDTO, columnKey: Key) => {
      switch (columnKey) {
        case "like":
          return <span>Will be inserted id: {item.getId()}</span>;

        default:
          return <></>;
      }
    },
    [user]
  );

  const columns: Array<Column> = [{ key: "like", label: "REFLECTION" }];

  return (
    <Table aria-label="Liked Reflections Table" selectionMode="none">
      <TableHeader
        aria-label="Liked Reflections Table Header"
        columns={columns}
      >
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        aria-label="Liked Reflections Table Body"
        items={comments}
        emptyContent="You did not liked any reflections"
      >
        {(item: CommentOwnNoteDTO) => (
          <TableRow key={item.getId()}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserSettingsCommentsTabNoteComments;
