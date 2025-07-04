'use client'
import { useAuthContext } from '@/context/auth-context'
import Container from '../elements/container'
import CourseProgressCard from '../elements/course-progress-card'
import PageHeader from '../elements/page-header'
import ProfileSettingsMenu from '../elements/profile-settings-menu'
import UserDetails from '../sections/profile/user-details'

export default function Profile() {

  const { user, isAuthenticating } = useAuthContext()

  return (
    <Container className='space-y-4'>
      <PageHeader
        pageTitle='Profile'
        endIcon={<>
          <ProfileSettingsMenu />
        </>}
      />
      {
        !isAuthenticating ?
          <UserDetails
            name={user?.user?.first_name + ' ' + (user?.user?.last_name ?? '')}
            role='Learner'
            bio={user?.student_bio ?? ''}
            email={user?.user?.email ?? ''}
            imageUrl={user?.profile_image ?? ''}
          />
          :
          <ProfileSkeletonView />
        // <></>
      }
      <CourseProgressCard />
    </Container>
  )
}

function ProfileSkeletonView() {
  return (
    <div className='flex gap-x-3 items-center'>
      <div className='animate-pulse bg-white w-20 h-[134px] rounded-md'></div>
      <div className='flex-1 space-y-2'>
        <div className='w-ful  max-w-[300px] animate-pulse bg-white h-1.5 rounded-md'></div>
        <div className='w-ful  max-w-[210px] animate-pulse bg-white h-1.5 rounded-md'></div>
        <div className='w-ful  max-w-[250px] animate-pulse bg-white h-1.5 rounded-md'></div>
      </div>
    </div>
  )
}
