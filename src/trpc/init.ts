import { initTRPC } from "@trpc/server";
import * as trpcExpress from '@trpc/server/adapters/express';

// created for each request
const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({});

type Context = Awaited<ReturnType<typeof createContext>>;

const trpcContext = initTRPC.context<Context>().create();

const trpcRouter = trpcContext.router;
const trpcPublicProcedure = trpcContext.procedure;

export { trpcRouter, trpcPublicProcedure, createContext };
