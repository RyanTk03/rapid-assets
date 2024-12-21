import { CollectionConfig } from "payload/types";

const ProductFiles: CollectionConfig = {
    slug: 'product_files',
    admin: {
        hidden: ({user}) => user.role !== 'admin'
    },

}