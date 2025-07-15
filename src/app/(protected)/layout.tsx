
import CourseProgressCard from '@/components/elements/course-progress-card';
import ProfileUpdateSheet from '@/components/elements/profile-update-sheet';
import MobileNavBar from '@/components/layout/mobile-nav-bar';
import SideBar from '@/components/layout/side-bar';
import AuthContextProvider from '@/context/auth-context';
import { getSession } from '@/lib/session';
import { PropsWithChildren } from 'react';



export default async function layout({ children }: PropsWithChildren) {

    const { isAuthenticated } = await getSession();

    // if (!isAuthenticated) redirect('/sign-in');

    return (
        <>
            <div className={'relative h-screen flex flex-col'}>
                <AuthContextProvider>
                    <SideBar />
                    <main className="md:pl-[102px]  flex-1">
                        {children}
                    </main>
                    <MobileNavBar />
                    <ProfileUpdateSheet />
                </AuthContextProvider>
                <CourseProgressCard />
            </div>
        </>
    )
}
