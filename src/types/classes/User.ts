import {T_FollowStatus, T_SystemLanguageId} from "../types";


export type T_UserDTOConstructorParameters = {
    id: string,
    username: string,
    name: string,
    surname: string | null,
    isFrozen: boolean,
    image: Uint8Array | null,
}

export type T_UserDTOConstructorParametersJSON = T_UserDTOConstructorParameters;

export class UserDTO {
    private cachedImageBase64: string | null = null;

    private readonly id: string
    private readonly username: string
    private readonly name: string
    private readonly isFrozen: boolean = false
    private readonly image: Uint8Array | null = null
    private readonly surname: string | null = null

    constructor(
        data: T_UserDTOConstructorParameters
    ) {
        this.id = data.id;
        this.username = data.username;
        this.name = data.name;
        this.isFrozen = data.isFrozen;
        this.image = data.image;
        this.surname = data.surname;
        this.isFrozen = data.isFrozen;
        this.image = data.image;

    }

    static createFromJSON(data: T_UserDTOConstructorParametersJSON) {
        return new UserDTO({...data});
    }

    getId(): string {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getName(): string {
        return this.name;
    }

    getIsFrozen(): boolean {
        return this.isFrozen;
    }

    getImageUint8Array(): Readonly<Uint8Array> | null {
        return this.image ? Object.freeze(this.image) : null;
    }

    getSurname(): string | null {
        return this.surname;
    }

    getImage(): string | null {
        if (this.cachedImageBase64 !== null) return this.cachedImageBase64;

        if (!this.image) return null;

        const base64 = Buffer.from(this.image).toString("base64");
        this.cachedImageBase64 = base64;
        return base64;
    }
}

export type T_UserFetchedDTOConstructorParameters = {
    id: string,
    username: string,
    name: string,
    surname: string | null,
    followerCount: number,
    followedCount: number,
    reflectionCount: number,
    noteCount: number,
    suggestionCount: number,
    roles: Array<string>,
    createdAt: Date,
    updateCount: number,
    isFrozen: boolean,
    image: Uint8Array | null,
    biography: string | null,
    privateFrom: Date | null,
    followStatusUserInspected: T_FollowStatus | null,
    followStatusUserInspecting: T_FollowStatus | null,
    isUserInspectedBlocked: boolean,
}

export type T_UserFetchedDTOConstructorParametersJSON = T_UserFetchedDTOConstructorParameters;

export class UserFetchedDTO {
    private cachedImageBase64: string | null = null;

    private readonly id: string
    private readonly username: string
    private readonly name: string
    private readonly surname: string | null = null
    private followerCount: number
    private followedCount: number
    private readonly reflectionCount: number
    private readonly noteCount: number
    private readonly suggestionCount: number
    private readonly roles: ReadonlyArray<string>
    private readonly createdAt: Date
    private readonly updateCount: number
    private readonly isFrozen: boolean = false
    private readonly image: Uint8Array | null = null
    private readonly biography: string | null = null
    private readonly privateFrom: Date | null = null
    private followStatusUserInspecting: T_FollowStatus | null = null
    private followStatusUserInspected: T_FollowStatus | null = null
    private isUserInspectedBlocked: boolean = false

    constructor(
        data: T_UserFetchedDTOConstructorParameters
    ) {
        this.id = data.id;
        this.username = data.username;
        this.name = data.name;
        this.surname = data.surname;
        this.followerCount = data.followerCount;
        this.followedCount = data.followedCount;
        this.reflectionCount = data.reflectionCount;
        this.noteCount = data.noteCount;
        this.suggestionCount = data.suggestionCount;
        this.roles = data.roles;
        this.createdAt = data.createdAt;
        this.updateCount = data.updateCount;
        this.isFrozen = data.isFrozen;
        this.image = data.image;
        this.biography = data.biography;
        this.privateFrom = data.privateFrom;
        this.followStatusUserInspecting = data.followStatusUserInspecting;
        this.followStatusUserInspecting = data.followStatusUserInspecting;
        this.isUserInspectedBlocked = data.isUserInspectedBlocked;

    }

    static createFromJSON(data: T_UserFetchedDTOConstructorParametersJSON): UserFetchedDTO {
        const privateFrom = data.privateFrom ? new Date(data.privateFrom) : null; //Since some times, TS cannot convert C# DateTime object to TS Date object.
        return new UserFetchedDTO({...data, privateFrom})
    }

    getId(): string {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getName(): string {
        return this.name;
    }

    getFollowerCount(): number {
        return this.followerCount;
    }

    setFollowerCount(followerCount: number): void {
        this.followerCount = followerCount;
    }

    increaseFollowerCount(): void {
        this.followerCount += 1;
    }

    decreaseFollowerCount(): void {
        this.followerCount -= 1;
    }

    getFollowedCount(): number {
        return this.followedCount;
    }

    setFollowedCount(followedCount: number): void {
        this.followedCount = followedCount;
    }

    increaseFollowedCount(): void {
        this.followedCount += 1;
    }

    decreaseFollowedCount(): void {
        this.followerCount -= 1;
    }

    getReflectionCount(): number {
        return this.reflectionCount;
    }

    getNoteCount(): number {
        return this.noteCount;
    }

    getSuggestionCount(): number {
        return this.suggestionCount;
    }

    getRoles(): ReadonlyArray<string> {
        return Object.freeze([...this.roles]);
    }

    getCreatedAt(): Readonly<Date> {
        return Object.freeze(new Date(this.createdAt));
    }

    getUpdateCount(): number {
        return this.updateCount;
    }

    getIsFrozen(): boolean {
        return this.isFrozen;
    }

    getImageUint8Array(): Uint8Array | null {
        return this.image ? Object.freeze(this.image) : null;
    }

    getImage(): string {
        if (this.cachedImageBase64 !== null) return this.cachedImageBase64;

        if (!this.image) return String();

        const base64 = Buffer.from(this.image).toString("base64");
        this.cachedImageBase64 = base64;
        return base64;
    }

    getSurname(): string | null {
        return this.surname;
    }

    getBiography(): string | null {
        return this.biography;
    }

    getPrivateFrom(): Readonly<Date> | null {
        return this.privateFrom ? Object.freeze(new Date(this.privateFrom)) : null;
    }

    getFollowStatusUserInspecting(): T_FollowStatus | null {
        return this.followStatusUserInspecting;
    }

    setFollowStatusUserInspecting(followStatus: T_FollowStatus | null): void {
        this.followStatusUserInspecting = followStatus;
    }

    getFollowStatusUserInspected(): T_FollowStatus | null {
        return this.followStatusUserInspected;
    }

    setFollowStatusUserInspected(followStatus: T_FollowStatus | null): void {
        this.followStatusUserInspected = followStatus;
    }

    getIsUserInspectedBlocked(): boolean {
        return this.isUserInspectedBlocked;
    }

    setIsUserInspectedBlocked(isBlocked: boolean): void {
        this.isUserInspectedBlocked = isBlocked;
    }
}

export class UserOwnDTO {
    private cachedImageBase64: string | null = null;

    constructor(
        private readonly id: string,
        private readonly username: string,
        private readonly name: string,
        private readonly email: string,
        private readonly langId: T_SystemLanguageId,
        private readonly createdAt: Date,
        private readonly roles: ReadonlyArray<string>,
        private readonly image: Uint8Array | null = null,
        private readonly surname: string | null = null,
        private readonly biography: string | null = null,
        private privateFrom: Date | null = null,
        private readonly gender: string | null = null
    ) {
    }

    getId(): string {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getLangId(): T_SystemLanguageId {
        return this.langId;
    }

    getCreatedAt(): Readonly<Date> {
        return Object.freeze(new Date(this.createdAt));
    }

    getRoles(): ReadonlyArray<string> {
        return Object.freeze([...this.roles]);
    }

    getImageUint8Array(): Uint8Array | null {
        return this.image ? Object.freeze(this.image) : null;
    }

    getSurname(): string | null {
        return this.surname;
    }

    getBiography(): string | null {
        return this.biography;
    }

    getPrivateFrom(): Date | null {
        return this.privateFrom ? Object.freeze(new Date(this.privateFrom)) : null;
    }

    togglePrivateFrom(): void {
        this.privateFrom = this.privateFrom == null ? new Date() : null;
    }

    getGender(): string | null {
        return this.gender;
    }

    getImage(): string {
        if (this.cachedImageBase64 !== null) {
            return this.cachedImageBase64;
        }

        if (!this.image) {
            return String();
        }

        const base64 = Buffer.from(this.image).toString("base64");
        this.cachedImageBase64 = base64;
        return base64;
    }
}

type ConstructorArg<T> = T extends new (arg: infer U) => any ? U : never;

export type T_UserDTO = ConstructorArg<typeof UserDTO>
