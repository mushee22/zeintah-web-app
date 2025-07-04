import { AuthFormState, SigInFormSchema } from '@/lib/definition';

import { fetcher } from '@/lib/fetch';

import { LOGIN_URL, LOGIN_URL_METHOD, REGISTRATION_URL, REGISTRATION_URL_METHOD } from '../constants/urls';

import { createSession } from '@/lib/session';

import { redirect } from 'next/navigation';

export async function signIn(state: AuthFormState, formData: FormData) {

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
            message: "Please check your input",
        }
    }

    const email = formData.get('email');
    // const password = formData.get('password');

    try{
        console.log('email', email);
        const { access } = await fetcher(LOGIN_URL, {
            method: LOGIN_URL_METHOD,
            body: JSON.stringify({  
                username: `$abcd`,
                password: '8593901812',
            }),
            isGuest: true,
        });

        console.log('access', access);

        await createSession(`${name}`, access);

        redirect('/')

    } catch (error) {
        console.error('Error:', error);
    }

    //api call

}

export async function signUp(state: AuthFormState, formData: FormData) {

    const email = formData.get('email');
    
    const password = formData.get('password');
    
    const name = formData.get('name');
    
    // const code = formData.get('code');
    
    const phone = formData.get('phone');

    const [ firstName, lastName ] = `${name}`.split(' '); 

    try {

        await fetcher(REGISTRATION_URL, {
            method: REGISTRATION_URL_METHOD,
            body: JSON.stringify({
                email,
                password,
                name,
                first_name: firstName,
                last_name: lastName,
                phone
            }),
        })

        const { access } = await fetcher(LOGIN_URL, {
            method: LOGIN_URL_METHOD,
            body: JSON.stringify({
                username: name,
                password,
            }),
        });

        await createSession(`${name}`, access);  

        redirect('/')

    } catch (error) {
        console.error('Error:', error);
        return {
            message: "User already exists",
        }
    }
}