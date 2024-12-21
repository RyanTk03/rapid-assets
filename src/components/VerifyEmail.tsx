"use client";
import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const VerifyEmail = ({token}: {token: string}) => {
    const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({token});

    return isError ? (
        <div className="flex flex-col items-center gap-2 my-12">
            <XCircle className="w-8 h-8 text-red-600" />
            <h3 className="font-semibold text-xl">
                Oops, there was an error 😢!
            </h3>
            <p className="text-muted-foreground text-sm">
                This token is not available or might be expired.
                Please try again.
            </p>
        </div>
    ) : isLoading ? (
        <div className="flex flex-col items-center gap-2 my-12">
            <Loader2 className="animate-spin w-8 h-8 text-primary" />
            <h3 className="font-semibold text-xl">
                Verifying...
            </h3>
            <p className="text-muted-foreground text-sm">
                This won&apos;t take long.
            </p>
        </div>
    ) : data?.success ? (
        <div className="flex flex-col items-center my-12">
            <div className="relative w-60 h-60 mb-2 text-muted-foreground">
                <Image src="/images/hippo-email-sent.png" alt="email verified" fill />
            </div>
            <h3 className="font-semibold text-xl">
                Email verified with success.<br/>
            </h3>
            <p className="text-muted-foreground">Welcome to the familly 😀.</p>
            <Link
                className={buttonVariants({className: "mt-4"})}
                href="/sign-in"
            >
                Sign in
            </Link>
        </div>
    ) : null;
}

export default VerifyEmail;