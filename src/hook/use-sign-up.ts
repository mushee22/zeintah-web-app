import { SigUpFormSchema } from '@/lib/definition';
import { FecthError, fetcher } from '@/lib/fetch';
import { createSession } from '@/lib/session';
import { getFirstNameAndLastName } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LOGIN_URL, LOGIN_URL_METHOD, REGISTRATION_URL, REGISTRATION_URL_METHOD } from '../constants/urls';

export default function useSignUp() {

    const router = useRouter();

    const { mutate, data, isPending } = useMutation({
        mutationKey: ['sign-up'],
        mutationFn: async (event: React.FormEvent<HTMLFormElement>) => {
            const formData = new FormData(event.target as HTMLFormElement);
            const validateUserSignUpData = SigUpFormSchema.safeParse({
                email: formData.get('email'),
                password: formData.get('password'),
                name: formData.get('name'),
                confirmPassword: formData.get('confirmPassword'),
                code: formData.get('code'),
                phone: formData.get('phone'),
            })

            if (!validateUserSignUpData.success) {
                const errors = validateUserSignUpData.error.flatten()
                return {
                    errors: {
                        email: errors.fieldErrors.email,
                        password: errors.fieldErrors.password,
                        name: errors.fieldErrors.name,
                        confirmPassword: errors.formErrors,
                        phone: errors.fieldErrors.phone,
                    },
                    // message: "Please check your input",
                }
            }

            const email = formData.get('email');
            const password = formData.get('password');
            const name = formData.get('name');
            // const code = formData.get('code');
            const phone = formData.get('phone');
            const { firstName, lastName } = getFirstNameAndLastName(`${name ?? ''}`);

            try {

             await fetcher(REGISTRATION_URL, {
                    method: REGISTRATION_URL_METHOD,
                    body: JSON.stringify({
                        email,
                        password,
                        username: name,
                        first_name: firstName,
                        last_name: lastName,
                        phone
                    }),
                    isGuest: true,
                });

                const { access } = await fetcher(LOGIN_URL, {
                    method: LOGIN_URL_METHOD,
                    body: JSON.stringify({
                        email: email,
                        password,
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
                            phone: error.info?.phone ?? '',
                        },
                    }
                }
            }

        }
    })

    return {
        mutate,
        isPending,
        data,
    }
}
