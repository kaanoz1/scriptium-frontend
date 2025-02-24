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
import {
    useState,
    useCallback,
    Key,
    useEffect,
    useMemo,
    FC,
    Fragment,
} from "react";
import {CiSearch} from "react-icons/ci";
import {RiUserShared2Line, RiUserUnfollowLine} from "react-icons/ri";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import LoadingSpinner from "./UI/LoadingSpinner";
import ReceivedRequestTableFollowerAcceptionConfirmationModal
    from "./ReceivedRequestTableFollowerAcceptionConfirmationModal";
import ReceivedRequestTableFollowerRejectionConfirmationModal
    from "./ReceivedRequestTableFollowerRejectionConfirmationModal";

const columns: Array<Column> = [
    {key: "user", label: "USER"},
    {key: "occurredAt", label: "RECEIVED AT"},
    {key: "isFrozen", label: "FROZEN?"},
    {key: "actions", label: "ACTIONS"},
];

const ReceivedRequestTable: FC = () => {
    const [requests, setRequests] = useState<Array<FollowUserDTO>>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [isAcceptConfirmationOpen, setIsAcceptConfirmationOpen] =
        useState(false);
    const [isRejectConfirmationOpen, setIsRejectConfirmationOpen] =
        useState(false);
    const [selectedUsername, setSelectedUsername] = useState<string>("");

    const fetchRequests = async (): Promise<Array<FollowUserDTO>> => {
        try {
            const response = await axiosCredentialInstance.get<
                Response<FollowUserDTO[]>
            >(`/follow/follower/0`);

            switch (response.status) {
                case OK_RESPONSE_CODE:
                    response.data.data.forEach((data) =>
                        arrangeImageAndReturns(data as ImageObject)
                    );

                    setRequests(response.data.data);
                    return response.data.data;
                case CONFLICT_RESPONSE_CODE:
                    setRequests([]);
                    return [];
                default:
                    return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const {
        data = null,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["user-received-requests"],
        queryFn: async () => await fetchRequests(),
        refetchInterval: 1000 * 60 * 10,
    });

    useEffect(() => setRequests([]), [data]);

    const filteredRequests = useMemo(() => {
        if (!requests) return [];
        if (!searchQuery) return requests;

        const query = searchQuery.toLowerCase();
        return requests.filter((f) => f.username.toLowerCase().includes(query));
    }, [requests, searchQuery]);

    const handleAcceptRequest = async (username: string) => {
        try {
            const response = await axiosCredentialInstance.put(`/follow/accept`, {
                username,
            });

            switch (response.status) {
                case OK_RESPONSE_CODE:
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

    const handleRejectRequest = async (username: string) => {
        try {
            const response = await axiosCredentialInstance.delete(`/follow/reject`, {
                data: {username},
            });
            switch (response.status) {
                case OK_RESPONSE_CODE:
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

    const confirmAcceptRequest = (username: string) => {
        setSelectedUsername(username);
        setIsAcceptConfirmationOpen(true);
    };

    const confirmRejectRequest = (username: string) => {
        setSelectedUsername(username);
        setIsRejectConfirmationOpen(true);
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
                                <strong>@{item.username}</strong>
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
                    <div className="flex items-center gap-2">
                        <Tooltip content="Accept request" placement="top" color="success">
                            <Button
                                color="success"
                                variant="light"
                                isIconOnly
                                onPress={() => confirmAcceptRequest(item.username)}
                            >
                                <RiUserShared2Line size={20}/>
                            </Button>
                        </Tooltip>
                        <Tooltip content="Reject request" placement="top" color="danger">
                            <Button
                                color="danger"
                                variant="light"
                                isIconOnly
                                onPress={() => confirmRejectRequest(item.username)}
                            >
                                <RiUserUnfollowLine size={20}/>
                            </Button>
                        </Tooltip>
                    </div>
                );

            default:
                return null;
        }
    }, []);

    if (isLoading) return <LoadingSpinner/>;

    return (
        <Fragment>
            <section className="flex flex-col gap-4">
                <Input
                    className="w-80"
                    placeholder="Search by username..."
                    startContent={<CiSearch/>}
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
                        {(item: FollowUserDTO) => (
                            <TableRow key={item.username}>
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
                handleAcceptRequest={handleAcceptRequest}
            />
            <ReceivedRequestTableFollowerRejectionConfirmationModal
                isModalOpen={isRejectConfirmationOpen}
                setIsModalOpen={setIsRejectConfirmationOpen}
                selectedUsernameToRejectToFollow={selectedUsername}
                handleRejectRequest={handleRejectRequest}
            />
        </Fragment>
    );
};

export default ReceivedRequestTable;
