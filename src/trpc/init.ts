import { initTRPC } from "@trpc/server";
import * as trpcExpress from '@trpc/server/adapters/express';

// context created and sent with any trpc route call
const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({
    req,
    res
});

type TrpcContextType = Awaited<ReturnType<typeof createContext>>;

const trpcContext = initTRPC.context<TrpcContextType>().create();

// define public and private procedure
const trpcRouter = trpcContext.router;
const trpcPublicProcedure = trpcContext.procedure;

export { trpcRouter, trpcPublicProcedure, createContext };
