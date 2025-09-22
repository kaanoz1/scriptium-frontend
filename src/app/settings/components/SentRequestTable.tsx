import { Response } from "@/types/response";
import { Column } from "@/types/types";
import { displayErrorToast } from "@/util/utils";
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
import { NextPage } from "next";
import { useState, useCallback, Key, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { RiUserReceivedLine } from "react-icons/ri";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";
import {
  OK_HTTP_RESPONSE_CODE,
  CONFLICT_HTTP_RESPONSE_CODE,
  TOOL_TIP_CLASS_NAMES,
} from "@/util/constants";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { FollowingUser } from "@/types/classes/model/Follow/Following/Following";
import { formatDate } from "@/util/func";

interface Props {}

const fetchRequests = async (): Promise<FollowingUser[]> => {
  try {
    const response = await axiosCredentialInstance.get<
      Response<FollowingUser[]>
    >(`/follow/followed/0`);

    switch (response.status) {
      case OK_HTTP_RESPONSE_CODE:
        return response.data.data;
      case CONFLICT_HTTP_RESPONSE_CODE:
        return [];
      default:
        return [];
    }
  } catch (error) {
    console.error(error);

    displayErrorToast(error);

    return [];
  }
};

const columns: Array<Column> = [
  { key: "user", label: "USER" },
  { key: "username", label: "USERNAME" },
  { key: "occurredAt", label: "REQUESTED AT" },
  { key: "isFrozen", label: "FROZEN?" },
  { key: "actions", label: "ACTIONS" },
];

const SentRequestTable: NextPage<Props> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRemoveConfirmationOpen, setIsRemoveConfirmationOpen] =
    useState(false);
  const [selectedUsernameToRemove, setSelectedUsernameToRemove] = useState<
    string | null
  >(null);

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-sent-requests"],
    queryFn: async () => await fetchRequests(),
    refetchInterval: 1000 * 60 * 10,
  });

  const filteredRequests = useMemo(() => {
    if (!data) return [];
    if (!searchQuery) return data;

    const query = searchQuery.toLowerCase();
    return data.filter((f) =>
      f.getFollowingUser().getUsername().toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  const handleRetrieveRequest = async (username: string) => {
    try {
      const response = await axiosCredentialInstance.delete(
        `/follow/retrieve`,
        {
          data: { username },
        }
      );

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

  const confirmRetrieveRequest = (username: string) => {
    setSelectedUsernameToRemove(username);
    setIsRemoveConfirmationOpen(true);
  };

  const renderCell = useCallback((item: FollowingUser, columnKey: Key) => {
    const followedUser = item.getFollowingUser();
    const username = followedUser.getUsername();
    const image = followedUser.getImage();
    const occuredAt = item.getOccurredAt();
    const userIsFrozen = followedUser.getIsFrozen();
    switch (columnKey) {
      case "user":
        return (
          <User
            avatarProps={
              image
                ? { radius: "lg", src: image }
                : {
                    radius: "lg",
                  }
            }
            name={followedUser.getFormattedName()}
          >
            <em>{username}</em>
          </User>
        );
      case "username":
        return (
          <Link href={`/user/${username}`} size="sm">
            @{username}
          </Link>
        );

      case "occurredAt":
        const date = new Date(occuredAt);
        return <span>{formatDate(date)}</span>;

      case "isFrozen":
        return <em>{userIsFrozen ? "Yes" : "No"}</em>;

      case "actions":
        return (
          <Tooltip
            content="Retrieve request"
            placement="top"
            color="danger"
            classNames={TOOL_TIP_CLASS_NAMES}
          >
            <Button
              color="danger"
              variant="light"
              isIconOnly
              onPress={() => confirmRetrieveRequest(username)}
            >
              <RiUserReceivedLine size={20} />
            </Button>
          </Tooltip>
        );

      default:
        return null;
    }
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-4">
      <Input
        className="w-80"
        placeholder="Search by username..."
        startContent={<CiSearch />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Table aria-label="Sent Requests Table" selectionMode="none">
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
                  : "No pending requests to display."}
              </div>
            ) : undefined
          }
        >
          {(item: FollowingUser) => (
            <TableRow key={item.getFollowingUser().getUsername()}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        isOpen={isRemoveConfirmationOpen}
        onClose={() => setIsRemoveConfirmationOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Confirm Retrieve Request</ModalHeader>
          <ModalBody>
            Are you sure you want to retrieve your follow request from @
            {selectedUsernameToRemove}?
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onPress={() => setIsRemoveConfirmationOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={() => {
                if (selectedUsernameToRemove)
                  handleRetrieveRequest(selectedUsernameToRemove);

                setIsRemoveConfirmationOpen(false);
              }}
            >
              Retrieve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SentRequestTable;
