import { Response } from "@/types/response";
import { Column, RefetchDataFunctionType } from "@/types/types";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { User } from "@heroui/user";
import { useQuery } from "@tanstack/react-query";
import { useState, useCallback, Key, useMemo, FC, Fragment } from "react";
import { CiSearch } from "react-icons/ci";
import { RiUserShared2Line, RiUserUnfollowLine } from "react-icons/ri";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import LoadingSpinner from "./UI/LoadingSpinner";
import ReceivedRequestTableFollowerAcceptionConfirmationModal from "./ReceivedRequestTableFollowerAcceptionConfirmationModal";
import ReceivedRequestTableFollowerRejectionConfirmationModal from "./ReceivedRequestTableFollowerRejectionConfirmationModal";
import { FollowerUserDTO, T_FollowerUserDTOConstructorParametersJSON } from "@/types/classes/Follow";
import {
  OK_HTTP_RESPONSE_CODE,
  CONFLICT_HTTP_RESPONSE_CODE,
  PROJECT_URL,
} from "@/util/constants";
import {
  displayErrorToast,
  getFormattedNameAndSurname,
  formatDate,
} from "@/util/utils";

const columns: Array<Column> = [
  { key: "user", label: "USER" },
  { key: "occurredAt", label: "RECEIVED AT" },
  { key: "isFrozen", label: "FROZEN?" },
  { key: "actions", label: "ACTIONS" },
];

const fetchRequests = async (): Promise<Array<FollowerUserDTO>> => {
  try {
    const response = await axiosCredentialInstance.get<
      Response<T_FollowerUserDTOConstructorParametersJSON[]>
    >(`/follow/follower/0`);

    switch (response.status) {
      case OK_HTTP_RESPONSE_CODE:
        return response.data.data.map(FollowerUserDTO.createFromJSON);
      case CONFLICT_HTTP_RESPONSE_CODE:
        return [];
      default:
        return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const handleAcceptRequest = async (
  username: string,
  refetch: RefetchDataFunctionType<unknown>
) => {
  try {
    const response = await axiosCredentialInstance.put(`/follow/accept`, {
      username,
    });

    switch (response.status) {
      case OK_HTTP_RESPONSE_CODE:
        await refetch();
        return;
      default:
        return;
    }
  } catch (error) {
    console.error(error);

    displayErrorToast(error);

    return;
  }
};

const handleRejectRequest = async (
  username: string,
  refetch: RefetchDataFunctionType<unknown>
) => {
  try {
    const response = await axiosCredentialInstance.delete(`/follow/reject`, {
      data: { username },
    });
    switch (response.status) {
      case OK_HTTP_RESPONSE_CODE:
        await refetch();
        return;
      default:
        return;
    }
  } catch (error) {
    console.error(error);
    displayErrorToast(error);
    return;
  }
};

const ReceivedRequestTable: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [isAcceptConfirmationOpen, setIsAcceptConfirmationOpen] =
    useState(false);
  const [isRejectConfirmationOpen, setIsRejectConfirmationOpen] =
    useState(false);
  const [selectedUsername, setSelectedUsername] = useState<string>("");

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-received-requests"],
    queryFn: async () => await fetchRequests(),
    refetchInterval: 1000 * 60 * 10,
  });

  const filteredRequests = useMemo(() => {
    if (!data) return [];
    if (!searchQuery) return data;

    const query = searchQuery.toLowerCase();
    return data.filter((f) =>
      f.getFollowerUser().getUsername().toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  const confirmAcceptRequest = (username: string) => {
    setSelectedUsername(username);
    setIsAcceptConfirmationOpen(true);
  };

  const confirmRejectRequest = (username: string) => {
    setSelectedUsername(username);
    setIsRejectConfirmationOpen(true);
  };

  const renderCell = useCallback((item: FollowerUserDTO, columnKey: Key) => {
    const followerUser = item.getFollowerUser();
    const image = followerUser.getImage();
    const username = followerUser.getUsername();
    const occuredAt = item.getOccurredAt();
    const userIsFrozen = followerUser.getIsFrozen();

    switch (columnKey) {
      case "user":
        return (
          <User
            avatarProps={{ radius: "lg", src: image ?? "" }}
            name={getFormattedNameAndSurname(followerUser)}
            description={
              <Link href={`${PROJECT_URL}/user/${username}`} size="sm">
                <strong>@{username}</strong>
              </Link>
            }
          >
            {username}
          </User>
        );

      case "occurredAt":
        const date = new Date(occuredAt);
        return <span>{formatDate(date)}</span>;

      case "isFrozen":
        return <em>{userIsFrozen ? "Yes" : "No"}</em>;

      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Accept request" placement="top" color="success">
              <Button
                color="success"
                variant="light"
                isIconOnly
                onPress={() => confirmAcceptRequest(username)}
              >
                <RiUserShared2Line size={20} />
              </Button>
            </Tooltip>
            <Tooltip content="Reject request" placement="top" color="danger">
              <Button
                color="danger"
                variant="light"
                isIconOnly
                onPress={() => confirmRejectRequest(username)}
              >
                <RiUserUnfollowLine size={20} />
              </Button>
            </Tooltip>
          </div>
        );

      default:
        return null;
    }
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Fragment>
      <section className="flex flex-col gap-4">
        <Input
          className="w-80"
          placeholder="Search by username..."
          startContent={<CiSearch />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Table aria-label="Received Requests Table" selectionMode="none">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={filteredRequests}
            emptyContent={
              !filteredRequests || filteredRequests.length === 0 ? (
                <div>
                  {searchQuery
                    ? "No users match your search."
                    : "No received requests to display."}
                </div>
              ) : undefined
            }
          >
            {(item: FollowerUserDTO) => (
              <TableRow key={item.getFollowerUser().getUsername()}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
      <ReceivedRequestTableFollowerAcceptionConfirmationModal
        isModalOpen={isAcceptConfirmationOpen}
        setIsModalOpen={setIsAcceptConfirmationOpen}
        selectedUsernameToConfirmToFollow={selectedUsername}
        handleAcceptRequest={async () =>
          await handleAcceptRequest(selectedUsername, refetch)
        }
      />
      <ReceivedRequestTableFollowerRejectionConfirmationModal
        isModalOpen={isRejectConfirmationOpen}
        setIsModalOpen={setIsRejectConfirmationOpen}
        selectedUsernameToRejectToFollow={selectedUsername}
        handleRejectRequest={async () =>
          await handleRejectRequest(selectedUsername, refetch)
        }
      />
    </Fragment>
  );
};

export default ReceivedRequestTable;
