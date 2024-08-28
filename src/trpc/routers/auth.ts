import { SignupCredentialsValidator } from "../../lib/validators";
import { trpcPublicProcedure, trpcRouter } from "../init";
import { getPayloadClient } from "../../lib/payloadClient";
import { TRPCError } from "@trpc/server";

const authRouter = trpcRouter({
    createUser: trpcPublicProcedure
        .input(SignupCredentialsValidator)
        .mutation(async ({input}) => {
            const {email, password} = input;
            // const payload = await getPayloadClient();

            // const {docs: users} = await payload.find({
            //     collection: 'users',
            //     where: {
            //         email: {
            //             equals: email
            //         }
            //     }
            // });

            // if (users.length !== 0) {
            //     throw new TRPCError({code: 'CONFLICT'});
            // }

            // await payload.create({
            //     collection: 'users',
            //     data: {
            //         email: email,
            //         password: password,
            //         role: 'user'
            //     }
            // });
            return { success: true, sentToEmail: email, withPassword: password };
        }),
});

export { authRouter };
