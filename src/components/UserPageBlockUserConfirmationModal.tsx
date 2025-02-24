import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {ResponseMessage} from "@/types/response";
import {BlockReason, Toast, UserFetched} from "@/types/types";
import {CONFLICT_RESPONSE_CODE, OK_RESPONSE_CODE} from "@/util/utils";
import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
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
    stateControlFunctionOfInformationModalOpen: Dispatch<SetStateAction<boolean>>;
    userToBeBlocked: UserFetched;
    stateControlFunctionOfSetUserToBeBlocked: Dispatch<
        SetStateAction<UserFetched | null>
    >;
}

const UserPageBlockUserConfirmationModal: NextPage<Props> = ({
                                                                 isModalOpen,
                                                                 setIsModalOpen,
                                                                 userToBeBlocked,
                                                                 stateControlFunctionOfInformationModalOpen,
                                                                 stateControlFunctionOfSetUserToBeBlocked,
                                                             }) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<BlockReason>();

    const onBlockSubmit = handleSubmit(async (formData: BlockReason) => {
        formData.username = userToBeBlocked.username;

        const response = await axiosCredentialInstance.post<ResponseMessage>(
            `/block/block`,
            formData
        );

        switch (response.status) {
            case CONFLICT_RESPONSE_CODE:
            case OK_RESPONSE_CODE:
                stateControlFunctionOfSetUserToBeBlocked(
                    (prev) =>
                        prev && {
                            ...prev,
                            isUserInspectedBlocked: true,
                            followStatusUserInspecting: undefined,
                            followStatusUserInspected: undefined,
                            followerCount:
                                prev.followStatusUserInspecting == "Accepted"
                                    ? prev.followerCount - 1
                                    : prev.followerCount,
                        }
                );

                return;

            default:

                const couldnotBlocked: Toast = {
                    title: "Could not blocked",
                    description: "User may be already blocked or user does not exist.",
                    color: "danger"
                }

                addToast(couldnotBlocked);

                return;
        }
    });

    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalContent>
                <ModalHeader>Confirm Block User</ModalHeader>
                <form onSubmit={onBlockSubmit}>
                    <ModalBody>
                        Are you sure you want to block @{userToBeBlocked?.username}?
                        <Input
                            type="text"
                            {...register("reason", {
                                maxLength: {
                                    value: 100,
                                    message: "Reason cannot exceed 100 characters.",
                                },
                            })}
                            errorMessage={errors.reason?.message}
                            isInvalid={!!errors.reason}
                            placeholder="Reason can help you recall why you blocked this user."
                        />
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
                            color="danger"
                            type="submit"
                            onPress={() => {
                                setIsModalOpen(false);
                                stateControlFunctionOfInformationModalOpen(false);
                            }}
                        >
                            Block
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default UserPageBlockUserConfirmationModal;
