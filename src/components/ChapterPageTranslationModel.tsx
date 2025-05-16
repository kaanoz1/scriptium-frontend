import { TranslationTextDTO } from "@/types/classes/TranslationText";
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
import { Dispatch, FC, Key, SetStateAction } from "react";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  preferredTranslationId: Set<Key>;
  stateControlFunctionOfPreferredTranslationId: Dispatch<
    SetStateAction<Set<Key>>
  >;
  translations: readonly TranslationTextDTO[];
}

const ChapterPageTranslationModel: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  preferredTranslationId,
  stateControlFunctionOfPreferredTranslationId,
  translations,
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={() => setIsModalOpen(!isModalOpen)}
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
              selectionMode="single"
              selectedKeys={preferredTranslationId as Selection}
              onChange={(e) => {
                if (e.target.value == "") return;

                stateControlFunctionOfPreferredTranslationId(
                  (preferredTranslationId) =>
                    new Set([
                      ...Array.from(preferredTranslationId),
                      e.target.value,
                    ])
                );
              }}
            >
              {translations.map((t) => (
                <SelectItem key={`${t.getTranslation().getId()}`}>
                  {` ${t.getTranslation().getName()} / ${t
                    .getTranslation()
                    .getTranslators()
                    .map((e) => e.getName())
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

export default ChapterPageTranslationModel;
