

import useProfileMutation from '@/hook/use-profile-edit';

import ProfileUpdate from '@/components/elements/profile-update';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/context/auth-context';
import { Pen } from 'lucide-react';


export default function ProfileEditForm({isEditing, onUpdate, onCancel} : {  isEditing: boolean, onUpdate?: () => void, onCancel?: () => void }) {

    const {  user } = useAuthContext();

    const {
        mutate,
        isPending,
        data,
        userState,
        handleChange,
    } = useProfileMutation()

    return (
        <form onSubmit={mutate} className="">
            <div className="flex gap-x-3 mb-3">
                <ProfileUpdate imageUrl={user?.profile_image} />
                <div className="flex flex-1">
                    <div className="flex-1 space-y-1">
                        {
                            isEditing ?
                                <div className='flex flex-col gap-y-1'>

                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        className=""
                                        name='name'
                                        value={userState.name}
                                        onChange={handleChange}
                                    />
                                    {
                                        data?.errors?.name && (
                                            <p className='text-red-500 text-sm font-medium'>{data?.errors?.name[0]}</p>
                                        )
                                    }
                                </div>
                                :
                                <p className='text-xl font-bold '>{user?.user?.first_name + ' ' + (user?.user?.last_name ?? '')}</p>
                        }
                        {
                            isEditing ?
                                <div className='flex flex-col gap-y-1'>

                                    <Input
                                        type="text"
                                        placeholder="Email"
                                        className=""
                                        name='email'
                                        value={userState.email}
                                        onChange={handleChange}
                                    />
                                    {
                                        data?.errors?.email && (
                                            <p className='text-red-500 text-sm font-medium'>{data?.errors?.email[0]}</p>
                                        )
                                    }
                                </div>
                                :

                                <p className='text-sm font-light text-foreground/50'>{user?.user.email}</p>
                        }
                    </div>
                    {
                        isEditing ?
                            <></>
                            :
                            <div onClick={onUpdate} className="size-9 cursor-pointer flex flex-col justify-center items-center rounded-full bg-gradient-to-r from-foreground/10 to-foreground/5 backdrop-blur-2xl">
                                <Pen size={16} />
                            </div>
                    }
                </div>
            </div>
            {
                isEditing ?
                    <div className="space-y-2">
                        <div className='flex flex-col gap-y-1'>
                            <label className='text-sm font-medium'>Phone</label>
                            <Input
                                type="text"
                                placeholder="Phone"
                                className=""
                                name='phone'
                                value={userState.phone}
                                onChange={handleChange}
                            />
                            {
                                data?.errors?.phone && (
                                    <p className='text-red-500 text-sm font-medium'>{data?.errors?.phone[0]}</p>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <label className='text-sm font-medium'>Bio</label>
                            <textarea
                                placeholder="bio"
                                className="border-foreground/20 resize-none outline-0 border rounded-md p-2"
                                name='student_bio'
                                rows={3}
                                value={userState.student_bio}
                                onChange={handleChange}

                            />
                        </div>
                    </div>
                    :
                    <p className='text-sm text-muted font-light mt-2 line-clamp-4'>
                        {
                            user?.student_bio ?? "No bio available."
                        }
                    </p>
            }

            {
                isEditing &&
                <div className="w-full grid grid-cols-2 gap-x-2 mt-5">
                    <Button disabled={isPending} variant="secondary" type="button" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button disabled={isPending}>
                        {
                            isPending ? 'Saving...' : 'Save'
                        }
                    </Button>
                </div>
            }

            {/* <ProfileEditForm /> */}
        </form>
    )
}
