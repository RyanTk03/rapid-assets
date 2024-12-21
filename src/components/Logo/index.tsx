'use client'
import Image from 'next/image';
import LogoSvg from './logo.svg'

interface Props {
    twWidth?: string;
    twHeight?: string;
    width?: number | string;
    height?: number | string;
}

const Logo = ({twWidth, twHeight, width, height}: Props) => {
    return (
        <div className={`
            relative
            ${twWidth ? twWidth : width ? `w-[${width}]` : 'w-1/12'}
            ${twHeight ? twHeight : height ? `h-[${height}]` : 'h-1/2'}`}
        >
            <Image src={LogoSvg} fill alt='logo'/>
        </div>
    );
}

export default Logo;