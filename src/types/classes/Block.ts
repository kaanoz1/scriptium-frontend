import {UserDTO} from "./User";


export type T_BlockDTOParams = {
    blockedUser: UserDTO;
    blockedAt: Date;
    reason: string;
}


export class BlockDTO {
    private readonly blockedUser: Readonly<UserDTO>
    private readonly blockedAt: Readonly<Date>
    private readonly reason: string | null = null

    constructor(
        data: T_BlockDTOParams
    ) {
        this.blockedUser = data.blockedUser;
        this.blockedAt = new Date(data.blockedAt); //Since TS cannot convert C# DateTime to TS Date object.
        this.reason = data.reason;
    }

    static createFromParams(data: T_BlockDTOParams): BlockDTO {
        return new BlockDTO(data)
    }

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
