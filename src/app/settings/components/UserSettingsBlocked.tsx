"use client";
import { NextPage } from "next";
import {
  CONFLICT_HTTP_RESPONSE_CODE,
  displayErrorToast,
  formatDate,
  getFormattedNameAndSurname,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  OK_HTTP_RESPONSE_CODE,
  PROJECT_URL,
  TOOL_TIP_CLASS_NAMES,
} from "@/util/utils";
import { useState, useMemo, Key } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Selection,
} from "@heroui/table";
import { User } from "@heroui/user";
import { Link } from "@heroui/link";
import { CgUnblock } from "react-icons/cg";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import { Tooltip } from "@heroui/tooltip";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { useQuery } from "@tanstack/react-query";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import LoadingSpinnerFullH from "../../../components/UI/LoadingSpinnerFullH";
import { Column, Toast } from "@/types/types";
import UserSettingsPageUnblockConfirmationModal from "../../../components/UserSettingsPageUnblockConfirmationModal";
import { addToast } from "@heroui/toast";
import { BlockDTO } from "@/types/classes/Block";

type GetBlockedResponse = {
  data: Array<BlockDTO>;
};

const fetchBlockedUsers = async (): Promise<BlockDTO[]> => {
  try {
    const response = await axiosCredentialInstance.get<GetBlockedResponse>(
      `/block`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const UserSettingsBlocked: NextPage = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set([]));

  const [isUnblockConfirmationOpen, setIsUnblockConfirmationOpen] =
    useState(false);
  const [selectedUsername, setSelectedUsername] = useState<
    string | undefined
  >();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: blockedUsers = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<BlockDTO[]>({
    queryKey: ["blocked-users"],
    queryFn: async () => await fetchBlockedUsers(),
    refetchInterval: 1000 * 30,
  });

  const filteredBlockedUsers = useMemo(() => {
    if (!searchQuery) return blockedUsers;
    return blockedUsers.filter((dto) =>
      dto
        .getBlockedUser()
        .getUsername()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [blockedUsers, searchQuery]);

  const handleUnblockUser = async () => {
    if (!selectedUsername) return;

    const response = await axiosCredentialInstance.delete(`/block/unblock`, {
      data: { username: selectedUsername },
    });

    switch (response.status) {
      case CONFLICT_HTTP_RESPONSE_CODE:
      case OK_HTTP_RESPONSE_CODE:
        await refetch();
        return;
      default:
        const couldnotUnblockToast: Toast = {
          title: "Couldn't be blocked.",
          description:
            "User may already unblocked or it has never been blocked.",
        };
        addToast(couldnotUnblockToast);

        return;
    }
  };

  const handleUnblockMass = async () => {
    let usernamesToUnblock: string[];

    usernamesToUnblock = filteredBlockedUsers
      .filter((dto) =>
        (selectedKeys as Set<string>).has(dto.getBlockedUser().getId())
      )
      .map((dto) => dto.getBlockedUser().getId());

    if (usernamesToUnblock.length === 0) {
      const noUserToUnblock: Toast = {
        title: "You did not select any user to unblock.",
        color: "warning",
      };
      addToast(noUserToUnblock);
      return;
    }

    try {
      const response = await axiosCredentialInstance.delete(
        `/block/unblock/mass`,
        {
          data: { usernames: usernamesToUnblock },
        }
      );

      switch (response.status) {
        case CONFLICT_HTTP_RESPONSE_CODE:
        case OK_HTTP_RESPONSE_CODE:
          await refetch();
          return;

        case NOT_FOUND_HTTP_RESPONSE_CODE:
          await refetch();

          const someUsersNotFoundToast: Toast = {
            title: "Some users you are trying to unblock not found.",
            description:
              "Some users might deleted their account or you have already unblocked them.",
            color: "warning",
          };
          addToast(someUsersNotFoundToast);

          return;
        default:
          const couldnotUnblockedToast: Toast = {
            title: "Could not be unblocked.",
            description: "Users could not be unblocked. Try again later.",
            color: "warning",
          };

          addToast(couldnotUnblockedToast);

          return;
      }
    } catch (error) {
      console.error(error);
      displayErrorToast(error);
      return;
    }
  };

  const columns: Array<Column> = [
    {
      key: "user",
      label: "USER",
    },
    {
      key: "username",
      label: "USERNAME",
    },
    {
      key: "reason",
      label: "REASON",
    },
    {
      key: "blocked_at",
      label: "BLOCKED AT",
    },
    {
      key: "process",
      label: "PROCESS",
    },
  ];

  const renderCell = (dto: BlockDTO, columnKey: Key) => {
    const cellValue = dto[columnKey as keyof BlockDTO];
    const blockedUser = dto.getBlockedUser();
    const usernameOfBlockedUser = blockedUser.getUsername();
    const blockReason = dto.getReason();
    const imagePath = blockedUser.getImage();

    switch (columnKey) {
      case "user":
        return (
          <User
            avatarProps={{ radius: "lg", src: "" }}
            name={getFormattedNameAndSurname(blockedUser)}
          />
        );
      case "username":
        return (
          <Link href={`${PROJECT_URL}/user/${usernameOfBlockedUser}`} size="sm">
            @{usernameOfBlockedUser}
          </Link>
        );
      case "reason":
        return blockReason ? (
          <span>{blockReason}</span>
        ) : (
          <span className="italic">No reason specified</span>
        );
      case "blocked_at":
        const blockedAt = dto.getBlockedAt();
        return <span>{formatDate(blockedAt)}</span>;
      case "process":
        return (
          <Tooltip
            content="Unblock"
            showArrow
            classNames={TOOL_TIP_CLASS_NAMES}
          >
            <Button
              onPress={() => {
                setIsUnblockConfirmationOpen(true);
                setSelectedUsername(usernameOfBlockedUser);
              }}
              variant="light"
              color="danger"
              isIconOnly
              aria-label={`Unblock ${usernameOfBlockedUser}`}
            >
              <CgUnblock size={30} />
            </Button>
          </Tooltip>
        );
      default:
        return <>{cellValue}</>;
    }
  };

  if (isLoading) return <LoadingSpinnerFullH />;

  if (isError)
    return (
      <div className="flex flex-col items-center py-10 px-4 min-h-screen">
        <p className="text-red-500">
          Failed to fetch blocked users. Please try again.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col items-center py-10 px-4 min-h-screen">
      <div className="w-full">
        <h2 className="mb-8 font-bold text-2xl">Users You Have Blocked</h2>

        <div className="w-full mb-6 flex justify-between">
          <Input
            className="w-80"
            placeholder="Search by username..."
            startContent={<CiSearch />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-2">
            <Dropdown closeOnSelect={false}>
              <DropdownTrigger>
                <Button color="warning" startContent={<IoFilter />}>
                  Sort
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Sorting Options" selectionMode="single">
                <DropdownItem key="username-asc">Username (A-Z)</DropdownItem>
                <DropdownItem key="username-des">Username (Z-A)</DropdownItem>
                <DropdownItem key="blocked_at-asc">
                  Blocked At (Oldest First)
                </DropdownItem>
                <DropdownItem key="blocked_at-des">
                  Blocked At (Newest First)
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <div>
              <Tooltip
                showArrow
                placement="top"
                content={
                  selectedKeys.size >= 2
                    ? "Unblock selected users."
                    : "You should select at least 2 users to unblock."
                }
                offset={20}
                classNames={TOOL_TIP_CLASS_NAMES}
                closeDelay={0}
                delay={0}
              >
                <span>
                  <Button
                    isDisabled={selectedKeys.size < 2}
                    color="primary"
                    startContent={<CgUnblock size={25} />}
                    onPress={handleUnblockMass}
                    aria-label="Unblock selected users"
                  >
                    Unblock selected
                  </Button>
                </span>
              </Tooltip>
            </div>
          </div>
        </div>

        <Table
          color="default"
          removeWrapper
          isStriped
          selectedKeys={selectedKeys as Selection}
          selectionMode={
            filteredBlockedUsers.length !== 0 ? "multiple" : "none"
          }
          onSelectionChange={setSelectedKeys as (keys: Selection) => void} //Even if it takes Set<Key>, Selection type what it should be. But Selection can only be "all" whenever we manually set it to be. since we don't do that, so we don't need to take any caution for that.
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={
              filteredBlockedUsers.length !== 0 ? undefined : searchQuery ? (
                <span>You have not blocked any users with that username.</span>
              ) : (
                <span>You have not blocked any users.</span>
              )
            }
            items={filteredBlockedUsers}
          >
            {(item) => (
              <TableRow key={item.getBlockedUser().getId()}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <UserSettingsPageUnblockConfirmationModal
          isModalOpen={isUnblockConfirmationOpen}
          setIsModalOpen={setIsUnblockConfirmationOpen}
          handleUnblockUser={handleUnblockUser}
        />
      </div>
    </div>
  );
};

export default UserSettingsBlocked;
