import { z } from 'zod'

export const SigInFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})

export const SigUpFormSchema = z.object({
    name: z.string({ required_error: 'Please enter a name' }).trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    phone: z
        .string(
            { required_error: 'Please enter a valid phone number.' }
        ),

    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
    confirmPassword: z.string().trim(),
}).refine((data) => data.password == data.confirmPassword, {
    message: 'Passwords do not match',
})

export const UserEditSchema = z.object({
    name: z.string({ required_error: 'Please enter a name' }).trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    phone: z
        .string(
            { required_error: 'Please enter a valid phone number.' }
        ),
    password: z.string().min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim().optional(),
    old_password: z.string().optional(),
})

export const PasswordUpdateSchema = z.object({
    newPassword: z.string().min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        }),
    oldPassword: z.string().min(1, 'Old password required'),    
})

export type AuthFormState =
    | {
        errors?: Record<string, string[] | undefined>
        message?: string
    }
    | undefined