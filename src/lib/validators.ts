import { z } from "zod";

const SignupCredentialsValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long.',
    }),
});

export type TSignupCredentialsValidator = z.infer<typeof SignupCredentialsValidator>;

export { SignupCredentialsValidator };
