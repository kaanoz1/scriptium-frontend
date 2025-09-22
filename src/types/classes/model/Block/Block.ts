import { User } from "../User/User";

export type T_BlockParams = {
  blockedUser: User;
  blockedAt: Date;
  reason: string;
};

export class Block {
  private readonly blockedUser: Readonly<User>;
  private readonly blockedAt: Readonly<Date>;
  private readonly reason: string | null = null;

  constructor(data: T_BlockParams) {
    this.blockedUser = data.blockedUser;
    this.blockedAt = new Date(data.blockedAt); //Since TS cannot convert C# DateTime to TS Date object.
    this.reason = data.reason;
  }

  static createFromParams(data: T_BlockParams): Block {
    return new Block(data);
  }

  getBlockedUser(): Readonly<User> {
    return this.blockedUser;
  }

  getBlockedAt(): Readonly<Date> {
    return this.blockedAt;
  }

  getReason(): Readonly<string | null> {
    return this.reason;
  }
}
