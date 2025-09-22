import { User, T_UserConstructorParametersJSON } from "../../User/User";
import {
  T_NoteOwnConstructorParameters,
  T_NoteOwnConstructorParametersJSON,
  NoteOwn,
} from "../NoteOwn/NoteOwn";

export type T_NoteOwnerConstructorParameters =
  T_NoteOwnConstructorParameters & {
    creator: User;
  };

export type T_NoteOwnerConstructorParametersJSON =
  T_NoteOwnConstructorParametersJSON & {
    creator: T_UserConstructorParametersJSON;
  };

export class NoteOwner extends NoteOwn {
  readonly creator: User;
  constructor(data: T_NoteOwnerConstructorParameters) {
    super({ ...data });
    this.creator = data.creator;
  }

  static override createFromJSON(
    data: T_NoteOwnerConstructorParametersJSON
  ): NoteOwner {
    const createdAt = new Date(data.createdAt);
    const updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
    const creator = User.createFromJSON(data.creator);
    return new NoteOwner({ ...data, createdAt, updatedAt, creator });
  }

  getCreator(): Readonly<User> {
    return this.creator;
  }
}
