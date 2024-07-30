import { createTRPCReact } from '@trpc/react-query';
import type { TrpcServerRouter } from './server';

const trpc = createTRPCReact<TrpcServerRouter>({});

export { trpc };
