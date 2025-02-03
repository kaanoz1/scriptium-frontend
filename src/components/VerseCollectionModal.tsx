import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { useUser } from "@/hooks/useUser";
import { AuthenticationRequestErrorCode, Response } from "@/types/response";
import { CollectionWithVerseSavedInformationDTO, User } from "@/types/types";
import {
  CONFLICT_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  MAX_USER_COLLECTION_COUNT,
  NOT_FOUND_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  SIGN_IN_URL,
  TOO_MANY_REQUEST_RESPONSE_CODE,
} from "@/util/utils";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import TooManyRequestComponent from "./UI/TooManyRequestComponent";
import ServerErrorComponent from "./UI/ServerErrorComponent";
import { FiLogIn } from "react-icons/fi";
import VerseCollectionCard from "./VerseCollectionCard";
import { Link } from "@heroui/link";
import CreateCollectionCard from "./UI/CreateCollectionCard";
import LoadingSpinner from "./UI/LoadingSpinner";

interface Props {
  isCollectionModalOpen: boolean;
  setIsCollectionModalOpen: Dispatch<SetStateAction<boolean>>;
  verseId: number;
  setIsSaved: Dispatch<SetStateAction<boolean>>;
}

const CollectionModal: NextPage<Props> = ({
  isCollectionModalOpen,
  setIsCollectionModalOpen,
  setIsSaved,
  verseId,
}) => {
  const [error, setError] = useState<
    AuthenticationRequestErrorCode | undefined
  >(undefined);

  const [selectedCollectionNames, setSelectedCollectionNames] = useState<
    Set<string>
  >(new Set<string>([]));

  const { user, isLoading: isUserLoading } = useUser();

  const fetchCollections = async (user: User | null) => {
    if (!user) return [];

    try {
      const response = await axiosCredentialInstance.get<
        Response<CollectionWithVerseSavedInformationDTO[]>
      >(`/collection/verse/${verseId}`);

      switch (response.status) {
        case OK_RESPONSE_CODE:
          setError(undefined);
          return response.data.data;
        case NOT_FOUND_RESPONSE_CODE:
          setError(NOT_FOUND_RESPONSE_CODE);
          return null;
        case TOO_MANY_REQUEST_RESPONSE_CODE:
          setError(TOO_MANY_REQUEST_RESPONSE_CODE);
          return null;
        default:
          setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
          return null;
      }
    } catch (err) {
      setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
      return [];
    }
  };

  const {
    data: collections,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["collections-verse", user?.id, verseId],
    queryFn: () => fetchCollections(user),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const saveVerseToCollection = async () => {
    const response = await axiosCredentialInstance.post(`/saving/save`, {
      collectionNames: [...Array.from(selectedCollectionNames)],
      verseId,
    });

    switch (response.status) {
      case OK_RESPONSE_CODE:
      case CONFLICT_RESPONSE_CODE:
        setIsSaved(true);
        setSelectedCollectionNames(new Set<string>());
        setIsCollectionModalOpen(false);
        await refetch();
        return;
      default:
        setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
        return;
    }
  };

  if (isLoading || isUserLoading) return <LoadingSpinner />;

  if (error && error == TOO_MANY_REQUEST_RESPONSE_CODE)
    return <TooManyRequestComponent />;

  if (
    (error && error == INTERNAL_SERVER_ERROR_RESPONSE_CODE) ||
    collections == undefined
  )
    return <ServerErrorComponent />;

  return (
    <Modal
      onOpenChange={() => setIsCollectionModalOpen(false)}
      isOpen={isCollectionModalOpen}
      backdrop="opaque"
      size="3xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Your Collections
        </ModalHeader>
        <ModalBody>
          <div className="w-full flex flex-col">
            {isLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <Spinner color="default" size="lg" />
              </div>
            ) : (
              <div className="space-y-3 p-4 overflow-y-auto">
                {user ? (
                  <Fragment>
                    {" "}
                    {collections.length > 0 && (
                      <div className="space-y-2">
                        {collections.map((c, i) => (
                          <VerseCollectionCard
                            setSelectedCollectionNames={
                              setSelectedCollectionNames
                            }
                            key={i}
                            collection={c}
                          />
                        ))}
                      </div>
                    )}
                    {collections.length < MAX_USER_COLLECTION_COUNT && (
                      <CreateCollectionCard refetchDataFunction={refetch} />
                    )}
                  </Fragment>
                ) : (
                  <div className="flex items-center gap-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-neutral-200 dark:bg-neutral-700 p-4 text-gray-800 dark:text-gray-200">
                    <FiLogIn size={28} className="text-current" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-md mb-1">
                        Sign In Required
                      </span>
                      <p className="text-sm leading-5">
                        You must{" "}
                        <Link
                          href={SIGN_IN_URL}
                          className="underline font-medium hover:text-black dark:hover:text-gray-300"
                        >
                          log in
                        </Link>{" "}
                        to save this verse.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          {selectedCollectionNames.size != 0 ? (
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="light"
                color="success"
                onPress={saveVerseToCollection}
              >
                Save
              </Button>
            </motion.div>
          ) : undefined}
          <Button
            variant="light"
            onPress={() => setIsCollectionModalOpen(false)}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CollectionModal;
