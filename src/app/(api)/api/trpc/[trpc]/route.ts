import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { trpcServerRouter } from '../../../../../trpc';
import { NextRequest } from 'next/server';

function handler (req: NextRequest) {
    return fetchRequestHandler({
       endpoint: `/api/trpc`,
       req: req as any,
       router: trpcServerRouter,
       createContext: () => ({})
    });
    // return Response.json({message: 'success 🎉🎉'}); // For test purpose
}

export { handler as POST, handler as GET }