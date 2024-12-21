import { CollectionConfig } from "payload/types";
import { getEmailConfirmationTemplate } from "../lib/email";
import { PRODUCTS_CATEGORIES } from "../config/productsCategories";

const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name'
    },
    access: {
        read: () => true,
        create: () => true
    },
    fields: [
        {
            name: 'user',
            label: 'User',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: {
                condition: () => false
            }
        },
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            required: true
        },
        {
            name: 'price',
            label: 'Price in USD',
            type: 'number',
            required: true,
            min: 0,
            max: 10000
        },
        {
            name: 'category',
            label: 'Category',
            type: 'select',
            required: true,
            options: PRODUCTS_CATEGORIES.map(({label, value}) => ({label, value}))
        },
        {
            name: 'state',
            label: 'State',
            type: 'select',
            defaultValue: 'pending',
            access: {
                read: ({req}) => req.user.role === 'admin',
                create: ({req}) => req.user.role === 'admin',
                update: ({req}) => req.user.role === 'admin'
            },
            options: [
                {
                    label: 'Approved',
                    value: 'approved'
                },
                {
                    label: 'Denied',
                    value: 'denied'
                },
                {
                    label: 'Pending',
                    value: 'pending'
                },
            ]
        },
        // {
        //     name: 'product_files',
        //     label: 'Product files',
        //     type: 'relationship',
        //     relationTo: 'product_files',
        //     required: true,
        //     hasMany: false
        // },
        {
            name: 'images',
            label: 'Product images',
            type: 'array',
            labels: {
                singular: 'Image',
                plural: 'Images'
            },
            minRows: 1,
            maxRows: 4,
            required: true,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true
                }
            ]
        },
        {
            name: 'priceId',
            access: {
                read: ({req}) => req.user.role === 'admin',
                create: ({req}) => req.user.role === 'admin',
                update: ({req}) => req.user.role === 'admin',
            },
            type: 'text',
            admin: {
                hidden: true,
            }
        },
        {
            name: 'stripeId',
            access: {
                read: ({req}) => req.user.role === 'admin',
                create: ({req}) => req.user.role === 'admin',
                update: ({req}) => req.user.role === 'admin',
            },
            type: 'text',
            admin: {
                hidden: true,
            }
        }
    ]
};

export default Products;
