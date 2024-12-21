import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useAuth = () => {
    const router = useRouter();

    const signout = useCallback(async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error(res.statusText);
            }

            toast.success("Signed out successfully.");
            router.push('/sign-in');
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Couldn't sign out, please retry again!");
        }
    }, [router]);

    return { signout }
}

export default useAuth;