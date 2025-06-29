import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { CollectionDTO } from "@/types/classes/Collection";
import { ResponseMessage } from "@/types/response";
import { RefetchDataFunctionType } from "@/types/types";
import {
  OK_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { displayErrorToast } from "@/util/utils";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { QueryClient } from "@tanstack/react-query";
import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  collection: CollectionDTO | null;
  queryKey: readonly unknown[];
  queryClient: QueryClient;
}

type DeleteCollectionForm = {
  root?: {
    message?: string;
  };
};

const CollectionDeleteModal: FC<Props> = ({
  collection,
  setIsModalOpen,
  isModalOpen,
  queryClient,
  queryKey,
}) => {
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DeleteCollectionForm>();

  if (collection == null) {
    setIsModalOpen(false);
    return null;
  }

  const onSubmit = async () => {
    if (!collection) return;

    try {
      const response = await axiosCredentialInstance.delete<ResponseMessage>(
        `/collection/delete`,
        { data: { collectionId: collection.getId() } }
      );

      switch (response.status) {
        case OK_HTTP_RESPONSE_CODE: {
          // ✅ QueryClient cache'inden sil
          queryClient.setQueryData<CollectionDTO[]>(
            queryKey,
            (prev) =>
              prev?.filter((c) => c.getId() !== collection.getId()) ?? []
          );

          addToast({
            title: "Collection Deleted",
            description: `The collection "${collection.getName()}" was successfully deleted.`,
            color: "success",
          });

          setIsModalOpen(false);
          return;
        }

        case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
          setError("root", {
            message:
              "You're deleting too frequently. Please slow down and try again later.",
          });
          return;

        default:
          setError("root", {
            message:
              "Unexpected error occurred. This might be on our side. Please try again later.",
          });
          return;
      }
    } catch (error) {
      setError("root", {
        message: "An error occurred while deleting the collection.",
      });

      console.error(error);
      displayErrorToast(error);
    }
  };

  const handleSave = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Modal
      onOpenChange={() => setIsModalOpen(false)}
      isOpen={isModalOpen}
      backdrop="opaque"
      size="2xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Delete collection <em>{collection.getName()}</em>
        </ModalHeader>
        <ModalBody>
          {" "}
          {errors.root?.message && (
            <p className="text-red-500 mb-2">{errors.root.message}</p>
          )}
          <p>
            Are you sure you want to delete the collection named:{" "}
            {collection.getName()}?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" isLoading={isSubmitting} onPress={handleSave}>
            Delete
          </Button>
          <Button variant="light" onPress={() => setIsModalOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CollectionDeleteModal;
