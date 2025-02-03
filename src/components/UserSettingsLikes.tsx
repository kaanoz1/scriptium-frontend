import { LikedCommentDTO, LikedNoteDTO, User } from "@/types/types";
import {
  TOO_MANY_REQUEST_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  OK_RESPONSE_CODE,
} from "@/util/utils";
import { NextPage } from "next";
import { useState } from "react";
import ServerError from "./UI/ServerError";
import TooManyRequest from "./UI/TooManyRequest";
import LoadingSpinnerFullH from "./UI/LoadingSpinnerFullH";
import { useQuery } from "@tanstack/react-query";
import { AuthenticationRequestErrorCode, Response } from "@/types/response";
import { Tab, Tabs } from "@heroui/tabs";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { HiOutlineChat } from "react-icons/hi";
import UserSettingsLikeTabCommentTab from "./UserSettingsLikeTabCommentTab";
import UserSettingsLikeTabNoteTab from "./UserSettingsLikeTabNoteTab";
import axios from "axios";

interface Props {
  user: User;
}

type LikePageResponse = {
  comments: LikedCommentDTO[];
  notes: LikedNoteDTO[];
};

const defaultLikePageResponse: LikePageResponse = {
  comments: [],
  notes: [],
};

const UserSettingsLikes: NextPage<Props> = ({ user }) => {
  const [error, setError] = useState<
    AuthenticationRequestErrorCode | undefined
  >(undefined);

  const fetchLikes = async (): Promise<LikePageResponse> => {
    const response = await axios.get<Response<LikePageResponse>>(
      `/like/likes`,
      { withCredentials: true }
    );

    switch (response.status) {
      case OK_RESPONSE_CODE:
        setError(undefined);

        response.data.data.comments.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        response.data.data.notes.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        return response.data.data;
      default:
        setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
        return defaultLikePageResponse;
    }
  };

  const {
    data: likes = defaultLikePageResponse,
    isLoading,
    refetch,
  } = useQuery<LikePageResponse>({
    queryKey: ["likes"],
    queryFn: async () => await fetchLikes(),
    refetchInterval: 1000 * 30,
  });

  if (isLoading) return <LoadingSpinnerFullH />;
  if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
    return <TooManyRequest />;

  if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
    return <ServerError />;

  return (
    <Tabs aria-label="Likes">
      <Tab
        aria-label="Comments"
        key="comments"
        title={
          <div className="flex gap-2 items-center space-x-2">
            <HiOutlineChat className="text-2xl text-neutral-600 dark:text-neutral-300" />{" "}
            <span>Reflections</span>
          </div>
        }
      >
        <UserSettingsLikeTabCommentTab
          comments={likes.comments}
          refetch={refetch}
          user={user}
        />
      </Tab>
      <Tab
        aria-label="Notes"
        key="notes"
        title={
          <div className="flex items-center space-x-2">
            <MdOutlineStickyNote2 className="text-2xl text-neutral-600 dark:text-neutral-300" />{" "}
            <span>Notes</span>
          </div>
        }
      >
        <UserSettingsLikeTabNoteTab
          refetch={refetch}
          user={user}
          notes={likes.notes}
        />
      </Tab>
    </Tabs>
  );
};

export default UserSettingsLikes;
