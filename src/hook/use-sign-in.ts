import React from 'react';

import { LOGIN_URL, LOGIN_URL_METHOD } from '@/constants/urls';
import { SigInFormSchema } from '@/lib/definition';
import { FecthError, fetcher } from '@/lib/fetch';
import { createSession } from '@/lib/session';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function useSignIn() {

    const router = useRouter();

    const { mutate, data, isPending, isError, } = useMutation({
        mutationKey: ['sign-in'],
        mutationFn: async (event: React.FormEvent<HTMLFormElement>) => {
            const formData = new FormData(event.target as HTMLFormElement);
            const validateUserSignInData = SigInFormSchema.safeParse({
                email: formData.get('email'),
                password: formData.get('password'),
            })

            if (!validateUserSignInData.success) {
                const errors = validateUserSignInData.error.flatten()
                return {
                    errors: {
                        email: errors.fieldErrors.email,
                        password: errors.fieldErrors.password,
                    },
                }
            }

            const email = formData.get('email');
            const password = formData.get('password');

            try {
                const { access } = await fetcher(LOGIN_URL, {
                    method: LOGIN_URL_METHOD,
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                    isGuest: true,
                });


                await createSession(`${name}`, access);

                router.replace('/')

            } catch (error) {
                if (error instanceof FecthError) {
                    return {
                        errors: {
                            email: error.info?.email ?? '',
                            password: error.info?.password ?? '',
                        },
                        message: error.info?.detail ?? "",
                    }
                }
            }

            

        }
    })

    return {
        mutate,
        isPending,
        isError,
        data,
    }
}
