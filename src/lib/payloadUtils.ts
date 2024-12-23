import { User } from "@/payload-types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";

async function getUserServerSide(
    cookies: NextRequest['cookies'] | ReadonlyRequestCookies
) {
    const token = cookies.get('payload-token')?.value;

    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
        headers: {
            Authorization: `JWT ${token}`
        }
    });

    const { user } = (await userResponse.json()) as {user: User | null};

    return user;
}

export { getUserServerSide };