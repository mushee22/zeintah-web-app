import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React, { PropsWithChildren } from 'react'

export default async function layout({ children }: PropsWithChildren) {

    const { isAuthenticated } = await getSession();

    if (isAuthenticated) redirect('/');

    return (
        <>
            {children}
        </>
    )
}