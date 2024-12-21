import { z } from "zod";

const SignupCredentialsValidator = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, {
            message: 'Password must be at least 8 characters long.',
        })
        .regex(/[A-Z]/, {
            message: 'Password must contain at least one uppercase letter.',
        })
        .regex(/\d/, {
            message: 'Password must contain at least one digit.',
        }),
    confirmPassword: z.string()
        .min(8, {
            message: 'Password confirmation must be at least 8 characters long.',
        }),
}).superRefine((obj, ctx) => {
    if (obj.password !== obj.confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords must match.',
            path: ['confirmPassword']
        });
    }
});

const SigninCredentialsValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long.',
    }),
});

export type TSignupCredentialsValidator = z.infer<typeof SignupCredentialsValidator>;
export type TSigninCredentialsValidator = z.infer<typeof SigninCredentialsValidator>;

export { SignupCredentialsValidator, SigninCredentialsValidator };
