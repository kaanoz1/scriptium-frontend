import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {AuthenticationRequestErrorCode, Response} from "@/types/response";
import {CollectionDTO, User, UserFetched} from "@/types/types";
import {
    displayErrorToast,
    INTERNAL_SERVER_ERROR_RESPONSE_CODE,
    MAX_USER_COLLECTION_COUNT,
    OK_RESPONSE_CODE,
    TOO_MANY_REQUEST_RESPONSE_CODE,
} from "@/util/utils";
import {useQuery} from "@tanstack/react-query";
import {NextPage} from "next";
import {Fragment, useState} from "react";
import LoadingSpinner from "./UI/LoadingSpinner";
import CollectionComponent from "./UI/CollectionComponent";
import {motion, Variants} from "framer-motion";
import {AiOutlineClose} from "react-icons/ai";
import ServerErrorComponent from "./UI/ServerErrorComponent";
import TooManyRequestComponent from "./UI/TooManyRequestComponent";
import CollectionUpdateModal from "./UI/CollectionUpdateModal";
import {Button} from "@heroui/button";
import {BsThreeDotsVertical} from "react-icons/bs";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/dropdown";
import CollectionDeleteModal from "./UI/CollectionDeleteModal";
import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa";
import CreateCollectionCard from "./UI/CreateCollectionCard";

interface Props {
    user: User | UserFetched;
}

const containerVariants: Variants = {
    show: {
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.3, ease: "easeInOut"},
    },
};

const UserSavingComponent: NextPage<Props> = ({user}) => {
    const [error, setError] = useState<
        AuthenticationRequestErrorCode | undefined
    >(undefined);
    const [selectedCollection, setSelectedCollection] =
        useState<CollectionDTO | null>(null);

    const [targetCollection, setTargetCollection] =
        useState<CollectionDTO | null>(null);

    const [isCollectionUpdateModelOpen, setIsCollectionUpdateModalOpen] =
        useState<boolean>(false);

    const [isCollectionDeleteModelOpen, setIsCollectionDeleteModalOpen] =
        useState<boolean>(false);

    const fetchCollections = async () => {
        try {
            const response = await axiosCredentialInstance.get<
                Response<Array<CollectionDTO>>
            >(`/collection/`);

            switch (response.status) {
                case OK_RESPONSE_CODE:
                    setError(undefined);
                    return response.data.data;
                case TOO_MANY_REQUEST_RESPONSE_CODE:
                    setError(TOO_MANY_REQUEST_RESPONSE_CODE);
                    return [];
                default:
                    setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
                    return [];
            }
        } catch (error) {
            console.error(error);
            setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);

            displayErrorToast(error);

            return [];
        }
    };

    const {
        isLoading,
        data: collections = [],
        refetch,
    } = useQuery({
        queryKey: ["collections", user?.id],
        queryFn: fetchCollections,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <LoadingSpinner/>;

    if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
        return <TooManyRequestComponent/>;

    if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
        return <ServerErrorComponent/>;

    return (
        <Fragment>
            <main className="w-full max-w-3xl mx-auto px-4 py-6">
                {selectedCollection ? (
                    <motion.div
                        className="relative"
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.4}}
                    >
                        <motion.button
                            className="absolute z-10 top-12 right-12 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                            onClick={() => setSelectedCollection(null)}
                        >
                            <AiOutlineClose size={20}/>
                        </motion.button>
                        <CollectionComponent collection={selectedCollection}/>
                    </motion.div>
                ) : (
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
                            Your Collections
                        </h1>
                        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
                            You can see about your collections, clicking them will direct you
                            for inspecting collection.
                        </p>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 "
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            {collections.map((collection, i) => (
                                <motion.div
                                    key={collection.name + i}
                                    className="w-full p-4 rounded-lg bg-white dark:bg-neutral-900 shadow-md cursor-pointer hover:shadow-lg"
                                    variants={cardVariants}
                                    onClick={() => setSelectedCollection(collection)}
                                >
                                    <header
                                        className="flex justify-between text-xl font-semibold text-gray-800 dark:text-gray-100 ">
                                        <span>{collection.name}</span>{" "}
                                        <div>
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button variant="light" isIconOnly size="sm">
                                                        <BsThreeDotsVertical/>
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu
                                                    aria-label="Dropdown menu for collectionActions"
                                                    variant="faded"
                                                    title="Actions"
                                                    onAction={(key) => {
                                                        setTargetCollection(() => collection);
                                                        setIsCollectionDeleteModalOpen(false);
                                                        setIsCollectionUpdateModalOpen(false);

                                                        switch (key) {
                                                            case "update":
                                                                setIsCollectionUpdateModalOpen(true);
                                                                return;
                                                            case "delete":
                                                                setIsCollectionDeleteModalOpen(true);
                                                                return;
                                                            default:
                                                                return;
                                                        }
                                                    }}
                                                >
                                                    <DropdownItem
                                                        key="update"
                                                        color="warning"
                                                        description="You can put a new name or description to this collection"
                                                        startContent={<FaRegEdit/>}
                                                    >
                                                        Update this collection
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        key="delete"
                                                        color="danger"
                                                        description="Allows you to delete this collection"
                                                        startContent={<FaRegTrashAlt/>}
                                                    >
                                                        Delete this collection
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </header>
                                    {collection.description && (
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                                            {collection.description}
                                        </p>
                                    )}
                                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        {collection.saveCount} saving.
                                    </div>
                                </motion.div>
                            ))}
                            {MAX_USER_COLLECTION_COUNT > collections.length && (
                                <CreateCollectionCard refetchDataFunction={refetch}/>
                            )}
                        </motion.div>
                    </div>
                )}
            </main>

            <CollectionUpdateModal
                isModalOpen={isCollectionUpdateModelOpen}
                setIsModalOpen={setIsCollectionUpdateModalOpen}
                collection={targetCollection}
                refetchDataFunction={refetch}
            />
            <CollectionDeleteModal
                isModalOpen={isCollectionDeleteModelOpen}
                setIsModalOpen={setIsCollectionDeleteModalOpen}
                collection={targetCollection}
                refetchDataFunction={refetch}
            />
        </Fragment>
    );
};

export default UserSavingComponent;
