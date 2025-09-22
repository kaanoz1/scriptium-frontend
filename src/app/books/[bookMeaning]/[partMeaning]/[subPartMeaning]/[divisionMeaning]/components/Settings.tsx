import { ScripturePreference } from "@/types/classes/client/Scripture/ScripturePreference/ScripturePreference";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Switch } from "@heroui/switch";
import { NextPage } from "next";

interface Props {
  isSettingsModelOpen: boolean;
  setIsSettingsModelOpen: (isOpen: boolean) => void;
  preference: ScripturePreference;
  setShowTranslation: (options: boolean) => void;
  setShowTransliteration: (options: boolean) => void;
  setShowFootnotes: (options: boolean) => void;
  setShowOriginalText: (options: boolean) => void;
}

const VerseAndChapterPageSettingsModel: NextPage<Props> = ({
  isSettingsModelOpen,
  setIsSettingsModelOpen,
  preference,
  setShowTranslation,
  setShowTransliteration,
  setShowFootnotes,
  setShowOriginalText,
}) => {
  const options = preference.getOptions();
  const showTranslation = options.getShowTranslation();
  const showFootnotes = options.getShowFootnotes();
  const showOriginalText = options.getShowOriginalText();
  const showTransliteration = options.getShowTransliteration();

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
