'use client'
import Container from '../elements/container'
import PageHeader from '../elements/page-header'
import PasswordUpdateForm from '../sections/profile/password-update-form'

export default function UpdatePassword() {
   
    return (
        <Container>
            <PageHeader
                pageTitle="Update Password" 
                isBackButton
            />
            <PasswordUpdateForm/>
        </Container>
    )
}
