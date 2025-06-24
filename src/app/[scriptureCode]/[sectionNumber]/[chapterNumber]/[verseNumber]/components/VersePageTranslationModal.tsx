import {Button} from "@heroui/button";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import {Select, SelectItem} from "@heroui/select";
import {NextPage} from "next";
import {Dispatch, Key, SetStateAction} from "react";
import {ScriptureDetail, ScripturePreference} from "@/types/classes/Scripture";
import {VerseBothDTO} from "@/types/classes/Verse";

interface Props {
    verse: VerseBothDTO
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    scriptureDetail: Readonly<ScriptureDetail>;
    preference: ScripturePreference
    setTranslationIdMultiple: (keys: Set<Key>) => void;
}

const VersePageTranslationModal: NextPage<Props> = ({
                                                        verse,
                                                        isModalOpen,
                                                        setIsModalOpen,
                                                        scriptureDetail, preference,
                                                        setTranslationIdMultiple,
                                                    }) => {
    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (preference.getPreferredTranslationIdMultiple().size === 1 && e.target.value === "") return;
        setTranslationIdMultiple(new Set(e.target.value.split(",")));
        return;
    };

    const translations = scriptureDetail.getTranslations();
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
                            selectedKeys={preference.getPreferredTranslationIdMultiple()}
                            onChange={handleSelectionChange}
                        >
                            {translations.map((t) => {
                                const translationId = t.getId();
                                const translationName = t.getName();
                                const translatorNamesGathered = t.getTranslators().map((e => e.getName())).join(", ");
                                const isDisabled = !verse.getTranslationTexts().some(tt => tt.getTranslation().getId() === t.getId());

                                return (<SelectItem isDisabled={isDisabled} key={translationId}>
                                    {`${translationName} / ${translatorNamesGathered}`}
                                </SelectItem>)

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
