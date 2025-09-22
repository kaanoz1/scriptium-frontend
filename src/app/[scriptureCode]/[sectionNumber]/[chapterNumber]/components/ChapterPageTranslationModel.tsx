"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { FC, Key } from "react";
import { ScripturePreference } from "@/types/classes/client/Scripture/ScripturePreference/ScripturePreference";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  preference: ScripturePreference;
  setTranslationIdMultiple: (key: Set<Key>) => void;
  scriptureHelper: Readonly<ScriptureHelper>;
}

const ChapterPageTranslationModel: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  preference,
  setTranslationIdMultiple,
  scriptureHelper,
}) => {
  const translations = scriptureHelper.getTranslations();

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
                const translationId = t.getId().toString();
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
