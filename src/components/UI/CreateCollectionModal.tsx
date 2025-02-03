"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { NextPage } from "next";
import { CreateCollectionForm } from "@/types/types";
import {
  MAX_LENGTH_FOR_COLLECTION_DESCRIPTION,
  MAX_LENGTH_FOR_COLLECTION_NAME,
} from "@/util/utils";

interface Props {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  createCollectionSubmitFunction: (data: CreateCollectionForm) => Promise<void>;
}

const CreateCollectionModal: NextPage<Props> = ({
  isOpen,
  setOpen,
  createCollectionSubmitFunction,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateCollectionForm>();

  const onSubmit = handleSubmit(createCollectionSubmitFunction);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <Modal
      onOpenChange={handleClose}
      isOpen={isOpen}
      backdrop="opaque"
      size="md"
      scrollBehavior="inside"
    >
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Create New Collection
          </ModalHeader>
          <ModalBody>
            <Input
              label="Collection Name"
              placeholder="Enter collection name..."
              isRequired
              {...register("collectionName", {
                required: "Collection name is required",
                validate: (value: string) => {
                  const trimmed = value.trim();
                  if (trimmed.length < 1)
                    return "Collection name must contain at least 1 character.";

                  if (trimmed.length > MAX_LENGTH_FOR_COLLECTION_NAME)
                    return `Collection name can be at most ${MAX_LENGTH_FOR_COLLECTION_NAME} characters.`;

                  return true;
                },
              })}
              isInvalid={!!errors.collectionName}
              errorMessage={errors.collectionName?.message}
            />

            <Textarea
              label="Description (optional)"
              placeholder="This description might help you to distinguish your own collections."
              {...register("description", {
                validate: (value: string | null) => {
                  const trimmed = (value ?? "").trim();

                  if (trimmed.length > MAX_LENGTH_FOR_COLLECTION_DESCRIPTION)
                    return `Collection description can be at most ${MAX_LENGTH_FOR_COLLECTION_DESCRIPTION} characters.`;

                  return true;
                },
              })}
              maxLength={MAX_LENGTH_FOR_COLLECTION_DESCRIPTION}
              isInvalid={!!errors.description}
              errorMessage={errors.description?.message}
            />
          </ModalBody>
          <ModalFooter className="gap-3">
            <Button
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
              color="primary"
              type="submit"
            >
              Create
            </Button>
            <Button
              color="default"
              variant="light"
              onPress={() => setOpen(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateCollectionModal;
