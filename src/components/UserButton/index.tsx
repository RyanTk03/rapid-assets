"use client";
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const UserButton = ({useremail}) => {
    const { signout } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                className="overflow-hidden"
            >
                <Button
                    variant="ghost"
                    size="sm"
                    className="relative"
                >
                    My account
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="bg-white w-60"
            >
                <DropdownMenuLabel>{useremail}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashbord">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={signout}
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

UserButton.propTypes = propTypes;
UserButton.defaultProps = defaultProps;
// #endregion

export default UserButton;