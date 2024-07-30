import { trpcRouter, trpcPublicProcedure } from "./init";
import { authRouter } from "./routers/auth";

const trpcServerRouter = trpcRouter({
    apiRoute: authRouter,
});

export type TrpcServerRouter = typeof trpcServerRouter;

export { trpcServerRouter }
