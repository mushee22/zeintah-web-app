'use client'
import { USER_URL } from '@/constants/urls';
import { fetcher } from '@/lib/fetch';
import { deleteSession, getSession } from '@/lib/session';
import { Student } from '@/type';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react';

interface AuthContexState {
    isAuthenticated: boolean;
    user: Student | null,
    token: string | null;
    isAuthenticating: boolean;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthContextProps extends AuthContexState {
    setContextState?: React.Dispatch<React.SetStateAction<AuthContexState>>;
    onLogout?: () => void;
}

const AuthContext = React.createContext<AuthContextProps>({
    isAuthenticated: false,
    user: null,
    token: null,
    isAuthenticating: true,
});



export default function AuthContextProvider({ children }: PropsWithChildren) {

    const router = useRouter()

    const [contextState, setContextState] = React.useState<AuthContexState>({
        isAuthenticated: false,
        user: null,
        token: null,
        isAuthenticating: true,
    });

    const [open, setOpen] = React.useState(false);


    



    const { isLoading, data: sessionData } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const { isAuthenticated, token, userId } = await getSession();
            console.log('sessionData', { isAuthenticated, token, userId });
            return {
                isAuthenticated,
                token,
                userId,
            };
        },

    });

    const { data, isLoading: IsFetchingUserLoading, isError } = useQuery({
        queryKey: ['user', sessionData?.userId],
        queryFn: async () => {
            const { token } = sessionData ?? {};
            if (!token) return null;
            const res = await fetcher(USER_URL, {
                isGuest: false,
            });
            return res;
        },
        enabled: !isLoading,
    })

    const onLogout = async () => {
        await deleteSession();
        setContextState({
            isAuthenticated: false,
            user: null,
            token: null,
            isAuthenticating: false,
        });
        router.replace('/sign-in')
    }

    useEffect(() => {
        if (IsFetchingUserLoading || isLoading) return

        if (isError) {
            deleteSession();

        }

        if (!sessionData?.isAuthenticated) {
            setContextState({
                isAuthenticated: false,
                user: null,
                token: null,
                isAuthenticating: false,
            })
            return
        }

        console.log('Error fetching user data:', data);

        setContextState({
            isAuthenticated: !isError || !!sessionData?.isAuthenticated,
            user: data?.data || null,
            token: sessionData?.token || null,
            isAuthenticating: false,
        })

    }, [data, IsFetchingUserLoading])



    const value = {
        ...contextState,
        open,
        setOpen,
        setContextState,
        onLogout
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )


}


export const useAuthContext = () => {
    const context = React.useContext(AuthContext);
    return context;
}

