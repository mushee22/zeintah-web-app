


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import usePasswordUpdateMutation from '@/hook/use-password-update';


export default function ProfileEditForm() {

    const {
        mutate,
        isPending,
        data,
        userState,
        handleChange,
    } = usePasswordUpdateMutation()

    return (
        <section className='mt-10'>
            <form onSubmit={mutate} className='flex flex-col gap-y-5 max-w-xl '>
                {
                    data?.message && (
                        <p className='text-red-500 text-sm font-medium'>{data?.message}</p>
                    )
                }
                <div className='flex flex-col gap-y-1'>
                    <label className='text-sm font-medium'>Old Password</label>
                    <Input
                        type="password"
                        placeholder="Old Password"
                        className=""
                        name='old_password'
                        value={userState.old_password}
                        onChange={handleChange}
                    />
                    {
                        data?.errors?.old_password && (
                            <p className='text-red-500 text-sm font-medium'>{data?.errors?.old_password[0]}</p>
                        )
                    }
                </div>
                <div className='flex flex-col gap-y-1'>
                    <label className='text-sm font-medium'>New Password</label>
                    <Input
                        type="password"
                        placeholder="New Password"
                        className=""
                        name='new_password'
                        value={userState.new_password}
                        onChange={handleChange}
                    />
                    {
                        data?.errors?.new_password && (
                            <p className='text-red-500 text-sm font-medium'>{data?.errors?.new_password[0]}</p>
                        )
                    }
                </div>
                
                <Button disabled={isPending}>
                    {
                        isPending ? 'Updating...' : 'Update'
                    }
                </Button>
            </form>
        </section>
    )
}
