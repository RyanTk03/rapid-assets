import { cookies } from 'next/headers';
import Logo from '../Logo';
import NavAuthButtons from './NavAuthButtons';
import NavAssetsCategories from './NavAssetsCategories';
import { getUserServerSide } from '@/lib/payloadUtils';

const Header = async () => {
    const nextCookies = cookies();
    const user = await getUserServerSide(nextCookies);

    return (
        <header className="bg-white sticky z-50 top-0 inset-x-0 h-16 border-b">
            <div className="relative flex items-center justify-around w-full h-full">
                <Logo />
                <nav className="flex-1 flex justify-between">
                    <NavAssetsCategories />
                    <NavAuthButtons user={user} />
                </nav>
            </div>
        </header>
    );
}

export default Header;