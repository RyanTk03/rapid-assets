import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
    slug: 'users',
    auth: false,
    access: {
        read: () => true,
        create: () => true
    },
    fields: [
        {
            name: 'role',
            type: 'select',
            options: [
                {label: 'Admin', value: 'admin'},
                {label: 'User', value: 'user'}
            ]
        }
    ]
};

export default Users;
