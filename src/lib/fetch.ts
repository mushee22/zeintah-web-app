import { getSession } from "./session";

interface FetcherOptions extends RequestInit {
    isAbsolute?: boolean;
    isGuest?: boolean;
    isFormData?: boolean;
}

export const getURL = (path: string) => {
    const baseURL =  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/web/';
    return `${baseURL}${path}`;
}

export const getImageURL = (path: string) => {
    const baseURL = process.env.NEXT_PUBLIC_IS_MEDIA_URL_TYPE == "RELATIVE" ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000/' : "";
    return `${baseURL}${path}`;
}

export const getAuthAccessToken = async () => {
    const { token } = await getSession();
    return token;
}

export const fetcher = async (path: string, options: FetcherOptions = {}) => {

    if (!path) {
        throw new Error('URL is required');
    }

    const apiPath = options?.isAbsolute ? path : getURL(path);

    const res = await fetch(apiPath, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options?.isGuest ? {} : { Authorization: `Bearer ${await getAuthAccessToken()}` }),
            ...options.headers,
        },
    });

    if (!res.ok) {
        const info = await res.json();
        const status = res.status;
        const error = new FecthError('An error occurred while fetching the data.', info, status);
        throw error;
    }

    return res.json();
}


export class FecthError extends Error {
    info: Record<string, string>
    status: number

    constructor(message: string, info: Record<string, string>, status: number) {
        super(message);
        this.name = 'CustomError';
        this.info = info;
        this.status = status;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FecthError);
        }
    }
}