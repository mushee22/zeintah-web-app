
import ProfileUpdateSheet from '@/components/elements/profile-update-sheet';
import MobileNavBar from '@/components/layout/mobile-nav-bar';
import AuthContextProvider from '@/context/auth-context';

import { PropsWithChildren } from 'react';

export default async function layout({ children }: PropsWithChildren) {
    return (
        <>
            <div className={'relative h-screen flex flex-col'}>
                <AuthContextProvider>
                    <main className="md:pl-[230px]  flex-1">
                        {children}
                    </main>
                    <MobileNavBar />
                    <ProfileUpdateSheet />
                </AuthContextProvider>
            </div>
        </>
    )
}
