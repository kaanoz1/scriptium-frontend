import { TranslationTextDTO } from "@/types/types";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { Selection } from "@heroui/table";
import { NextPage } from "next";
import { Dispatch, Key, SetStateAction } from "react";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  translationTexts: TranslationTextDTO[];
  preferredTranslationIds: Set<Key>;
  setPreferredTranslationIds: Dispatch<SetStateAction<Set<Key>>>;
}

const VersePageTranslationModal: NextPage<Props> = ({
  isModalOpen,
  setIsModalOpen,
  translationTexts,
  preferredTranslationIds,
  setPreferredTranslationIds,
}) => {
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (preferredTranslationIds.size === 1 && e.target.value === "") return;
    setPreferredTranslationIds(new Set(e.target.value.split(",")));
    return;
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={() => setIsModalOpen(false)}
      backdrop="opaque"
      radius="lg"
      size="xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Select Translation
        </ModalHeader>
        <ModalBody>
          <div className="py-2">
            <Select
              label="Select a translation"
              description="You can select multiple translations to compare them."
              selectionMode="multiple"
              selectedKeys={preferredTranslationIds as Selection}
              onChange={handleSelectionChange}
            >
              {translationTexts.map((t) => (
                <SelectItem key={t.translation.id}>
                  {`${t.translation.name} / ${t.translation.translators
                    .map((e) => e.name)
                    .join(", ")}`}
                </SelectItem>
              ))}
            </Select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={() => setIsModalOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VersePageTranslationModal;
