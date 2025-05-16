import { UserDTO } from "./User";

export class BlockDTO {
  constructor(
    private readonly blockedUser: Readonly<UserDTO>,
    private readonly blockedAt: Readonly<Date>,
    private readonly reason: Readonly<string | null> = null
  ) {}

  getBlockedUser(): Readonly<UserDTO> {
    return this.blockedUser;
  }

  getBlockedAt(): Readonly<Date> {
    return this.blockedAt;
  }

  getReason(): Readonly<string | null> {
    return this.reason;
  }
}
