import Link from 'next/link';
import Cart from '../Cart';
import UserButton from '../UserButton';
import { buttonVariants } from '../ui/button';

const NavAuthButtons = ({ user }) => {
    return (
        <ul className="flex items-center">
            {user ? (
                <li className="px-2 border-r border-r-slate-100"><UserButton useremail={user.email} /></li>
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
    );
}

export default NavAuthButtons;