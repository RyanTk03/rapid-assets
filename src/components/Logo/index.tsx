'use client'
import Image from 'next/image';
import LogoSvg from './logo.svg'

export default function Logo() {
    return (
        <div className="relative w-1/12 h-1/2">
            <Image src={LogoSvg} fill alt='logo'/>
        </div>
    );
}
