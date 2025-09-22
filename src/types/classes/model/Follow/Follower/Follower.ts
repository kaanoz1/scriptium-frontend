import { User, T_UserConstructorParametersJSON } from "../../User/User";
import {
  FollowUser,
  T_FollowUserConstructorParameters,
  T_FollowUserConstructorParametersJSON,
} from "../Follow/Follow";

export type T_FollowerUserConstructorParameters =
  T_FollowUserConstructorParameters & { followerUser: User };
export type T_FollowerUserConstructorParametersJSON =
  T_FollowUserConstructorParametersJSON & {
    followerUser: T_UserConstructorParametersJSON;
  };

export class FollowerUser extends FollowUser {
  private readonly followerUser: User;

  constructor(data: T_FollowerUserConstructorParameters) {
    super({ ...data });

    this.followerUser = data.followerUser;
  }

  static createFromJSON(data: T_FollowerUserConstructorParametersJSON) {
    const followerUser = User.createFromJSON(data.followerUser);
    return new FollowerUser({ ...data, followerUser });
  }

  getFollowerUser(): Readonly<User> {
    return this.followerUser;
  }
}
