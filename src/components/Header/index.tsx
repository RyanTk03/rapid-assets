"use client";
import { useEffect, useRef, useState } from "react";
import Logo from "../Logo";
import NavItem from "../NavItem";
import { PRODUCTS_CATEGORIES } from "@/config";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Cart from "../Cart";
import UserButton from "../UserButton";

export default function Header () {
    const [activeNavItem, setActiveNavItem] = useState<number | null>(null);

    const catsNavLinksRef = useRef<HTMLUListElement | null>(null);

    const user = null;

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
        <header className="bg-white sticky z-50 top-0 inset-x-0 h-16 border-b">
            <div className="relative flex items-center justify-around w-full h-full">
                <Logo />
                <nav className="flex-1 flex justify-between">
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
                    <ul className="flex items-center">
                        {user ? (
                            <li className="px-2 border-r border-r-slate-100"><UserButton /></li>
                        ) : (
                            <>
                                <li className="px-2 border-r border-r-slate-100">
                                    <Link className={buttonVariants({variant: 'outline'})} href="sign-in">Sign in</Link>
                                </li>
                                <li className="px-2 border-r border-r-slate-100">
                                    <Link className={buttonVariants({variant: 'ghost'})} href="sign-up">Sign up</Link>
                                </li>
                            </>
                        )}
                        <li className="px-2"><Cart /></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}