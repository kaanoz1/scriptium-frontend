import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { Dispatch, FC, Key, SetStateAction } from "react";
import { ScripturePreference } from "@/types/classes/Scripture";
import { ScriptureDetail } from "@/util/scriptureDetails";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  preference: ScripturePreference;
  setTranslationIdMultiple: (key: Set<Key>) => void;
  scriptureDetail: Readonly<ScriptureDetail>;
}

const ChapterPageTranslationModel: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  preference,
  setTranslationIdMultiple,
  scriptureDetail,
}) => {
  const translations = scriptureDetail.getTranslations();

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
              selectionMode="multiple"
              selectedKeys={
                new Set(
                  Array.from(
                    preference.getPreferredTranslationIdMultiple()
                  ).map(String)
                )
              }
              onChange={(e) =>
                setTranslationIdMultiple(new Set(e.target.value.split(",")))
              }
            >
              {translations.map((t) => {
                const translationId = t.getId().toString(); // ensure string
                const translationName = t.getName();
                const translatorsNameGathered = t
                  .getTranslators()
                  .map((e) => e.getName())
                  .join(", ");

                return (
                  <SelectItem
                    textValue={`${translationName} / ${translatorsNameGathered}`}
                    key={translationId}
                  >
                    {translationName} / {translatorsNameGathered}
                  </SelectItem>
                );
              })}
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
