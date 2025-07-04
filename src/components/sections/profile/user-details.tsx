import ProfileUpdate from "@/components/elements/profile-update";

interface Props {
    name: string;
    email: string;
    role: string;
    bio: string;
    imageUrl?: string;
}

export default function UserDetails({ name, email, bio, imageUrl }: Props) {
    return (
        <div className='flex gap-x-3 items-center'>
           <ProfileUpdate imageUrl={imageUrl} name={name} />
            <div className='max-w-[300px]'>
                <p className='text-lg font-medium '>{name}</p>
                <p className='text-sm font-light text-foreground/50'>{email}</p>
                {/* <p className='text-sm font-light text-foreground/50'>{role}</p> */}
                <p className='text-sm font-light mt-2 line-clamp-4'>
                    {
                        bio
                    }
                </p>
            </div>
        </div>
    )
}
