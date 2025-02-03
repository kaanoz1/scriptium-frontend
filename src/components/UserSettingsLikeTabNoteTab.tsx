import { LikedNoteDTO, RefetchDataFunctionType, User } from "@/types/types";
import { NextPage } from "next";
import LikedNote from "./UI/LikedNote";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Key, useCallback } from "react";
import { Column } from "@/util/utils";

interface Props {
  notes: LikedNoteDTO[];
  refetch: RefetchDataFunctionType;
  user: User;
}

const UserSettingsLikeTabNoteTab: NextPage<Props> = ({
  user,
  notes,
  refetch,
}) => {
  const renderCell = useCallback(
    (item: LikedNoteDTO, columnKey: Key) => {
      switch (columnKey) {
        case "like":
          return (
            <LikedNote refetchFunction={refetch} user={user} note={item} />
          );

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
        {(item: LikedNoteDTO) => (
          <TableRow key={item.id}>
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
