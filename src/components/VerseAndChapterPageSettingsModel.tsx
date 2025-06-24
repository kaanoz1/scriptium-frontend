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

import { T_OriginalScriptureTextVariationKey } from "@/types/types";
import { ScripturePreference } from "@/types/classes/Scripture";
import { ScriptureDetail } from "@/util/scriptureDetails";

interface Props {
  isSettingsModelOpen: boolean;
  setIsSettingsModelOpen: Dispatch<SetStateAction<boolean>>;
  scriptureDetail: Readonly<ScriptureDetail>;
  preference: ScripturePreference;
  setShowTranslation: (options: boolean) => void;
  setShowTransliteration: (options: boolean) => void;
  setShowFootnotes: (options: boolean) => void;
  setShowOriginalText: (options: boolean) => void;
  setOriginalTextVariation: (
    variation: T_OriginalScriptureTextVariationKey
  ) => void;
}

const VerseAndChapterPageSettingsModel: NextPage<Props> = ({
  isSettingsModelOpen,
  setIsSettingsModelOpen,
  scriptureDetail,
  preference,
  setShowTranslation,
  setShowTransliteration,
  setShowFootnotes,
  setShowOriginalText,
  setOriginalTextVariation,
}) => {
  const options = preference.getOptions();
  const showTranslation = options.getShowTranslation();
  const showFootnotes = options.getShowFootnotes();
  const showOriginalText = options.getShowOriginalText();
  const showTransliteration = options.getShowTransliteration();
  const textVariation = options.getVariation();

  const variations = scriptureDetail.getVariationSymbols();
  const textSymbol = variations.getUsual();
  const textSimplifiedSymbol = variations.getSimplified();
  const textWithoutVowelSymbol = variations.getWithoutVowel();

  const preferredFont = preference.getPreferredFont();

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
                  onClick={() => setOriginalTextVariation("usual")}
                  variation={textVariation}
                  required="usual"
                >
                  {textSymbol}
                </VocalizationSwitch>
                <VocalizationSwitch
                  font={preferredFont}
                  onClick={() => setOriginalTextVariation("simplified")}
                  variation={textVariation}
                  required="simplified"
                >
                  {textSimplifiedSymbol}
                </VocalizationSwitch>
                <VocalizationSwitch
                  font={preferredFont}
                  onClick={() => setOriginalTextVariation("withoutVowel")}
                  variation={textVariation}
                  required="withoutVowel"
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
