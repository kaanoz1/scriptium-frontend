import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { Input } from "@heroui/input";

import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";
import { ResponseMessage } from "@/types/response";
import { Collection } from "@/types/classes/model/Collection/Collection";
import {
  OK_HTTP_RESPONSE_CODE,
  CONFLICT_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  MAX_LENGTH_FOR_COLLECTION_NAME,
  MAX_LENGTH_FOR_COLLECTION_DESCRIPTION,
} from "@/util/constants";
import { QueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  collection: Collection | null;
  queryKey: readonly unknown[];
  queryClient: QueryClient;
}

type UpdateCollectionForm = {
  newCollectionName: string | null;
  newCollectionDescription: string | null;
};

const CollectionUpdateModal: FC<Props> = ({
  collection,
  setIsModalOpen,
  isModalOpen,
  queryKey,
  queryClient,
}) => {
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const {
    register,
    setError,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateCollectionForm>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (!isModalOpen || !collection) return;

    reset({
      newCollectionName: collection.getName(),
      newCollectionDescription: collection.getDescription(),
    });
    setHasChanges(false);
  }, [collection, isModalOpen, reset]);

  if (collection == null) {
    setIsModalOpen(false);
    return <Fragment />;
  }

  const checkIfDifferent = () => {
    const { newCollectionName, newCollectionDescription } = getValues();
    const trimmedName = (newCollectionName ?? "").trim();
    const trimmedDesc = (newCollectionDescription ?? "").trim();

    const originalName = (collection.getName() ?? "").trim();
    const originalDesc = (collection.getDescription() ?? "").trim();

    if (
      (trimmedName == originalName && trimmedDesc == originalDesc) ||
      (trimmedName == "" && trimmedDesc == "")
    )
      setHasChanges(false);
    else setHasChanges(true);
  };

  const onSubmit = async (data: UpdateCollectionForm) => {
    const formData = {} as UpdateCollectionForm;

    if (collection.getName() !== data.newCollectionName)
      formData.newCollectionName = data.newCollectionName;

    if (collection.getDescription() !== data.newCollectionDescription)
      formData.newCollectionDescription = data.newCollectionDescription;

    try {
      const response = await axiosCredentialInstance.put<ResponseMessage>(
        `/collection/update`,
        {
          collectionId: collection.getId(),
          ...formData,
        }
      );

      switch (response.status) {
        case OK_HTTP_RESPONSE_CODE: {
          const updated = Object.assign(
            Object.create(Object.getPrototypeOf(collection)),
            collection
          );

          if (formData.newCollectionName !== undefined)
            updated.setName(formData.newCollectionName ?? "");

          if (formData.newCollectionDescription !== undefined)
            updated.setDescription(formData.newCollectionDescription ?? "");

          queryClient.setQueryData<Collection[]>(
            queryKey,
            (prev) =>
              prev?.map((c) =>
                c.getId() === collection.getId() ? updated : c
              ) ?? []
          );

          addToast({
            title: "Collection Updated",
            description: "Your collection was successfully updated.",
            color: "success",
          });

          setIsModalOpen(false);
          return;
        }

        case CONFLICT_HTTP_RESPONSE_CODE:
          setError("newCollectionName", {
            message: "You already have a collection with the same name.",
          });
          return;

        case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
          setError("root", {
            message:
              "You are trying to update your collection too frequently. Slow down and try later.",
          });
          return;

        default:
          setError("root", {
            message:
              "Something went wrong unexpectedly. Please try again later.",
          });
          return;
      }
    } catch (error) {
      console.error(error);
      setError("root", {
        message: "A network or server error occurred. Please try again later.",
      });
    }
  };
  const handleSave = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={() => setIsModalOpen(false)}
      backdrop="opaque"
      size="2xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {`Update collection ${collection.getName()}`}
        </ModalHeader>
        <ModalBody>
          {errors.root?.message && (
            <p className="text-red-500 mb-2">{errors.root.message}</p>
          )}

          <form className="w-full flex flex-col" noValidate>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-semibold text-sm">
                Collection Name
              </label>
              <Input
                placeholder="Enter new collection name"
                description={`Max ${MAX_LENGTH_FOR_COLLECTION_NAME} characters. Cannot be empty or whitespace.`}
                isInvalid={!!errors.newCollectionName}
                errorMessage={errors.newCollectionName?.message}
                {...register("newCollectionName", {
                  onChange: checkIfDifferent,
                  validate: (value: string | null) => {
                    const trimmed = (value ?? "").trim();
                    if (trimmed.length < 1)
                      return "Collection name must contain at least 1 character.";

                    if (trimmed.length > MAX_LENGTH_FOR_COLLECTION_NAME)
                      return `Collection name can be at most ${MAX_LENGTH_FOR_COLLECTION_NAME} characters.`;

                    return true;
                  },
                })}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1 font-semibold text-sm">Description</label>
              <Input
                placeholder="Enter new description"
                description={`Max ${MAX_LENGTH_FOR_COLLECTION_DESCRIPTION} characters. Cannot be empty or whitespace.`}
                isInvalid={!!errors.newCollectionDescription}
                errorMessage={errors.newCollectionDescription?.message}
                {...register("newCollectionDescription", {
                  onChange: checkIfDifferent,
                  validate: (value: string | null) => {
                    const trimmed = (value ?? "").trim();

                    if (trimmed.length > MAX_LENGTH_FOR_COLLECTION_DESCRIPTION)
                      return `Collection description can be at most ${MAX_LENGTH_FOR_COLLECTION_DESCRIPTION} characters.`;

                    return true;
                  },
                })}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            variant="light"
            isLoading={isSubmitting}
            onPress={handleSave}
            isDisabled={!hasChanges || isSubmitting}
          >
            Save
          </Button>

          <Button variant="light" onPress={() => setIsModalOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CollectionUpdateModal;
