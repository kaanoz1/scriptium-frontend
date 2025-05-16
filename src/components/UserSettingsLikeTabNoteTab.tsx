import { Column, RefetchDataFunctionType } from "@/types/types";
import { NextPage } from "next";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Key, useCallback } from "react";
import { UserOwnDTO } from "@/types/classes/User";
import NoteOwn from "./UI/NoteOwn";
import { NoteOwnDTO } from "@/types/classes/Note";

interface Props {
  notes: NoteOwnDTO[];
  refetch: RefetchDataFunctionType;
  user: UserOwnDTO;
}

const UserSettingsLikeTabNoteTab: NextPage<Props> = ({
  user,
  notes,
  refetch,
}) => {
  const renderCell = useCallback(
    (item: NoteOwnDTO, columnKey: Key) => {
      const note = item;

      switch (columnKey) {
        case "like":
          return <NoteOwn note={note} owner={user} refetch={refetch} />;

        default:
          return <></>;
      }
    },
    [user, refetch]
  );

  const columns: Array<Column> = [{ key: "like", label: "NOTE" }];

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
        items={notes}
        emptyContent="You did not liked any reflections"
      >
        {(item: NoteOwnDTO) => (
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

export default UserSettingsLikeTabNoteTab;
