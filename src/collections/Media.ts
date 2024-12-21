import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const checkMediaAccess = (): Access => async ({
    req
}) => {
    const user = req.user as User | undefined;

    if (!user) return false;
    if (user.role === 'admin') return true;

    return {
        user: {
            equals: req.user.id
        }
    };
}

const Media: CollectionConfig = {
    slug: 'media',
    hooks: {
        beforeChange: [
            ({req, data}) => ({...data, user: req.user.id})
        ]
    },
    access: {
        read: async ({req}) => {
            if (!req.user || !req.headers.referer?.includes('admin')) return true;

            return checkMediaAccess()({req});
        },
        delete: checkMediaAccess(),
        update: checkMediaAccess()
    },
    admin: {
        hidden: ({user}) => user.role !== 'admin'
    },
    upload: {
        staticURL: '/upload/media',
        staticDir: 'upload/media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre'
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre'
            },
            {
                name: 'tablet',
                width: 1024,
                height: undefined,
                position: 'centre'
            }
        ],
        mimeTypes: ['image/*']
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: {
                condition: () => false
            }
        }
    ]
}

export default Media;