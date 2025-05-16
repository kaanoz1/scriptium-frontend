import { UserDTO } from "./User";

export abstract class FollowUserDTO {
  constructor(protected occurredAt: Date) {}

  getOccurredAt(): Date {
    return this.occurredAt;
  }

  setOccurredAt(date: Date): void {
    this.occurredAt = date;
  }
}

export class FollowerUserDTO extends FollowUserDTO {
  constructor(occurredAt: Date, private followerUser: UserDTO) {
    super(occurredAt);
  }

  getFollowerUser(): UserDTO {
    return this.followerUser;
  }

  setFollowerUser(user: UserDTO): void {
    this.followerUser = user;
  }
}

export class FollowedUserDTO extends FollowUserDTO {
  constructor(occurredAt: Date, private followedUser: UserDTO) {
    super(occurredAt);
  }

  getFollowedUser(): UserDTO {
    return this.followedUser;
  }

  setFollowedUser(user: UserDTO): void {
    this.followedUser = user;
  }
}
