const PRODUCTS_CATEGORIES = [
    {
        label: "UI Kits",
        value: 'ui_kits' as const,
        featured: [
            {
              name: 'Editor picks',
              href: `/products?category=ui_kits`,
              imageSrc: '/nav/ui-kits/mixed.jpg',
            },
            {
              name: 'New Arrivals',
              href: '/products?category=ui_kits&sort=desc',
              imageSrc: '/nav/ui-kits/blue.jpg',
            },
            {
              name: 'Bestsellers',
              href: '/products?category=ui_kits',
              imageSrc: '/nav/ui-kits/purple.jpg',
            },
        ],
    },
    {
        label: 'Icons',
        value: 'icons' as const,
        featured: [
            {
              name: 'Favorite Icon Picks',
              href: `/products?category=icons`,
              imageSrc: '/nav/icons/picks.jpg',
            },
            {
              name: 'New Arrivals',
              href: '/products?category=icons&sort=desc',
              imageSrc: '/nav/icons/new.jpg',
            },
            {
              name: 'Bestselling Icons',
              href: '/products?category=icons',
              imageSrc: '/nav/icons/bestsellers.jpg',
            },
        ],
    },
    {
        label: 'Illustrations',
        value: 'illustrations' as const,
        featured: [
            {
                name: 'Favorite Illustrations',
                href: `/products?category=icons`,
                imageSrc: '/nav/icons/picks.jpg',
            },
            {
                name: '2D',
                href: '/products?category=icons&sort=desc',
                imageSrc: '/nav/icons/new.jpg',
            },
            {
                name: '3D',
                href: '/products?category=icons',
                imageSrc: '/nav/icons/bestsellers.jpg',
            },
        ],
    },
]

export {PRODUCTS_CATEGORIES}
