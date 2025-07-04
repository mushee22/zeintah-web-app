'use server'
import { cookies } from 'next/headers';

export async function createSession(userId: string, token: string) {

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = JSON.stringify({ userId, token });

    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: false,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function getSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get('session');

    if (!session || !session.value) return {
            userId: '',
            token: '',
            isAuthenticated: false,   
    }

    const sesssionParsed = JSON?.parse(session.value);

    return {
        userId: sesssionParsed?.userId,
        token: sesssionParsed?.token,
        isAuthenticated: !!sesssionParsed.token,
    }
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}