export interface UserInfo {
    id: string;
    userName: string;
    account: string;
    password: string;
    avatar?: string;
    bio?: string;
    location?: string;
    occupation?: string;
    github?: string;
    twitter?: string;
    email?: string;
    followers?: number;
    revision?: number;
    created_by?: string;
    created_time?: Date;
    updated_by?: string;
    updated_time?: Date;
}