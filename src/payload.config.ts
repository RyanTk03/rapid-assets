import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { buildConfig } from "payload/config";
import Users from "./collections/Users";

const payloadConfig = buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [/*Users*/],
    routes: {
        admin: '/sell'
    },
    admin: {
        // user: 'users',
        bundler: webpackBundler(),
        meta: {
            titleSuffix: "RapidAssets",
            favicon: '/favicon.ico',
            ogImage: 'thumbnail.jpg'
        }
    },
    rateLimit: {
        max: 2000
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.DATABASE_URL!
    }),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts')
    }
});

export default payloadConfig;
