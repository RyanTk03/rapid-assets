import { createTRPCReact } from '@trpc/react-query';
import type { TrpcServerRouter } from '.';

const trpc = createTRPCReact<TrpcServerRouter>({});

export { trpc };
