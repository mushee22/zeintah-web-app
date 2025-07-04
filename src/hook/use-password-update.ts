import { queryClient } from '@/lib/client';
import { PasswordUpdateSchema } from '@/lib/definition';
import { getAuthAccessToken, getURL } from '@/lib/fetch';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { USER_PASSWORD_UPADTE_URL, USER_PROFILE_UPADTE_URL_METHOD } from '../constants/urls';

export default function usePasswordUpdateMutation() {

    const [userState, setUserState] = React.useState({
        new_password: "",
        old_password: ""
    })

    const router = useRouter();

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
            const old_password = formData.get('old_password');
            const new_password = formData.get('new_password');


            const validateUserEditData = PasswordUpdateSchema.safeParse({
                oldPassword: old_password,
                newPassword: new_password
            })

            if (!validateUserEditData.success) {
                const errors = validateUserEditData.error.flatten();
                return {
                    errors: {
                        old_password: errors.fieldErrors.oldPassword,
                        new_password: errors.fieldErrors.newPassword,
                    },
                }
            }

            try {

                const response = await fetch(getURL(USER_PASSWORD_UPADTE_URL), {
                    method: USER_PROFILE_UPADTE_URL_METHOD,
                    body: JSON.stringify({
                       old_password: old_password,
                       new_password: new_password 
                    }),
                    headers: {
                        Authorization: `Bearer ${await getAuthAccessToken()}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    queryClient.invalidateQueries({ queryKey: ['user'] });
                    router.replace('/profile');
                    return
                }

                return {
                    message: 'Old Password is not correct',
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
