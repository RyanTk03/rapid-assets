"use client";
import { useEffect, useRef, useState } from 'react';
import NavItem from '../NavItem';
import { PRODUCTS_CATEGORIES } from '@/config/productsCategories';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const NavAssetsCategories = () => {
    const [activeNavItem, setActiveNavItem] = useState<number | null>(null);
    const catsNavLinksRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        const escapeHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActiveNavItem(null);
            }
        }

        document.addEventListener('keydown', escapeHandler);

        return () => {
            document.removeEventListener('keydown', escapeHandler);
        }
    }, []);

    useOnClickOutside(catsNavLinksRef, () => setActiveNavItem(null));

    return (
        <ul className="flex" ref={catsNavLinksRef}>
            {PRODUCTS_CATEGORIES.map((category, i) => {
                const handleOpen = () => {
                    if (activeNavItem === i) {
                        setActiveNavItem(null)
                    } else {
                        setActiveNavItem(i)
                    }
                }

                const handleClose = () => setActiveNavItem(null)

                return (
                    <li key={category.value}>
                        <NavItem
                            category={category}
                            handleClose={handleClose}
                            handleOpen={handleOpen}
                            isOpen={i === activeNavItem}
                            isAnyOpen={activeNavItem !==null}
                        />
                    </li>
                );
            })}
        </ul>
    )
}

export default NavAssetsCategories;