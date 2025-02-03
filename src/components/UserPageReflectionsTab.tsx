import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { AuthenticationRequestErrorCode, Response } from "@/types/response";
import { CommentDTOExtended, User, UserFetched } from "@/types/types";
import {
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  TOO_MANY_REQUEST_RESPONSE_CODE,
} from "@/util/utils";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { Key, useCallback, useState } from "react";
import ServerError from "./UI/ServerError";
import TooManyRequest from "./UI/TooManyRequest";
import Comment from "./UI/Comment";
import { Spinner } from "@heroui/spinner";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

interface Props {
  commentsOfUser: UserFetched;
  user: User;
}

const UserPageReflectionsTab: NextPage<Props> = ({ commentsOfUser, user }) => {
  const [error, setError] = useState<
    AuthenticationRequestErrorCode | undefined
  >(undefined);

  const fetchUserComments = async (): Promise<Array<CommentDTOExtended>> => {
    try {
      const response = await axiosCredentialInstance.get<
        Response<Array<CommentDTOExtended>>
      >(`/user/comments/${commentsOfUser.id}`);

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
      return [];
    }
  };

  const {
    data: comments = [],
    refetch,
    isLoading,
  } = useQuery<Array<CommentDTOExtended>>({
    queryKey: ["comments", commentsOfUser.id],
    queryFn: async () => await fetchUserComments(),
    refetchInterval: 1000 * 60,
  });

  const renderCell = useCallback(
    (item: CommentDTOExtended, columnKey: Key) => {
      switch (columnKey) {
        case "comment":
          return (
            <Comment user={user} comment={item} refetch={refetch} showVerse />
          );
        default:
          return null;
      }
    },
    [refetch, user]
  );

  if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
    return <TooManyRequest />;

  if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
    return <ServerError />;

  return (
    <Table aria-label="Table with client async pagination">
      <TableHeader>
        <TableColumn key="comment" className="text-lg font-semibold">
          {`${commentsOfUser.username}'s reflections:`}
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

export default UserPageReflectionsTab;
