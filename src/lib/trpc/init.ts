import { initTRPC } from "@trpc/server";

const trpcContext = initTRPC.context().create();

const trpcRouter = trpcContext.router;
const trpcPublicProcedure = trpcContext.procedure;

export { trpcRouter, trpcPublicProcedure };
