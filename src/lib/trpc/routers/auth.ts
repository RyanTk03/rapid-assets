import { SignupCredentialsValidator } from "../../validators";
import { trpcPublicProcedure, trpcRouter } from "../init";
import { getPayloadClient } from "../../payloadClient";
import { TRPCError } from "@trpc/server";

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

        await payload.create({
            collection: 'users',
            data: {}
        })
    }),
});

export { authRouter };
