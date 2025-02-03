import { CollectionDTO, RefetchDataFunctionType } from "@/types/types";
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
import {
  CONFLICT_RESPONSE_CODE,
  MAX_LENGTH_FOR_COLLECTION_DESCRIPTION,
  MAX_LENGTH_FOR_COLLECTION_NAME,
  OK_RESPONSE_CODE,
  TOO_MANY_REQUEST_RESPONSE_CODE,
} from "@/util/utils";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { ResponseMessage } from "@/types/response";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  refetchDataFunction: RefetchDataFunctionType;
  collection: CollectionDTO | null;
}

type UpdateCollectionForm = {
  newCollectionName: string | null;
  newCollectionDescription: string | null;
};

const CollectionUpdateModal: FC<Props> = ({
  collection,
  setIsModalOpen,
  isModalOpen,
  refetchDataFunction,
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
      newCollectionName: collection.name ?? null,
      newCollectionDescription: collection.description ?? null,
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

    const originalName = (collection.name ?? "").trim();
    const originalDesc = (collection.description ?? "").trim();

    if (
      (trimmedName == originalName && trimmedDesc == originalDesc) ||
      (trimmedName == "" && trimmedDesc == "")
    )
      setHasChanges(false);
    else setHasChanges(true);
  };

  const onSubmit = async (data: UpdateCollectionForm) => {
    const formData = {} as UpdateCollectionForm;
    if (collection.name != data.newCollectionName)
      formData.newCollectionName = data.newCollectionName;

    if (collection.description != data.newCollectionDescription)
      formData.newCollectionDescription = data.newCollectionDescription;

    try {
      const response = await axiosCredentialInstance.put<ResponseMessage>(
        `/collection/update`,
        {
          collectionId: collection.id,
          ...formData,
        }
      );

      switch (response.status) {
        case OK_RESPONSE_CODE:
          await refetchDataFunction();
          setIsModalOpen(false);
          return;

        case CONFLICT_RESPONSE_CODE:
          setError("newCollectionName", {
            message: "You already have a collection with the same name.",
          });
          return;

        case TOO_MANY_REQUEST_RESPONSE_CODE:
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
      setError("root", {
        message: "A network or server error occurred. Please try again later.",
      });
      return;
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
          {`Update collection ${collection.name}`}
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
