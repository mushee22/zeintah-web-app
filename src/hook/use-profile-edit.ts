import { queryClient } from '@/lib/client';
import { UserEditSchema } from '@/lib/definition';
import { getAuthAccessToken, getURL } from '@/lib/fetch';
import { getFirstNameAndLastName } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { USER_PROFILE_UPADTE_URL, USER_PROFILE_UPADTE_URL_METHOD } from '../constants/urls';
import { useAuthContext } from '../context/auth-context';

export default function useProfileMutation() {

    const [userState, setUserState] = React.useState({
        name: '',
        email: "",
        phone: "",
        student_bio: "",
        password: "",
        old_password: ""
    })

    const { user, } = useAuthContext();

    useEffect(() => {
        if (user) {
            setUserState({
                name: user?.user?.first_name + ' ' + (user?.user?.last_name ?? ''),
                email: user?.user?.email ?? '',
                phone: user?.user?.phone ?? '',
                student_bio: user?.student_bio ?? '',
                password: "",
                old_password: ""
            })
        }
    }, [user])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const { mutate, isPending, isError, data } = useMutation({

        mutationKey: ['profiele-edit'],

        mutationFn: async (event: React.FormEvent<HTMLFormElement>) => {
            const formData = new FormData(event.target as HTMLFormElement);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const bio = formData.get('student_bio');
            const password = formData.get('password');
            // const oldPassword = formData.get('old_password');
            formData.append('profile_image', '')

            const validateUserEditData = UserEditSchema.safeParse({
                name,
                email,
                phone
            })

            if (!validateUserEditData.success) {
                const errors = validateUserEditData.error.flatten();
                return {
                    errors: {
                        name: errors.fieldErrors.name,
                        email: errors.fieldErrors.email,
                        phone: errors.fieldErrors.phone,
                        password: errors.fieldErrors.password,
                        // old_password: errors.fieldErrors.old_password,
                    },
                }
            }

            try {
                const { firstName, lastName } = getFirstNameAndLastName(`${name ?? ''}`);
                const response = await fetch(getURL(USER_PROFILE_UPADTE_URL), {
                    method: USER_PROFILE_UPADTE_URL_METHOD,
                    body: JSON.stringify({
                        user: {
                            first_name: firstName,
                            last_name: lastName,
                            email,
                            phone,
                            ...(password ? {
                                password,
                                // old_password: oldPassword
                            } : {})
                        },
                        student_bio: bio,
                    }),
                    headers: {
                        Authorization: `Bearer ${await getAuthAccessToken()}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    queryClient.invalidateQueries({ queryKey: ['user'] });
                    // router.replace('/profile');
                    return
                }

                return {
                    message: 'Something went wrong, Pls try again',
                }


            } catch (error) {
                console.error('Error:', error);
                return {
                    message: 'Something went wrong, Pls try again',
                }
            }
        },
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(e);
    }

    return {
        mutate: handleSubmit,
        handleChange,
        isPending,
        isError,
        data,
        userState
    }

}
