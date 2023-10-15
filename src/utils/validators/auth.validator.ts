import { z } from 'zod';

const errors = {
    required: 'Il campo è obbligatorio',
    tooShort: 'La password deve avere almeno 8 caratteri',
    invalidEmail: 'La email non è valida',
    passwordMismatch: 'La password non coincidono'
}

export const LoginSchema = z.object({
    email: z.string({ required_error: errors.required }).min(1, errors.required),
    password: z.string({ required_error: errors.required }).min(1, errors.required),
});

export type LoginSchema = z.infer<typeof LoginSchema>;

export const SignupSchema = z
    .object({
        email: z.string({ required_error: errors.required }).email(errors.invalidEmail),
        name: z.string({ required_error: errors.required }),
        surname: z.string({ required_error: errors.required }),
        phone: z.string({ required_error: errors.required }),
        tickets: z.enum(['2', '5', '10'], { required_error: errors.required }),
        password: z.string({ required_error: errors.required }).min(8, errors.tooShort),
        confirmpassword: z.string({ required_error: errors.required })
    })
    .refine(data => data.password === data.confirmpassword, {
        message: errors.passwordMismatch,
        path: ['confirmpassword'],
    });

export type SignupSchema = z.infer<typeof SignupSchema>;