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
import { useState, useCallback, Key, useMemo, Fragment } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUserAltSlash } from "react-icons/fa";

import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import LoadingSpinner from "./UI/LoadingSpinner";
import FollowerTableRemoveFollowersConfirmationModal from "./FollowerTableRemoveFollowersConfirmationModal";

interface Props {}

const columns: Array<Column> = [
  { key: "user", label: "USER" },
  { key: "username", label: "USERNAME" },
  { key: "occurredAt", label: "FOLLOWED AT" },
  { key: "isFrozen", label: "FROZEN?" },
  { key: "actions", label: "ACTIONS" },
];

const FollowerTable: NextPage<Props> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRemoveConfirmationOpen, setIsRemoveConfirmationOpen] =
    useState(false);
  const [selectedUsernameToRemove, setSelectedUsernameToRemove] =
    useState<string>("");

  const fetchFollowers = async (): Promise<Array<FollowUserDTO>> => {
    try {
      const response = await axiosCredentialInstance.get<
        Response<Array<FollowUserDTO>>
      >(`/follow/follower/1`);

      switch (response.status) {
        case OK_RESPONSE_CODE:
          response.data.data.forEach((data) =>
            arrangeImageAndReturns(data as ImageObject)
          );

          return response.data.data;
        case CONFLICT_RESPONSE_CODE:
          return [];
        default:
          return [];
      }
    } catch (error) {
      console.error(error);
      //TODO:Add toast.
      return [];
    }
  };

  const {
    data: followers = [],
    isLoading,
    refetch,
  } = useQuery<Array<FollowUserDTO>>({
    queryKey: ["user-followers"],
    queryFn: async () => await fetchFollowers(),
    refetchInterval: 1000 * 10,
  });

  const filteredFollowers = useMemo(() => {
    if (!followers) return [];
    if (!searchQuery) return followers;

    const query = searchQuery.toLowerCase();
    return followers.filter((f) => f.username.toLowerCase().includes(query));
  }, [followers, searchQuery]);

  const handleRemoveFollower = async (username: string) => {
    const response = await axiosCredentialInstance.delete(`/follow/remove`, {
      data: { username },
    });
    if (response.status == 200) await refetch();
  };

  const confirmRemoveFollower = (username: string) => {
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
            {item.username}
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
            content="Remove follower"
            placement="top"
            color="danger"
            classNames={TOOL_TIP_CLASS_NAMES}
          >
            <Button
              color="danger"
              variant="light"
              isIconOnly
              onPress={() => confirmRemoveFollower(item.username)}
            >
              <FaUserAltSlash size={20} />
            </Button>
          </Tooltip>
        );

      default:
        return null;
    }
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Fragment>
      <main className="flex flex-col gap-4">
        <Input
          className="w-80"
          placeholder="Search by username..."
          startContent={<CiSearch />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Table aria-label="Followers Table" selectionMode="none">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={filteredFollowers}
            emptyContent={
              !filteredFollowers || filteredFollowers.length === 0 ? (
                <div>
                  {searchQuery
                    ? "No followers match your search."
                    : "No followers to display."}
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
      </main>

      <FollowerTableRemoveFollowersConfirmationModal
        isModalOpen={isRemoveConfirmationOpen}
        setIsModalOpen={setIsRemoveConfirmationOpen}
        selectedUsernameToRemove={selectedUsernameToRemove}
        handleRemoveFollower={handleRemoveFollower}
      />
    </Fragment>
  );
};

export default FollowerTable;
