import {Response} from "@/types/response";
import {Column, FollowUserDTO, ImageObject} from "@/types/types";
import {
    arrangeImageAndReturns,
    CONFLICT_RESPONSE_CODE, displayErrorToast,
    formatDate,
    getFormattedNameAndSurname,
    OK_RESPONSE_CODE,
    PROJECT_URL,
} from "@/util/utils";
import {Button} from "@heroui/button";
import {Link} from "@heroui/link";
import {Input} from "@heroui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/table";
import {Tooltip} from "@heroui/tooltip";
import {User} from "@heroui/user";
import {useQuery} from "@tanstack/react-query";
import {useState, useCallback, Key, useEffect, useMemo, FC} from "react";
import {CiSearch} from "react-icons/ci";
import {FaUserMinus} from "react-icons/fa";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import LoadingSpinner from "./UI/LoadingSpinner";
import FollowingTableUnfollowFollowingsConfirmationModal from "./FollowingTableUnfollowFollowingsConfirmationModal";

interface Props {
}

const columns: Array<Column> = [
    {key: "user", label: "USER"},
    {key: "username", label: "USERNAME"},
    {key: "occurredAt", label: "FOLLOWED AT"},
    {key: "isFrozen", label: "FROZEN?"},
    {key: "actions", label: "ACTIONS"},
];

const FollowingTable: FC<Props> = () => {
    const [following, setFollowing] = useState<FollowUserDTO[] | undefined>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isUnfollowConfirmationModalOpen, setIsUnfollowConfirmationModalOpen] =
        useState(false);
    const [selectedUsernameToUnfollow, setSelectedUsernameToRemove] =
        useState<string>("");

    const fetchFollowing = async (): Promise<Array<FollowUserDTO>> => {
        try {
            const response = await axiosCredentialInstance.get<
                Response<FollowUserDTO[]>
            >(`/follow/followed/1`, {withCredentials: true}); //Code 1 is for telling server that we are demanding the following(s) data.

            switch (response.status) {
                case OK_RESPONSE_CODE:
                    response.data.data.forEach((data) =>
                        arrangeImageAndReturns(data as ImageObject)
                    );

                    setFollowing(response.data.data);
                    return response.data.data;
                case CONFLICT_RESPONSE_CODE:
                    setFollowing(undefined);
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
        data = [],
        isLoading,
        refetch,
    } = useQuery<Array<FollowUserDTO>>({
        queryKey: ["user-following"],
        queryFn: async () => await fetchFollowing(),
        refetchInterval: 1000 * 10,
        refetchOnWindowFocus: false,
    });

    useEffect(() => setFollowing(data), [data]);

    const filteredFollowing = useMemo(() => {
        if (!following) return [];
        if (!searchQuery) return following;

        const query = searchQuery.toLowerCase();
        return following.filter((f) => f.username.toLowerCase().includes(query));
    }, [following, searchQuery]);

    const handleUnfollowUser = async (username: string) => {
        const response = await axiosCredentialInstance.delete(`/follow/unfollow`, {
            data: {username},
        });
        if (response.status == 200) await refetch();
    };

    const confirmUnfollowUser = (username: string) => {
        setSelectedUsernameToRemove(username);
        setIsUnfollowConfirmationModalOpen(true);
    };

    const renderCell = useCallback((item: FollowUserDTO, columnKey: Key) => {
        switch (columnKey) {
            case "user":
                return (
                    <User
                        avatarProps={{radius: "lg", src: item.image || undefined}}
                        name={getFormattedNameAndSurname(item)}
                        description={
                            <Link href={`${PROJECT_URL}/user/${item.username}`} size="sm">
                                <em>@{item.username}</em>
                            </Link>
                        }
                    >
                        {item.username}
                    </User>
                );

            case "occurredAt":
                const date = new Date(item.occurredAt);
                return <span>{formatDate(date)}</span>;

            case "isFrozen":
                return <em>{item.isFrozen ? "Yes" : "No"}</em>;

            case "actions":
                return (
                    <Tooltip content="Unfollow" placement="top" color="danger">
                        <Button
                            color="danger"
                            variant="light"
                            isIconOnly
                            onPress={() => confirmUnfollowUser(item.username)}
                        >
                            <FaUserMinus size={20}/>
                        </Button>
                    </Tooltip>
                );

            default:
                return null;
        }
    }, []);

    if (isLoading) return <LoadingSpinner/>;

    return (
        <div className="flex flex-col gap-4">
            <Input
                className="w-80"
                placeholder="Search by username..."
                startContent={<CiSearch/>}
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
                    {(item: FollowUserDTO) => (
                        <TableRow key={item.username}>
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
