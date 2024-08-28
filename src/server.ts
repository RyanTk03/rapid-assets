import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import * as trpcExpress from '@trpc/server/adapters/express';
import { getPayloadClient } from './lib/payloadClient';
import { nextApp, nextHandler } from './next.utils';
import { trpcServerRouter } from './trpc';
import { createContext } from './trpc/init';

const PORT = Number(process.env.PORT) || 3000;
const app = express();

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

    nextApp.prepare()
    .then(() => {
        app.use(express.json());

        app.use('/api/trpc', trpcExpress.createExpressMiddleware({
            router: trpcServerRouter,
            createContext
        }));

        app.all('*', (req: Request, res: Response) => {
            return nextHandler(req, res);
        });


        payload.logger.info(`next.js ready...`);

        app.listen(PORT, async () => {
            payload.logger.info(
                `Server started, and running at http://localhost:${PORT}`
            );
        });
    })
    .catch(error => console.error(error))
}

start();
