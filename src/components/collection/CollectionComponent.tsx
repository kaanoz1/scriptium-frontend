import {
  Dispatch,
  FC,
  Fragment,
  Key,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";
import { Response, T_AuthenticationRequestErrorCode } from "@/types/response";
import { RefetchDataFunctionType } from "@/types/types";
import { displayErrorToast } from "@/util/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { Spinner } from "@heroui/spinner";
import CollectionVerseTableRow from "./CollectionVerseTableRow";
import { motion, Variants } from "framer-motion";
import { Collection } from "@/types/classes/model/Collection/Collection";

import {
  OK_HTTP_RESPONSE_CODE,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  METHOD_NOT_ALLOWED_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { useScripturePreferences } from "@/hooks/useScripture";
import {
  VerseUpper,
  T_VerseUpperConstructorParametersJSON,
} from "@/types/classes/model/Verse/Verse/VerseUpper/VerseUpper";
import { VerseBase } from "@/types/classes/model/Verse/VerseBase/VerseBase";
import LoadingSpinner from "../UI/LoadingSpinner";
import ServerError from "../UI/ServerError";
import TooManyRequest from "../UI/TooManyRequest";

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

const fetchCollectionVerses = async (
  collection: Collection,
  page: number,
  setError: Dispatch<
    SetStateAction<T_AuthenticationRequestErrorCode | undefined>
  >
): Promise<Array<VerseUpper>> => {
  try {
    const response = await axiosCredentialInstance.get<
      Response<T_VerseUpperConstructorParametersJSON[]>
    >(`/collection/${collection.getId()}?page=${page}`);

    switch (response.status) {
      case OK_HTTP_RESPONSE_CODE:
        setError(undefined);
        return response.data.data.map(VerseUpper.createFromJSON);
      case NOT_FOUND_HTTP_RESPONSE_CODE:
        setError(NOT_FOUND_HTTP_RESPONSE_CODE);
        return [];
      case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
        setError(TOO_MANY_REQUEST_HTTP_RESPONSE_CODE);
        return [];
      case METHOD_NOT_ALLOWED_HTTP_RESPONSE_CODE:
        setError(METHOD_NOT_ALLOWED_HTTP_RESPONSE_CODE);
        return [];
      default:
        setError(INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE);
        return [];
    }
  } catch (error) {
    console.error(error);
    setError(INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE);

    displayErrorToast(error);

    return [];
  }
};

export const handleUnsaveClick = async (
  verse: VerseBase,
  collection: Collection,
  refetchDataFunction: RefetchDataFunctionType<unknown>,
  setStateActionFunctionForUnsaveLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setStateActionFunctionForUnsaveLoading(true);
    const response = await axiosCredentialInstance.delete(`/saving/unsave`, {
      data: {
        verseId: verse.getId(),
        collectionNames: [collection.getName()],
      },
    });

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      await refetchDataFunction();
    }
  } finally {
    setStateActionFunctionForUnsaveLoading(false);
  }
};

interface Props {
  collection: Collection;
}

const CollectionComponent: FC<Props> = ({ collection }) => {
  const [error, setError] = useState<
    T_AuthenticationRequestErrorCode | undefined
  >(undefined);
  const [page, setPage] = useState<number>(1);

  const { preference } = useScripturePreferences("t");

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery<Array<VerseUpper>>({
    queryKey: ["collection-verses", page, collection.getId()],
    queryFn: async () =>
      await fetchCollectionVerses(collection, page, setError),
    refetchOnWindowFocus: false,
  });

  const getKeyValue = useCallback(
    (verse: VerseUpper, columnKey: Key) => {
      switch (columnKey) {
        case "verse":
          return (
            <CollectionVerseTableRow
              collection={collection}
              verse={verse}
              preference={preference}
              refetchDataFunction={refetch}
            />
          );
        default:
          return <></>;
      }
    },
    [collection, refetch]
  );

  const totalPages = useMemo(() => {
    return collection.getSaveCount() > 0
      ? Math.ceil(collection.getSaveCount() / ROWS_PER_PAGE)
      : 0;
  }, [collection.getSaveCount()]);

  if (isLoading) return <LoadingSpinner />;

  if (error && error === NOT_FOUND_HTTP_RESPONSE_CODE) return <></>; // TODO: NotFound handle.
  if (error && error === TOO_MANY_REQUEST_HTTP_RESPONSE_CODE)
    return <TooManyRequest />;
  if (error && error === INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE)
    return <ServerError />;

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
              <strong>{collection.getName()}</strong>
              <em>
                {collection.getDescription() && (
                  <span className="text-sm">{` - ${collection.getDescription()}`}</span>
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
            loadingContent={<Spinner />}
            loadingState={isLoading ? "loading" : "idle"}
          >
            {(item) => (
              <TableRow key={item.getId()}>
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
