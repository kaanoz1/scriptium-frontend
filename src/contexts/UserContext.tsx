"use client";

import { Response } from "@/types/response";
import axios from "axios";
import React, { createContext, ReactNode } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { UserOwnDTO } from "@/types/classes/User";

type UserContextType = {
  user: UserOwnDTO | null;
  userError: Error | null;
  setUser: (user: UserOwnDTO | null) => void;
  fetchUser: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<UserOwnDTO>>;
  isUserLoading: boolean;
  isFetched: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const setUser = (updatedUser: UserOwnDTO | null) => {
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
  }: UseQueryResult<UserOwnDTO> = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get<Response<UserOwnDTO>>(`/user/me`, {
          withCredentials: true,
        })
        .then((response) => response),
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
        isUserLoading: isLoading,
        isFetched,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
