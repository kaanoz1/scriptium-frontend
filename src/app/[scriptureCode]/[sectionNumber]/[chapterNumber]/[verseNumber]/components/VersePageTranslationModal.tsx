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
import { NextPage } from "next";
import { Dispatch, Key, SetStateAction } from "react";
import { ScripturePreference } from "@/types/classes/client/Scripture/ScripturePreference/ScripturePreference";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  scriptureHelper: Readonly<ScriptureHelper>;
  preference: Readonly<ScripturePreference>;
  setTranslationIdMultiple: (keys: Set<Key>) => void;
}

const VersePageTranslationModal: NextPage<Props> = ({
  isModalOpen,
  setIsModalOpen,
  scriptureHelper,
  preference,
  setTranslationIdMultiple,
}) => {
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setTranslationIdMultiple(new Set(e.target.value.split(",")));

  const translations = scriptureHelper.getTranslations();
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
              selectedKeys={
                new Set(
                  Array.from(
                    preference.getPreferredTranslationIdMultiple()
                  ).map(String)
                )
              }
              onChange={handleSelectionChange}
            >
              {translations.map((t) => {
                const translationId = t.getId();
                const translationName = t.getName();
                const translatorNamesGathered = t
                  .getTranslators()
                  .map((e) => e.getName())
                  .join(", ");

                return (
                  <SelectItem key={translationId}>
                    {`${translationName} / ${translatorNamesGathered}`}
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

export default VersePageTranslationModal;
