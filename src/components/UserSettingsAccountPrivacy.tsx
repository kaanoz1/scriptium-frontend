import {NextPage} from "next";
import {
    CONFLICT_RESPONSE_CODE, displayErrorToast,
    INTERNAL_SERVER_ERROR_RESPONSE_CODE,
    OK_RESPONSE_CODE,
    TOO_MANY_REQUEST_RESPONSE_CODE,
} from "@/util/utils";
import {useEffect, useState} from "react";
import {Switch} from "@heroui/switch";
import {FaLock} from "react-icons/fa";
import {MdOutlinePublic} from "react-icons/md";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {User} from "@/types/types";
import TooManyRequestComponent from "./UI/TooManyRequestComponent";
import ServerErrorComponent from "./UI/ServerErrorComponent";
import {NoAuthenticationRequestErrorCode} from "@/types/response";

interface Props {
    user: User;
    setUser: (user: User | null) => void;
}

const UserSettingsAccountPrivacy: NextPage<Props> = ({user, setUser}) => {
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [error, setError] = useState<
        NoAuthenticationRequestErrorCode | undefined
    >(undefined);

    useEffect(() => {
        if (user) setIsPrivate(user.privateFrom != null);
    }, [user, user?.privateFrom]);

    const handleToggle = async () => {
        setIsPrivate((prev) => !prev);

        try {
            const response = await axiosCredentialInstance.put(`/session/alter`);

            switch (response.status) {
                case OK_RESPONSE_CODE:
                    if (user)
                        setUser({
                            ...user,
                            privateFrom: user.privateFrom ? undefined : new Date(),
                        });
                    return;
                case CONFLICT_RESPONSE_CODE:
                    setIsPrivate((prev) => !prev);
                    return;
                case TOO_MANY_REQUEST_RESPONSE_CODE:
                    setError(429);
                    return undefined;
                default:
                    setError(500);
                    return undefined;
            }
        } catch (error) {
            console.error(error);
            setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);

            displayErrorToast(error);

            return undefined;
        }
    };

    if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
        return <TooManyRequestComponent/>;

    if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
        return <ServerErrorComponent/>;

    return (
        <div className="w-full flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Account Privacy</h3>
            <div className="w-full border p-4 rounded-md flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-md">Private account</span>
                    <p className="text-sm text-neutral-500">
                        When your account is private, only approved followers can see your
                        posts and profile details. If your account is public, anyone can
                        view your profile and posts. Additionally,{" "}
                        <span className="underline">
              {" "}
                            whenever you alter your account to public, if there are/is pending
              requests, they would automatically be accepted.
            </span>{" "}
                        You can check{" "}
                        <em className="italic font-bold">Followers & Followings</em> section
                        for more information about your following requests.
                    </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <Switch
                        isSelected={isPrivate}
                        startContent={<FaLock size={15}/>}
                        endContent={<MdOutlinePublic size={20}/>}
                        onValueChange={handleToggle}
                        aria-label="Private account switch"
                        size="lg"
                    />
                    <em className="text-sm">{isPrivate ? "Private" : "Public"}</em>
                </div>
            </div>
        </div>
    );
};

export default UserSettingsAccountPrivacy;
