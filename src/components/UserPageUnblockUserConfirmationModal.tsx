import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {Toast, UnblockUserForm, UserFetched} from "@/types/types";
import {CONFLICT_RESPONSE_CODE, displayErrorToast, OK_RESPONSE_CODE} from "@/util/utils";
import {Button} from "@heroui/button";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import {NextPage} from "next";
import {Dispatch, SetStateAction} from "react";
import {useForm} from "react-hook-form";
import {addToast} from "@heroui/toast";

interface Props {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    userToBeUnblocked: UserFetched;
    stateControlFunctionOfInformationModal: Dispatch<SetStateAction<boolean>>;
    stateControlFunctionOfUserToBeUnblocked: Dispatch<
        SetStateAction<UserFetched | null>
    >;
}

const UserPageUnblockUserConfirmationModal: NextPage<Props> = ({
                                                                   isModalOpen,
                                                                   setIsModalOpen,
                                                                   userToBeUnblocked,
                                                                   stateControlFunctionOfInformationModal,
                                                                   stateControlFunctionOfUserToBeUnblocked,
                                                               }) => {
    const {
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<UnblockUserForm>();

    const onUnblockSubmit = handleSubmit(async (formData: UnblockUserForm) => {
        formData.username = userToBeUnblocked.username;

        try {
            const response = await axiosCredentialInstance.delete(`/block/unblock`, {
                data: formData,
            });

            switch (response.status) {
                case CONFLICT_RESPONSE_CODE:
                case OK_RESPONSE_CODE:
                    stateControlFunctionOfUserToBeUnblocked(
                        (prev) =>
                            prev &&
                            ({
                                ...prev,
                                isUserInspectedBlocked: false,
                                followStatusUserInspecting: undefined,
                                followStatusUserInspected: undefined,
                            } satisfies UserFetched)
                    );
                    return;

                default:

                    const couldnotUnblocked: Toast = {
                        title: "Couldn't be blocked.",
                        description: "User may already be not-blocked by you. Try to refresh the page.",
                        color: "danger",
                    }

                    addToast(couldnotUnblocked);

                    return;
            }
        } catch (error) {
            console.error(error);

            displayErrorToast(error);

            return;
        }
    });

    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalContent>
                <ModalHeader>Confirm Unblock User</ModalHeader>
                <form onSubmit={onUnblockSubmit}>
                    <ModalBody>
                        Are you sure you want to unblock @{userToBeUnblocked.username}?
                        {errors && (
                            <p className="italic text-red-500/80">
                                {errors.username?.message}
                            </p>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="light"
                            onPress={() => setIsModalOpen(false)}
                            isLoading={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="success"
                            type="submit"
                            onPress={() => {
                                setIsModalOpen(false);
                                stateControlFunctionOfInformationModal(false);
                            }}
                        >
                            Unblock
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default UserPageUnblockUserConfirmationModal;
