import { SignupCredentialsValidator, SigninCredentialsValidator } from "../../lib/validators";
import { trpcPublicProcedure, trpcRouter } from "../init";
import { getPayloadClient } from "../../lib/payloadClient";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const authRouter = trpcRouter({
    createUser: trpcPublicProcedure
        .input(SignupCredentialsValidator)
        .mutation(async ({input}) => {
            const {email, password} = input;
            const payload = await getPayloadClient();

            const {docs: users} = await payload.find({
                collection: 'users',
                where: {
                    email: {
                        equals: email
                    }
                }
            });

            if (users.length !== 0) {
                throw new TRPCError({code: 'CONFLICT'});
            }

            try {
                await payload.create({
                    collection: 'users',
                    data: {
                        email: email,
                        password: password,
                        role: 'user'
                    }
                });
                return { success: true, verifyingEmail: email};
            } catch (error) {
                throw new TRPCError({code: 'INTERNAL_SERVER_ERROR'});
            }
        }),
    verifyEmail: trpcPublicProcedure
        .input(z.object({token: z.string()}))
        .query(async ({input}) => {
            const { token } = input;
            const payload = await getPayloadClient();
            const isVerified = payload.verifyEmail({
                collection: 'users',
                token
            });

            if (!isVerified)
                throw new TRPCError({code: 'UNAUTHORIZED'});

            return {success: true};
        }),
    signin: trpcPublicProcedure
        .input(SigninCredentialsValidator)
        .mutation(async ({input, ctx}) => {
            const { email, password } = input;
            const payload = await getPayloadClient();
            const { res } = ctx;

            try {
                await payload.login({
                    collection: 'users',
                    data: {
                        email,
                        password
                    },
                    res
                })
            } catch (error) {
                throw new TRPCError({code: 'UNAUTHORIZED'});
            }
        }),
});

export { authRouter };
