import { NoteDTOExtended, User, UserFetched } from "@/types/types";
import { NextPage } from "next";
import Note from "./UI/Note";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {
  OK_RESPONSE_CODE,
  TOO_MANY_REQUEST_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
} from "@/util/utils";
import { Spinner } from "@heroui/spinner";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { useQuery } from "@tanstack/react-query";
import { useState, useCallback, Key } from "react";
import ServerError from "./UI/ServerError";
import TooManyRequest from "./UI/TooManyRequest";
import { AuthenticationRequestErrorCode, Response } from "@/types/response";
import LoadingSpinner from "./UI/LoadingSpinner";

interface Props {
  notesOfUser: UserFetched;
  user: User;
}

const UserPageNotesTab: NextPage<Props> = ({ notesOfUser, user }) => {
  const [error, setError] = useState<
    AuthenticationRequestErrorCode | undefined
  >(undefined);

  const fetchUserNotes = async (): Promise<Array<NoteDTOExtended>> => {
    try {
      const response = await axiosCredentialInstance.get<
        Response<Array<NoteDTOExtended>>
      >(`/user/notes/${notesOfUser.id}`);

      switch (response.status) {
        case OK_RESPONSE_CODE:
          setError(undefined);
          return response.data.data;
        default:
          //TODO: Add toast.
          setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
          return [];
      }
    } catch (error) {
      //TODO: Add toast.
      console.error(error);
      setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
      return [];
    }
  };

  const {
    data: comments = [],
    refetch,
    isLoading,
  } = useQuery<Array<NoteDTOExtended>>({
    queryKey: ["notes", notesOfUser.id],
    queryFn: async () => await fetchUserNotes(),
    refetchInterval: 1000 * 60 * 60,
  });

  const renderCell = useCallback(
    (item: NoteDTOExtended, columnKey: Key) => {
      switch (columnKey) {
        case "note":
          return <Note note={item} refetch={refetch} showVerse user={user} />;
        default:
          return null;
      }
    },
    [refetch, user]
  );

  if (isLoading) <LoadingSpinner />;

  if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
    return <TooManyRequest />;

  if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
    return <ServerError />;

  return (
    <Table aria-label="Table with client async pagination">
      <TableHeader>
        <TableColumn
          key="note"
          className="text-lg font-semibold flex items-center"
        >
          {`${notesOfUser.username}'s notes:`}
        </TableColumn>
      </TableHeader>

      <TableBody
        emptyContent={
          comments?.length === 0
            ? "This user has no reflection to show."
            : undefined
        }
        items={comments}
        loadingContent={<Spinner />}
        loadingState={isLoading ? "loading" : "idle"}
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
  );
};

export default UserPageNotesTab;
