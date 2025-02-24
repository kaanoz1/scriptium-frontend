import {FC, Fragment, Key, useCallback, useMemo, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {AuthenticationRequestErrorCode, Response} from "@/types/response";
import {
    VerseCollectionDTO,
    CollectionDTO,
    TranslationWithSingleTextDTO,
} from "@/types/types";
import {
    displayErrorToast,
    INTERNAL_SERVER_ERROR_RESPONSE_CODE,
    METHOD_NOT_ALLOWED_RESPONSE_CODE,
    NOT_FOUND_RESPONSE_CODE,
    OK_RESPONSE_CODE,
    TOO_MANY_REQUEST_RESPONSE_CODE,
    UNDEFINED_TRANSLATION_TEXT_COLLECTION,
} from "@/util/utils";

import LoadingSpinner from "./LoadingSpinner";
import ServerErrorComponent from "./ServerErrorComponent";
import TooManyRequestComponent from "./TooManyRequestComponent";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/table";
import {Pagination} from "@heroui/pagination";
import {Spinner} from "@heroui/spinner";
import CollectionVerseTableRow from "./CollectionVerseTableRow";
import {useScripture} from "@/hooks/useScripture";
import {motion, Variants} from "framer-motion";

const ROWS_PER_PAGE: number = 30;

const tableWrapperVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};

interface Props {
    collection: CollectionDTO;
}

const CollectionComponent: FC<Props> = ({collection}) => {
    const [error, setError] = useState<
        AuthenticationRequestErrorCode | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);

    const {preferredScriptureContext} = useScripture();

    const fetchCollectionVerses = async (): Promise<
        Array<VerseCollectionDTO>
    > => {
        try {
            const response = await axiosCredentialInstance.get<
                Response<VerseCollectionDTO[]>
            >(`/collection/${collection.id}?page=${page}`);

            switch (response.status) {
                case OK_RESPONSE_CODE:
                    setError(undefined);
                    return response.data.data;
                case NOT_FOUND_RESPONSE_CODE:
                    setError(NOT_FOUND_RESPONSE_CODE);
                    return [];
                case TOO_MANY_REQUEST_RESPONSE_CODE:
                    setError(TOO_MANY_REQUEST_RESPONSE_CODE);
                    return [];
                case METHOD_NOT_ALLOWED_RESPONSE_CODE:
                    setError(METHOD_NOT_ALLOWED_RESPONSE_CODE);
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
        data = [],
        isLoading,
        refetch,
    } = useQuery<Array<VerseCollectionDTO>>({
        queryKey: ["collection-verses", page, collection.id],
        queryFn: async () => await fetchCollectionVerses(),
        refetchOnWindowFocus: false,
    });

    const getKeyValue = useCallback(
        (verse: VerseCollectionDTO, columnKey: Key) => {
            const preferredScriptureOptions =
                preferredScriptureContext[verse.section.scripture.code];

            const translation: TranslationWithSingleTextDTO =
                verse.translations.find((t) =>
                    preferredScriptureOptions.preferredTranslationIdSingle.has(
                        t.translation.id.toString()
                    )
                ) ?? UNDEFINED_TRANSLATION_TEXT_COLLECTION;

            switch (columnKey) {
                case "verse":
                    return (
                        <CollectionVerseTableRow
                            verse={verse}
                            translationText={translation.translationText}
                            font={preferredScriptureOptions.preferredScriptureFont}
                            variation={
                                preferredScriptureOptions.preferredScriptureVerseTextVariation
                            }
                            refetchDataFunction={refetch}
                            collection={collection}
                        />
                    );
                default:
                    return <></>;
            }
        },
        [preferredScriptureContext, collection, refetch]
    );

    const totalPages = useMemo(() => {
        return collection.saveCount > 0
            ? Math.ceil(collection.saveCount / ROWS_PER_PAGE)
            : 0;
    }, [collection.saveCount]);

    if (isLoading) return <LoadingSpinner/>;

    if (error && error === NOT_FOUND_RESPONSE_CODE) return <></>; // TODO: NotFound handle.
    if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
        return <TooManyRequestComponent/>;
    if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
        return <ServerErrorComponent/>;

    return (
        <Fragment>
            <motion.section
                className="w-full max-w-7xl mx-auto px-4 py-6 bg-white dark:bg-dark2 rounded-lg shadow-md text-gray-800 dark:text-gray-200"
                variants={tableWrapperVariants}
                initial="hidden"
                animate="visible"
            >
                <Table
                    aria-label="Table with client async pagination"
                    bottomContent={
                        totalPages > 1 ? (
                            <div className="flex w-full justify-center mt-4">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={totalPages}
                                    onChange={(pageValue) => setPage(pageValue)}
                                />
                            </div>
                        ) : null
                    }
                >
                    <TableHeader>
                        <TableColumn
                            key="verse"
                            className="text-lg font-semibold flex items-center"
                        >
                            <strong>{collection.name}</strong>
                            <em>
                                {collection.description && (
                                    <span className="text-sm">{` - ${collection.description}`}</span>
                                )}
                            </em>
                        </TableColumn>
                    </TableHeader>

                    <TableBody
                        emptyContent={
                            data.length === 0
                                ? "There is no saving in this collection."
                                : null
                        }
                        items={data}
                        loadingContent={<Spinner/>}
                        loadingState={isLoading ? "loading" : "idle"}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </motion.section>
        </Fragment>
    );
};

export default CollectionComponent;
