import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { buildConfig } from "payload/config";
import Users from "./collections/Users";
import Products from "./collections/Products";
import Media from "./collections/Media";

const payloadConfig = buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [Users, Products, Media],
    routes: {
        admin: '/admin'
    },
    admin: {
        user: 'users',
        bundler: webpackBundler(),
        meta: {
            titleSuffix: process.env.APP_NAME_URL,
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
