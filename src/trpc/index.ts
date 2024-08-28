import { trpcRouter } from "./init";
import { authRouter } from "./routers/auth";

const trpcServerRouter = trpcRouter({
    auth: authRouter,
});

export type TrpcServerRouter = typeof trpcServerRouter;

export { trpcServerRouter }
