export interface IChirp {
    id: number;
    user_id: number;
    body: string;
    location: string;
    created_at: string;
    handle: string;
    email: string;
}

export interface IChirpMention {
    chirp_id: number;
    body: string;
    mentioned_user_id: number;
    mentioned_user_handle: string;
    author_handle: string;
    author_id: number;
}

export interface IUser {
    id: number;
    handle: string;
    email: string;
    created_at: string;
}