import {T_UserDTOConstructorParametersJSON, UserDTO} from "./User";


type T_FollowUserDTOConstructorParameters = { occurredAt: Date }
type T_FollowUserDTOConstructorParametersJSON = T_FollowUserDTOConstructorParameters;

export abstract class FollowUserDTO {
    protected readonly occurredAt: Date

    protected constructor(data: T_FollowUserDTOConstructorParameters) {
        this.occurredAt = new Date(data.occurredAt) // Since some times TS cannot convert C# DateTime object into TS Date object.
    }

    getOccurredAt(): Date {
        return this.occurredAt;
    }

}

export type T_FollowerUserDTOConstructorParameters = T_FollowUserDTOConstructorParameters & { followerUser: UserDTO }
export type T_FollowerUserDTOConstructorParametersJSON = T_FollowUserDTOConstructorParametersJSON & {
    followerUser: T_UserDTOConstructorParametersJSON
}


export class FollowerUserDTO extends FollowUserDTO {
    private readonly followerUser: UserDTO;

    constructor(data: T_FollowerUserDTOConstructorParameters) {
        super({...data});

        this.followerUser = data.followerUser
    }

    static createFromJSON(data: T_FollowerUserDTOConstructorParametersJSON) {
        const followerUser = UserDTO.createFromJSON(data.followerUser)
        return new FollowerUserDTO({...data, followerUser});
    }

    getFollowerUser(): Readonly<UserDTO> {
        return this.followerUser;
    }


}

export type T_FollowedUserDTOParams = T_FollowUserDTOConstructorParameters & { followedUser: UserDTO }
export type T_FollowedUserDTOConstructorParametersJSON = T_FollowUserDTOConstructorParametersJSON & {
    followedUser: T_UserDTOConstructorParametersJSON
}


export class FollowedUserDTO extends FollowUserDTO {
    private readonly followedUser: Readonly<UserDTO>

    constructor(data: T_FollowedUserDTOParams) {
        super({...data});
        this.followedUser = data.followedUser;
    }

    static createFromJSON(data: T_FollowedUserDTOConstructorParametersJSON): FollowedUserDTO {
        const followedUser = UserDTO.createFromJSON(data.followedUser)
        return new FollowedUserDTO({...data, followedUser})
    }

    getFollowedUser(): Readonly<UserDTO> {
        return this.followedUser;
    }


}
