'use client'
import { useAuthContext } from '@/context/auth-context'
import Container from '../elements/container'
import PageHeader from '../elements/page-header'

export default function UserEditPageContent() {
   
    const { user } = useAuthContext();

    return (
        <Container>
            <PageHeader
                pageTitle={user?.user?.first_name + ' ' + (user?.user?.last_name ?? '')} 
                isBackButton
            />
            {/* <ProfileEditForm/> */}
        </Container>
    )
}
