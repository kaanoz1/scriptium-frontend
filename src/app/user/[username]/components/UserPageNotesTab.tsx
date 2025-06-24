import { Toast } from "@/types/types";
import { NextPage } from "next";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {
  OK_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  displayErrorToast,
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
import { useState, useCallback, Key, Dispatch, SetStateAction } from "react";
import InternalServerError from "../../../../components/UI/InternalServerError";
import TooManyRequest from "../../../../components/UI/TooManyRequest";
import { T_AuthenticationRequestErrorCode, Response } from "@/types/response";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";
import { addToast } from "@heroui/toast";
import { UserFetchedDTO, UserOwnDTO } from "@/types/classes/User";
import { NoteOwnDTO } from "@/types/classes/Note";
import NoteOwn from "../../../../components/UI/NoteOwn";

interface Props {
  notesOfUser: UserFetchedDTO;
  user: UserOwnDTO | UserFetchedDTO;
}

const fetchUserNotes = async (
  noteOfUser: UserFetchedDTO | UserOwnDTO,
  setStateActionFunctionForError: Dispatch<
    SetStateAction<T_AuthenticationRequestErrorCode | undefined>
  >
): Promise<Array<NoteOwnDTO>> => {
  try {
    const response = await axiosCredentialInstance.get<
      Response<Array<NoteOwnDTO>>
    >(`/user/notes/${noteOfUser.getId()}`);

    switch (response.status) {
      case OK_HTTP_RESPONSE_CODE:
        setStateActionFunctionForError(undefined);
        return response.data.data;
      default:
        const couldnotFetchedToast: Toast = {
          title: "Notes couldn't fetched",
          description:
            "This may has something to do with our end, or user does not exist anymore.",
          color: "warning",
        };
        addToast(couldnotFetchedToast);

        setStateActionFunctionForError(
          INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE
        );
        return [];
    }
  } catch (error) {
    console.error(error);
    setStateActionFunctionForError(INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE);

    displayErrorToast(error);

    return [];
  }
};

const UserPageNotesTab: NextPage<Props> = ({ notesOfUser, user }) => {
  const [error, setError] = useState<
    T_AuthenticationRequestErrorCode | undefined
  >(undefined);

  const {
    data: comments = [],
    refetch,
    isLoading,
  } = useQuery<Array<NoteOwnDTO>>({
    queryKey: ["notes", notesOfUser.getId()],
    queryFn: async () => await fetchUserNotes(user, setError),
    refetchInterval: 1000 * 60 * 60,
  });

  const renderCell = useCallback(
    (item: NoteOwnDTO, columnKey: Key) => {
      switch (columnKey) {
        case "note":
          return (
            <NoteOwn note={item} refetch={refetch} showVerse owner={user} />
          );
        default:
          return null;
      }
    },
    [refetch, user]
  );

  if (isLoading) <LoadingSpinner />;

  if (error && error === TOO_MANY_REQUEST_HTTP_RESPONSE_CODE)
    return <TooManyRequest />;

  if (error && error === INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE)
    return <InternalServerError />;

  return (
    <Table aria-label="Table with client async pagination">
      <TableHeader>
        <TableColumn
          key="note"
          className="text-lg font-semibold flex items-center"
        >
          {`${notesOfUser.getUsername()}'s notes:`}
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

export default UserPageNotesTab;
