import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {User as NEXTUIUserComponent} from "@heroui/user";
import {Button} from "@heroui/button";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    DropdownSection,
} from "@heroui/dropdown";
import {Link} from "@heroui/link";
import {
    FaEdit,
    FaHeart,
    FaRegCommentAlt,
    FaRegTrashAlt,
    FaReply,
    FaSearch,
    FaUser,
} from "react-icons/fa";
import {BsThreeDotsVertical} from "react-icons/bs";
import {
    arrangeImageAndReturns, displayErrorToast,
    formatDate,
    OK_RESPONSE_CODE,
} from "@/util/utils";
import {
    CommentDTO,
    RefetchDataFunctionType,
    User,
    VerseDTO,
    VerseCollectionDTO,
    ConfinedVerseDTO,
    ImageObject, Toast,
} from "@/types/types";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {AxiosResponse} from "axios";
import {ResponseMessage} from "@/types/response";
import {addToast} from "@heroui/toast";

interface Props {
    comment: CommentDTO;
    user: User;
    stateControlFunctionOfSelectedComment: Dispatch<
        SetStateAction<CommentDTO | null>
    >;
    refetchDataFunction: RefetchDataFunctionType;
    isChild?: boolean;
    handleLike: (
        commentId: number,
        verse: VerseDTO | VerseCollectionDTO | ConfinedVerseDTO
    ) => Promise<AxiosResponse<ResponseMessage>>;
    handleUnlikeCommentNote: (
        commentId: number,
        verse: VerseDTO | ConfinedVerseDTO | VerseCollectionDTO
    ) => Promise<AxiosResponse<ResponseMessage>>;
    stateControlFunctionOfEditComment: Dispatch<
        SetStateAction<CommentDTO | null>
    >;
    stateControlFunctionOfCreateNewComment: Dispatch<
        SetStateAction<CommentDTO | boolean>
    >;
    verse: VerseDTO;
}

const VersePageComment: FC<Props> = ({
                                         comment: commentDisplayed,
                                         user,
                                         stateControlFunctionOfSelectedComment,
                                         refetchDataFunction,
                                         isChild = false,
                                         handleLike,
                                         handleUnlikeCommentNote,
                                         stateControlFunctionOfEditComment,
                                         stateControlFunctionOfCreateNewComment,
                                         verse,
                                     }) => {
    const [comment, setComment] = useState<CommentDTO>(commentDisplayed);

    const deleteComment = async () => {
        try {
            const response = await axiosCredentialInstance.delete(`/comment/delete`, {
                data: {commentId: comment.id},
            });

            switch (response.status) {
                case OK_RESPONSE_CODE:
                    await refetchDataFunction();
                    return;
                default:
                    const couldnotBeDeletedToast: Toast = {
                        title: "Could not be deleted.",
                        description: "You may have already deleted the reflection, or it has never been existed.",
                        color: "danger"
                    };

                    addToast(couldnotBeDeletedToast);
                    return;
            }
        } catch (error) {
            console.error(error);
            displayErrorToast(error);
            return;
        }
    };

    const handleLikeClick = async () => {
        let response: AxiosResponse<ResponseMessage> | null = null;

        try {
            if (comment.isLiked)
                response = await handleUnlikeCommentNote(comment.id, verse);
            else response = await handleLike(comment.id, verse);

            switch (response.data.message) {
                case "You have successfully liked the comment!":
                    setComment((comment) => ({
                        ...comment,
                        isLiked: true,
                        likeCount: comment.likeCount + 1,
                    }));
                    return;
                case "Like that attached this comment is successfully deleted.":
                    setComment((comment) => ({
                        ...comment,
                        isLiked: false,
                        likeCount: comment.likeCount - 1,
                    }));
                    return;

                default:
                    return;
            }
        } catch (error) {
            console.error(error);
            displayErrorToast(error);
            return;
        }
    };

    const commentOwnerUsername = comment.user.username;
    const commentOwnerName = `${comment.user.name} ${
        comment.user.surname ?? ""
    }`.trim();

    const imagePath =
        arrangeImageAndReturns(comment.user as ImageObject).image ?? undefined;

    const cardShadow = isChild ? "none" : "sm";

    const cardBg = isChild
        ? "bg-transparent dark:bg-transparent"
        : "bg-background/60 dark:bg-default-100/50";

    const headerPadding = isChild ? "px-2 py-1" : "px-4 py-2";
    const bodyPadding = isChild ? "px-2 py-1" : "px-4 py-2";
    const footerPadding = isChild ? "px-2 py-1" : "px-4 py-2";

    return (
        <Card
            isBlurred={!isChild}
            shadow={cardShadow}
            className={`border-none w-full ${cardBg}`}
        >
            <CardHeader
                className={`${headerPadding} flex items-center justify-between`}
            >
                <NEXTUIUserComponent
                    classNames={{
                        name: "text-sm font-semibold",
                        description: "text-xs",
                    }}
                    avatarProps={{
                        src: imagePath,
                        size: "sm",
                    }}
                    name={commentOwnerName}
                    description={
                        <Link href={`/user/${commentOwnerUsername}`} size="sm">
                            <strong>@{commentOwnerUsername}</strong>
                        </Link>
                    }
                />

                <div className="flex items-center gap-3">
          <span className="text-xs">
            {formatDate(comment.createdAt)}
              {comment.updatedAt &&
                  ` (Updated: ${formatDate(comment.updatedAt)})`}
          </span>

                    <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly variant="light" radius="full">
                                <BsThreeDotsVertical size={14}/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Comment actions">
                            {isChild ? (
                                <DropdownItem
                                    key="Inspect"
                                    startContent={<FaSearch size={13}/>}
                                    onPress={() => stateControlFunctionOfSelectedComment(comment)}
                                >
                                    Inspect
                                </DropdownItem>
                            ) : null}
                            <DropdownItem
                                key="reply"
                                startContent={<FaReply size={13}/>}
                                onPress={() => stateControlFunctionOfCreateNewComment(comment)}
                            >
                                Reply
                            </DropdownItem>
                            <DropdownItem key="profile" startContent={<FaUser size={13}/>}>
                                <Link
                                    href={`/user/${commentOwnerUsername}`}
                                    isExternal
                                    size="sm"
                                    color="foreground"
                                    className="px-1"
                                >
                                    Go to user profile
                                </Link>
                            </DropdownItem>
                            {user.id === comment.user.id ? (
                                <DropdownSection showDivider aria-label="Actions">
                                    <DropdownItem
                                        key="edit"
                                        startContent={<FaEdit size={13}/>}
                                        onPress={() => stateControlFunctionOfEditComment(comment)}
                                    >
                                        Edit
                                    </DropdownItem>
                                    <DropdownItem
                                        key="delete"
                                        className="text-danger"
                                        color="danger"
                                        startContent={<FaRegTrashAlt size={13}/>}
                                        onPress={deleteComment}
                                    >
                                        Delete
                                    </DropdownItem>
                                </DropdownSection>
                            ) : null}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </CardHeader>

            <CardBody className={`${bodyPadding} text-sm`}>
                <p> {comment.text}</p>
            </CardBody>

            <CardFooter
                className={`${footerPadding} flex items-center justify-between`}
            >
                <div className="flex items-center gap-4">
                    <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        onPress={handleLikeClick}
                    >
                        <FaHeart
                            size={16}
                            className={`${
                                comment.isLiked ? "text-red-500" : "text-default-600"
                            }`}
                        />
                    </Button>
                    <span className="text-xs">{comment.likeCount}</span>

                    <Button isIconOnly variant="light" radius="full">
                        <FaRegCommentAlt size={14} className="text-default-600"/>
                    </Button>
                    <span className="text-xs">{comment.replyCount}</span>
                </div>

                <Button
                    isIconOnly
                    variant="light"
                    radius="full"
                    onPress={() => stateControlFunctionOfCreateNewComment(comment)}
                >
                    <FaReply size={14} className="text-default-600"/>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default VersePageComment;
