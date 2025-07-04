import { getSession } from '@/lib/session';
import React from 'react'

export default function useSession() {

    const [session, setSession] = React.useState({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: true,
    });

    

    React.useEffect(() => {
        const fetchSession = async () => {
            const { isAuthenticated, token, userId } = await getSession();
            setSession({
                isAuthenticated,
                token,
                user: userId,
                isLoading: false,
            });
        };

        fetchSession();
    }, []);

    return session;
}
