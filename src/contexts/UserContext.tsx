"use client";

import { Response } from "@/types/response";
import { ImageObject, User } from "@/types/types";
import { arrangeImageAndReturns } from "@/util/utils";
import axios from "axios";
import React, { createContext, ReactNode } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

type UserContextType = {
  user: User | null;
  userError: Error | null;
  setUser: (user: User | null) => void;
  fetchUser: (options?: RefetchOptions) => Promise<QueryObserverResult<User>>;
  isLoading: boolean;
  isFetched: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const setUser = (updatedUser: User | null) => {
    queryClient.setQueryData(["user"], () =>
      updatedUser
        ? {
            ...updatedUser,
          }
        : null
    );
  };

  const {
    data: user,
    error,
    isLoading,
    refetch,
    isFetched,
  }: UseQueryResult<User> = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get<Response<User>>(`/user/me`, {
          withCredentials: true,
        })
        .then((response) =>
          arrangeImageAndReturns(response.data.data as ImageObject)
        ),
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 60,
  });

  return (
    <UserContext.Provider
      value={{
        user: user ?? null,
        setUser,
        userError: error as Error | null,
        fetchUser: refetch,
        isLoading,
        isFetched,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
