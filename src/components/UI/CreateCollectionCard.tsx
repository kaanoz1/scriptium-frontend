import { Card, CardBody } from "@heroui/card";
import { useState, Fragment, FC } from "react";
import { FiPlusCircle } from "react-icons/fi";
import CreateCollectionModal from "./CreateCollectionModal";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { CreateCollectionForm, RefetchDataFunctionType } from "@/types/types";
import { CONFLICT_RESPONSE_CODE, OK_RESPONSE_CODE } from "@/util/utils";

interface Props {
  refetchDataFunction: RefetchDataFunctionType;
}

const CreateCollectionCard: FC<Props> = ({ refetchDataFunction }) => {
  const [isCreateCollectionModalOpen, setIsCreateCollectionModalOpen] =
    useState<boolean>(false);

  const createCollectionSubmitFunction = async (data: CreateCollectionForm) => {
    try {
      const response = await axiosCredentialInstance.post(
        `/collection/create`,
        data
      );

      switch (response.status) {
        case CONFLICT_RESPONSE_CODE:
        case OK_RESPONSE_CODE:
          setIsCreateCollectionModalOpen(false);
          await refetchDataFunction();

        default:
          return;
      }
    } catch (error) {
      //TODO: Add toast.
      console.error(error);
      return;
    }
  };

  return (
    <Fragment>
      <Card
        isPressable
        onPress={() => setIsCreateCollectionModalOpen(true)}
        className="w-full p-5 hover:bg-gray-50 dark:hover:bg-gray-700 border border-dashed border-gray-300 dark:border-gray-600"
      >
        <CardBody className="flex items-center justify-between p-3">
          <p className="flex justify-center items-center font-medium text-gray-600 dark:text-gray-200">
            Create a new collection
            <span className="px-2">
              <FiPlusCircle
                size={20}
                className="text-gray-500 dark:text-gray-300"
              />
            </span>
          </p>
        </CardBody>
      </Card>
      <CreateCollectionModal
        isOpen={isCreateCollectionModalOpen}
        setOpen={setIsCreateCollectionModalOpen}
        createCollectionSubmitFunction={createCollectionSubmitFunction}
      />
    </Fragment>
  );
};

export default CreateCollectionCard;
