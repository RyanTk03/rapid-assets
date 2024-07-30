import { trpcServerRouter } from '@/lib/trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

function handler(req: Request) {
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: trpcServerRouter,
        createContext: () => ({})
    });
}

export { handler as GET, handler as POST };
