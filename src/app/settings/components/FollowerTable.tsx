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
import { useState, useCallback, Key, useMemo, Fragment } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUserAltSlash } from "react-icons/fa";

import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import FollowerTableRemoveFollowersConfirmationModal from "./FollowerTableRemoveFollowersConfirmationModal";
import {
  OK_HTTP_RESPONSE_CODE,
  CONFLICT_HTTP_RESPONSE_CODE,
  TOOL_TIP_CLASS_NAMES,
} from "@/util/constants";
import { FollowerUser } from "@/types/classes/model/Follow/Follower/Follower";
import { formatDate } from "@/util/func";

interface Props {}

const FollowerTable: NextPage<Props> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRemoveConfirmationOpen, setIsRemoveConfirmationOpen] =
    useState(false);
  const [selectedUsernameToRemove, setSelectedUsernameToRemove] =
    useState<string>("");

  const fetchFollowers = async (): Promise<Array<FollowerUser>> => {
    try {
      const response = await axiosCredentialInstance.get<
        Response<Array<FollowerUser>>
      >(`/follow/follower/1`);

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

  const {
    data: followers = [],
    isLoading,
    refetch,
  } = useQuery<Array<FollowerUser>>({
    queryKey: ["user-followers"],
    queryFn: async () => await fetchFollowers(),
    refetchInterval: 1000 * 10,
  });

  const filteredFollowers = useMemo(() => {
    if (!followers) return [];
    if (!searchQuery) return followers;

    const query = searchQuery.toLowerCase();
    return followers.filter((f) =>
      f.getFollowerUser().getUsername().toLowerCase().includes(query)
    );
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

  const renderCell = useCallback((item: FollowerUser, columnKey: Key) => {
    const followerUser = item.getFollowerUser();
    const username = followerUser.getUsername();
    const imagePath = followerUser.getImage();
    const occuredAt = item.getOccurredAt();
    const isFrozen = followerUser.getIsFrozen();

    switch (columnKey) {
      case "user":
        return (
          <User
            avatarProps={
              imagePath
                ? { radius: "lg", src: imagePath }
                : {
                    radius: "lg",
                  }
            }
            name={followerUser.getFormattedName()}
          >
            {username}
          </User>
        );
      case "username":
        return (
          <Link
            href={`/user/${item.getFollowerUser().getUsername()}`}
            size="sm"
          >
            @{username}
          </Link>
        );

      case "occurredAt":
        const date = new Date(occuredAt);
        return <span>{formatDate(date)}</span>;

      case "isFrozen":
        return <em>{isFrozen ? "Yes" : "No"}</em>;

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
              onPress={() => confirmRemoveFollower(username)}
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
            {(item: FollowerUser) => (
              <TableRow key={item.getFollowerUser().getUsername()}>
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

const columns: Array<Column> = [
  { key: "user", label: "USER" },
  { key: "username", label: "USERNAME" },
  { key: "occurredAt", label: "FOLLOWED AT" },
  { key: "isFrozen", label: "FROZEN?" },
  { key: "actions", label: "ACTIONS" },
];
