import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import * as trpcExpress from '@trpc/server/adapters/express';
import { getPayloadClient } from './lib/payloadClient';
import { nextApp, nextHandler } from './next.utils';
import { trpcServerRouter } from './lib/trpc/server';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

function init() {
    dotenv.config({
        path: path.resolve(__dirname, '../.env'),
    });
}

async function start() {
    init();

    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin URL - http://localhost:${PORT}${cms.getAdminURL()}`)
            }
        }
    });

    app.use((req, res) => nextHandler(req, res));

    app.use('/api/trpc', trpcExpress.createExpressMiddleware({
        router: trpcServerRouter,
        createContext: ({req, res}) => ({
            req,
            res
        })
    }))

    nextApp.prepare()
    .then(() => {
        payload.logger.info(`next.js started and running at http://localhost:${PORT}`);
    });

    app.listen(PORT, async () => {
        payload.logger.info(
            "Server starting, waiting for next ..."
        );
    });
}

start();
