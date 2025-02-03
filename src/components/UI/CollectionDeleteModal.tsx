import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { ResponseMessage } from "@/types/response";
import { RefetchDataFunctionType, CollectionDTO } from "@/types/types";
import { OK_RESPONSE_CODE, TOO_MANY_REQUEST_RESPONSE_CODE } from "@/util/utils";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  refetchDataFunction: RefetchDataFunctionType;
  collection: CollectionDTO | null;
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
  refetchDataFunction,
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
    try {
      const response = await axiosCredentialInstance.delete<ResponseMessage>(
        `/collection/delete`,
        { data: { collectionId: collection.id } }
      );

      switch (response.status) {
        case OK_RESPONSE_CODE:
          await refetchDataFunction();
          setIsModalOpen(false);
          return;

        case TOO_MANY_REQUEST_RESPONSE_CODE:
          setError("root", {
            message:
              "You are trying to delete too frequently. Slow down and try later.",
          });
          return;
        default:
          setError("root", {
            message:
              "Something went wrong unexpectedly. This might has something to do with our end. Try again later.",
          });
          return;
      }
    } catch (error) {
      setError("root", {
        message: "An error occurred while deleting the collection.",
      });
      console.error(error);
      //TODO: Add toast.
      return;
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
          Delete collection <em>{collection.name}</em>
        </ModalHeader>
        <ModalBody>
          {" "}
          {errors.root?.message && (
            <p className="text-red-500 mb-2">{errors.root.message}</p>
          )}
          <p>
            Are you sure you want to delete the collection named:{" "}
            {collection.name}?
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
