"use client";
import { LikedCommentDTO, RefetchDataFunctionType, User } from "@/types/types";
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
import LikedComment from "./UI/LikedComment";
import { Column } from "@/util/utils";

interface Props {
  comments: LikedCommentDTO[];
  refetch: RefetchDataFunctionType;

  user: User;
}

const UserSettingsLikeTabCommentTab: NextPage<Props> = ({
  user,
  comments,
  refetch,
}) => {
  const renderCell = useCallback(
    (item: LikedCommentDTO, columnKey: Key) => {
      switch (columnKey) {
        case "like":
          return (
            <LikedComment
              comment={item}
              user={user}
              refetchFunction={refetch}
            />
          );

        default:
          return <></>;
      }
    },
    [user, refetch]
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
        {(item: LikedCommentDTO) => (
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

export default UserSettingsLikeTabCommentTab;
