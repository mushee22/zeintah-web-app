import { LOGIN_URL, LOGIN_URL_METHOD } from '@/constants/urls';
import { SigInFormSchema } from '@/lib/definition';
import { FecthError, fetcher } from '@/lib/fetch';
import { createSession } from '@/lib/session';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export default function useSignIn() {

    const router = useRouter();

    const { mutate, data, isPending, isError, } = useMutation({
        mutationKey: ['sign-in'],
        mutationFn: async (credentials: z.infer<typeof SigInFormSchema>) => {

            const validateUserSignInData = SigInFormSchema.safeParse(credentials);

            if (!validateUserSignInData.success) {
                const errors = validateUserSignInData.error.flatten();
                return {
                    errors: {
                        email: errors.fieldErrors.email,
                        password: errors.fieldErrors.password,
                    },
                };
            }

            try {
                const { access } = await fetcher(LOGIN_URL, {
                    method: LOGIN_URL_METHOD,
                    body: JSON.stringify(credentials),
                    isGuest: true,
                });


                await createSession(`${credentials.email}`, access);

                router.replace('/')

                return { success: true };

            } catch (error) {
                if (error instanceof FecthError) {
                    return {
                        errors: {
                            email: error.info?.email ?? '',
                            password: error.info?.password ?? '',
                        },
                        message: error.info?.detail ?? "An error occurred during sign in.",
                    }
                }
                throw error;
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
