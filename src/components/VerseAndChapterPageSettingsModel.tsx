import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Switch } from "@heroui/switch";
import { NextPage } from "next";
import VocalizationSwitch from "./UI/VocalizationSwitch";
import { Dispatch, SetStateAction } from "react";
import { T_ScriptureTextVariationKey } from "@/types/types";

interface Props {
  isSettingsModelOpen: boolean;
  setIsSettingsModelOpen: Dispatch<SetStateAction<boolean>>;
  showTranslation: boolean;
  setShowTranslation: Dispatch<SetStateAction<boolean>>;
  showOriginalText: boolean;
  setShowOriginalText: Dispatch<SetStateAction<boolean>>;
  showTransliteration: boolean;
  setShowTransliteration: Dispatch<SetStateAction<boolean>>;
  textSymbol: string;
  textSimplifiedSymbol: string;
  textWithoutVowelSymbol: string;
  preferredFont: string;
  textVariation: T_ScriptureTextVariationKey;
  setTextVariation: Dispatch<SetStateAction<T_ScriptureTextVariationKey>>;
  showFootnotes: boolean;
  setShowFootnotes: Dispatch<SetStateAction<boolean>>;
}

const VerseAndChapterPageSettingsModel: NextPage<Props> = ({
  isSettingsModelOpen,
  setIsSettingsModelOpen,
  setShowOriginalText,
  setShowTranslation,
  setShowTransliteration,
  showOriginalText,
  showTranslation,
  showTransliteration,
  textSymbol,
  textSimplifiedSymbol,
  textWithoutVowelSymbol,
  preferredFont,
  textVariation,
  setTextVariation,
  showFootnotes,
  setShowFootnotes,
}) => {
  return (
    <Modal
      isOpen={isSettingsModelOpen}
      onOpenChange={() => setIsSettingsModelOpen(false)}
      radius="lg"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Settings</ModalHeader>
        <ModalBody>
          <div className="py-2 flex flex-col items-center gap-5">
            <div className="w-full flex flex-col gap-8">
              <h3 className="text-xl w-full text-center">Configuration</h3>
              <div className="py-1 h-5 flex justify-between items-center">
                <span>Show Translation</span>
                <Switch
                  isSelected={showTranslation}
                  onValueChange={setShowTranslation}
                />
              </div>
              <div className="py-1 h-5 flex justify-between items-center">
                <span>Show Original Text</span>
                <Switch
                  isSelected={showOriginalText}
                  onValueChange={setShowOriginalText}
                />
              </div>
              <div className="py-1 h-5 flex justify-between items-center">
                <span>Show Transliteration</span>
                <Switch
                  isSelected={showTransliteration}
                  onValueChange={setShowTransliteration}
                />
              </div>
              <div className="py-1 h-5 flex justify-between items-center">
                <span>Show Footnotes</span>
                <Switch
                  isSelected={showFootnotes}
                  onValueChange={setShowFootnotes}
                />
              </div>
            </div>
            <Divider className="w-11/12 my-3" />
            <div className="w-full flex flex-col gap-8">
              <h3 className="text-xl w-full text-center">Vocalization</h3>
              <div className="flex flex-row justify-evenly">
                <VocalizationSwitch
                  font={preferredFont}
                  onClick={() => setTextVariation("usual")}
                  variation={textVariation}
                  required="text"
                >
                  {textSymbol}
                </VocalizationSwitch>
                <VocalizationSwitch
                  font={preferredFont}
                  onClick={() => setTextVariation("simplified")}
                  variation={textVariation}
                  required="textSimplified"
                >
                  {textSimplifiedSymbol}
                </VocalizationSwitch>
                <VocalizationSwitch
                  font={preferredFont}
                  onClick={() => setTextVariation("withoutVowel")}
                  variation={textVariation}
                  required="textWithoutVowel"
                >
                  {textWithoutVowelSymbol}
                </VocalizationSwitch>
              </div>
              <span className="opacity-50 italic text-sm">
                If vocalization is not available, default one will be displayed.
              </span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={() => setIsSettingsModelOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VerseAndChapterPageSettingsModel;
