import { Response } from "@/types/response";
import { Column, FollowUserDTO, ImageObject } from "@/types/types";
import {
  arrangeImageAndReturns,
  CONFLICT_RESPONSE_CODE,
  formatDate,
  getFormattedNameAndSurname,
  OK_RESPONSE_CODE,
  PROJECT_URL,
  TOOL_TIP_CLASS_NAMES,
} from "@/util/utils";
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
import { useState, useCallback, Key, useEffect, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { RiUserReceivedLine } from "react-icons/ri";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import LoadingSpinner from "./UI/LoadingSpinner";

interface Props {}

const columns: Array<Column> = [
  { key: "user", label: "USER" },
  { key: "username", label: "USERNAME" },
  { key: "occurredAt", label: "REQUESTED AT" },
  { key: "isFrozen", label: "FROZEN?" },
  { key: "actions", label: "ACTIONS" },
];

const SentRequestTable: NextPage<Props> = () => {
  const [requests, setRequests] = useState<FollowUserDTO[] | undefined>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRemoveConfirmationOpen, setIsRemoveConfirmationOpen] =
    useState(false);
  const [selectedUsernameToRemove, setSelectedUsernameToRemove] = useState<
    string | null
  >(null);

  const fetchRequests = async (): Promise<FollowUserDTO[]> => {
    try {
      const response = await axiosCredentialInstance.get<
        Response<FollowUserDTO[]>
      >(`/follow/followed/0`);

      switch (response.status) {
        case OK_RESPONSE_CODE:
          response.data.data.forEach((data) =>
            arrangeImageAndReturns(data as ImageObject)
          );

          setRequests(response.data.data);
          return response.data.data;
        case CONFLICT_RESPONSE_CODE:
          setRequests(undefined);
          return [];
        default:
          return [];
      }
    } catch (error) {
      console.error(error);
      //TODO: Add toast.
      return [];
    }
  };

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-sent-requests"],
    queryFn: async () => await fetchRequests(),
    refetchInterval: 1000 * 60 * 10,
  });

  useEffect(() => setRequests(data), [data]);

  const filteredRequests = useMemo(() => {
    if (!requests) return [];
    if (!searchQuery) return requests;

    const query = searchQuery.toLowerCase();
    return requests.filter((f) => f.username.toLowerCase().includes(query));
  }, [requests, searchQuery]);

  const handleRetrieveRequest = async (username: string) => {
    try {
      const response = await axiosCredentialInstance.delete(
        `/follow/retrieve`,
        {
          data: { username },
        }
      );

      switch (response.status) {
        case OK_RESPONSE_CODE:
          await refetch();
          return;
        default:
          return;
      }
    } catch (error) {
      console.error(error);
      //TODO: Add toast.
      return;
    }
  };

  const confirmRetrieveRequest = (username: string) => {
    setSelectedUsernameToRemove(username);
    setIsRemoveConfirmationOpen(true);
  };

  const renderCell = useCallback((item: FollowUserDTO, columnKey: Key) => {
    switch (columnKey) {
      case "user":
        return (
          <User
            avatarProps={{ radius: "lg", src: item.image || undefined }}
            name={getFormattedNameAndSurname(item)}
          >
            <em>{item.username}</em>
          </User>
        );
      case "username":
        return (
          <Link href={`${PROJECT_URL}/user/${item.username}`} size="sm">
            @{item.username}
          </Link>
        );

      case "occurredAt":
        const date = new Date(item.occurredAt);
        return <span>{formatDate(date)}</span>;

      case "isFrozen":
        return <em>{item.isFrozen ? "Yes" : "No"}</em>;

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
              onPress={() => confirmRetrieveRequest(item.username)}
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
          {(item: FollowUserDTO) => (
            <TableRow key={item.username}>
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
                if (selectedUsernameToRemove) {
                  handleRetrieveRequest(selectedUsernameToRemove);
                }
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
