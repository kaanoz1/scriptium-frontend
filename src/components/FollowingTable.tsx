import { Response } from "@/types/response";
import { Column } from "@/types/types";
import {
  CONFLICT_HTTP_RESPONSE_CODE,
  displayErrorToast,
  formatDate,
  getFormattedNameAndSurname, OK_HTTP_RESPONSE_CODE,
  PROJECT_URL,
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
import { useState, useCallback, Key, useMemo, FC } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUserMinus } from "react-icons/fa";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import LoadingSpinner from "./UI/LoadingSpinner";
import FollowingTableUnfollowFollowingsConfirmationModal from "./FollowingTableUnfollowFollowingsConfirmationModal";
import { FollowedUserDTO } from "@/types/classes/Follow";

interface Props {}

const fetchFollowing = async (): Promise<Array<FollowedUserDTO>> => {
  try {
    const response = await axiosCredentialInstance.get<
      Response<FollowedUserDTO[]>
    >(`/follow/followed/1`); //Code 1 is for telling server that we are demanding the following(s) data.

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
  { key: "occurredAt", label: "FOLLOWED AT" },
  { key: "isFrozen", label: "FROZEN?" },
  { key: "actions", label: "ACTIONS" },
];

const FollowingTable: FC<Props> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUnfollowConfirmationModalOpen, setIsUnfollowConfirmationModalOpen] =
    useState(false);
  const [selectedUsernameToUnfollow, setSelectedUsernameToRemove] =
    useState<string>("");

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery<Array<FollowedUserDTO>>({
    queryKey: ["user-following"],
    queryFn: async () => await fetchFollowing(),
    refetchInterval: 1000 * 10,
    refetchOnWindowFocus: false,
  });

  const filteredFollowing = useMemo(() => {
    if (!data) return [];
    if (!searchQuery) return data;

    const query = searchQuery.toLowerCase();
    return data.filter((f) =>
      f.getFollowedUser().getUsername().toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  const handleUnfollowUser = async (username: string) => {
    const response = await axiosCredentialInstance.delete(`/follow/unfollow`, {
      data: { username },
    });
    if (response.status == 200) await refetch();
  };

  const confirmUnfollowUser = (username: string) => {
    setSelectedUsernameToRemove(username);
    setIsUnfollowConfirmationModalOpen(true);
  };

  const renderCell = useCallback((item: FollowedUserDTO, columnKey: Key) => {
    const followedUser = item.getFollowedUser();
    const username = followedUser.getUsername();
    const image = followedUser.getImage();
    const occurredAt = item.getOccurredAt();
    const userIsFrozen = followedUser.getIsFrozen();
    switch (columnKey) {
      case "user":
        return (
          <User
            avatarProps={{ radius: "lg", src: image ?? "" }}
            name={getFormattedNameAndSurname(followedUser)}
            description={
              <Link href={`${PROJECT_URL}/user/${username}`} size="sm">
                <em>@{username}</em>
              </Link>
            }
          >
            {username}
          </User>
        );

      case "occurredAt":
        const date = new Date(occurredAt);
        return <span>{formatDate(date)}</span>;

      case "isFrozen":
        return <em>{userIsFrozen ? "Yes" : "No"}</em>;

      case "actions":
        return (
          <Tooltip content="Unfollow" placement="top" color="danger">
            <Button
              color="danger"
              variant="light"
              isIconOnly
              onPress={() => confirmUnfollowUser(username)}
            >
              <FaUserMinus size={20} />
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

      <Table aria-label="Following Table" selectionMode="none">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={filteredFollowing}
          emptyContent={
            !filteredFollowing || filteredFollowing.length === 0 ? (
              <div>
                {searchQuery
                  ? "No users match your search."
                  : "You are not following anyone."}
              </div>
            ) : undefined
          }
        >
          {(item: FollowedUserDTO) => (
            <TableRow key={item.getFollowedUser().getUsername()}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <FollowingTableUnfollowFollowingsConfirmationModal
        isModalOpen={isUnfollowConfirmationModalOpen}
        setIsModalOpen={setIsUnfollowConfirmationModalOpen}
        selectedUsernameToUnfollow={selectedUsernameToUnfollow}
        handleUnfollowUser={handleUnfollowUser}
      />
    </div>
  );
};

export default FollowingTable;
