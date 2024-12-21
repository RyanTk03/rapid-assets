import { CollectionConfig } from "payload/types";
import { getEmailConfirmationTemplate } from "../lib/email";

const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        verify: {
            generateEmailHTML({token}) {
                return getEmailConfirmationTemplate(token);
            },
        }
    },
    access: {
        read: ({req}) => req.user.role === 'admin',
        create: ({req}) => req.user.role === 'admin',
        update: ({req}) => req.user.role === 'admin',
    },
    fields: [
        {
            admin: {
                condition: ({req}) => req.user.role === 'admin'
            },
            name: 'role',
            defaultValue: 'user',
            required: true,
            type: 'select',
            options: [
                {label: 'Admin', value: 'admin'},
                {label: 'User', value: 'user'}
            ]
        }
    ]
};

export default Users;
