import { User, T_UserConstructorParametersJSON } from "../../User/User";
import {
  FollowUser,
  T_FollowUserConstructorParameters,
  T_FollowUserConstructorParametersJSON,
} from "../Follow/Follow";

export type T_FollowingUserParams = T_FollowUserConstructorParameters & {
  followedUser: User;
};
export type T_FollowingUserConstructorParametersJSON =
  T_FollowUserConstructorParametersJSON & {
    followedUser: T_UserConstructorParametersJSON;
  };

export class FollowingUser extends FollowUser {
  private readonly followedUser: Readonly<User>;

  constructor(data: T_FollowingUserParams) {
    super({ ...data });
    this.followedUser = data.followedUser;
  }

  static createFromJSON(
    data: T_FollowingUserConstructorParametersJSON
  ): FollowingUser {
    const followedUser = User.createFromJSON(data.followedUser);
    return new FollowingUser({ ...data, followedUser });
  }

  getFollowingUser(): Readonly<User> {
    return this.followedUser;
  }
}
