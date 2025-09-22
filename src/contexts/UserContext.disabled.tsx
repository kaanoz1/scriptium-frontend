// This context is currently disabled and not in use since this project does not have adequate financial resources to afford legal processes to store, maintain and protect user data.
//
//
//
//
//"use client";
//
// import { Response } from "@/types/response";
// import React, { createContext, ReactNode } from "react";
// import {
//   QueryObserverResult,
//   RefetchOptions,
//   useQuery,
//   useQueryClient,
//   UseQueryResult,
// } from "@tanstack/react-query";

// import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
// import {
//   UserOwn,
//   T_UserOwnConstructorParametersJSON,
// } from "@/types/classes/model/User/User";

// type UserContextType = {
//   user: UserOwn | null;
//   userError: Error | null;
//   setUser: (user: UserOwn | null) => void;
//   fetchUser: (
//     options?: RefetchOptions
//   ) => Promise<QueryObserverResult<UserOwn>>;
//   isUserLoading: boolean;
//   isFetched: boolean;
// };

// const UserContext = createContext<UserContextType | null>(null);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const queryClient = useQueryClient();

//   const setUser = (updatedUser: UserOwn | null) => {
//     queryClient.setQueryData(["user"], () =>
//       updatedUser
//         ? UserOwn.createFromJSON({
//             id: updatedUser.getId(),
//             name: updatedUser.getName(),
//             surname: updatedUser.getSurname(),
//             image: updatedUser.getImageUint8Array(),
//             username: updatedUser.getUsername(),
//             email: updatedUser.getEmail(),
//             biography: updatedUser.getBiography(),
//             langId: updatedUser.getLangId(),
//             createdAt: updatedUser.getCreatedAt(),
//             roles: updatedUser.getRoles(),
//             privateFrom: updatedUser.getPrivateFrom(),
//             gender: updatedUser.getGender(),
//           })
//         : null
//     );
//   };

//   const {
//     data: user,
//     error,
//     isLoading,
//     refetch,
//     isFetched,
//   }: UseQueryResult<UserOwn> = useQuery({
//     queryKey: ["user"],
//     queryFn: () =>
//       axiosNoCredentialInstance
//         .get<Response<T_UserOwnConstructorParametersJSON>>(`/user/me`, {
//           withCredentials: true,
//         })
//         .then((response) => UserOwn.createFromJSON(response.data.data)),
//     staleTime: 1000 * 60 * 60 * 60,
//     refetchInterval: 1000 * 60 * 60 * 60,
//   });

//   return (
//     <UserContext.Provider
//       value={{
//         user: user ?? null,
//         setUser,
//         userError: error as Error | null,
//         fetchUser: refetch,
//         isUserLoading: isLoading,
//         isFetched,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContext;
