import { CollectionWithVerseSavedInformationDTO } from "@/types/classes/Collection";
import { Card, CardBody } from "@heroui/card";
import { NextPage } from "next";
import { Dispatch, SetStateAction, useState } from "react";
import { GoBookmarkFill } from "react-icons/go";
import { IoCheckmarkCircle } from "react-icons/io5";

interface Props {
  collection: CollectionWithVerseSavedInformationDTO;
  setSelectedCollectionNames: Dispatch<SetStateAction<Set<string>>>;
}

const VerseCollectionCard: NextPage<Props> = ({
  collection,
  setSelectedCollectionNames,
}) => {
  const [isSelected, setSelected] = useState<boolean>(false);

  const isDisabled = collection.getIsSaved();

  const selectCollection = () => {
    if (isDisabled) return;

    setSelectedCollectionNames((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(collection.getName())) {
        newSet.delete(collection.getName());
        setSelected(false);
      } else {
        newSet.add(collection.getName());
        setSelected(true);
      }
      return newSet;
    });
  };

  return (
    <Card
      isPressable={!isDisabled}
      onPress={selectCollection}
      className={`
        w-full p-0 border cursor-pointer border-gray-200 dark:border-gray-700 transition-colors relative
        ${
          isDisabled
            ? "opacity-60 cursor-not-allowed bg-green-50 dark:bg-green-900 border-l-4 border-green-500"
            : ""
        }

        ${
          isSelected && !isDisabled
            ? "bg-emerald-50 dark:bg-emerald-900 border-l-4 border-l-emerald-500"
            : "hover:bg-gray-50 dark:hover:bg-gray-800"
        }
      `}
    >
      <CardBody className="flex items-center justify-between p-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            {collection.getName()}
          </span>
          {collection.getDescription() && (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              - {collection.getDescription()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isSelected && !isDisabled && (
            <IoCheckmarkCircle className="text-emerald-600" size={24} />
          )}
          {collection.getIsSaved() ? (
            <div className="text-green-600 dark:text-green-300 flex items-center gap-2">
              <GoBookmarkFill />
              <span className="text-xs font-semibold">Already saved</span>
            </div>
          ) : (
            <GoBookmarkFill className="text-gray-400" />
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default VerseCollectionCard;
