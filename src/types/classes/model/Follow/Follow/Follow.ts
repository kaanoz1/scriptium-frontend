export type T_FollowUserConstructorParameters = { occurredAt: Date };
export type T_FollowUserConstructorParametersJSON =
  T_FollowUserConstructorParameters;

export abstract class FollowUser {
  protected readonly occurredAt: Date;

  protected constructor(data: T_FollowUserConstructorParameters) {
    this.occurredAt = new Date(data.occurredAt); // Since some times TS cannot convert C# DateTime object into TS Date object.
  }

  getOccurredAt(): Date {
    return this.occurredAt;
  }
}
