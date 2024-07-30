import payload, { Payload } from 'payload';
import type { InitOptions } from 'payload/config';

let cached = (global as any).payload

if (!cached) {
    cached = (global as any).payload = {
        client: null,
        promise: null,
    }
}

async function getPayloadClient({
    initOptions,
} : {
    initOptions?: Partial<InitOptions>
} = {}): Promise<Payload> {
    console.log(process.env.PAYLOAD_SECRET, process.env.DATABASE_URL);
    if (!process.env.PAYLOAD_SECRET) {
        throw new Error("PAYLOAD_SECRET is missing")
    }

    if (cached.client) {
        return cached.client;
    }

    if (!cached.promise) {
        cached.promise = payload.init({
            secret: process.env.PAYLOAD_SECRET,
            local: initOptions?.express ? false : true,
            ...(initOptions || {})
        });
    }

    try {
        cached.client = await cached.promise
    } catch (e: unknown) {
        cached.promise = null;
        throw e;
    }

    return cached.client;
}

export { getPayloadClient };
