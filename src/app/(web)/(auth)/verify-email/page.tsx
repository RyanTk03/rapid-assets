import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";

interface Props {
    searchParams: {
        token?: string;
        to?: string;
    }
}

export default function VerifyEmailPage({ searchParams }: Props) {
    return searchParams.token && typeof searchParams.token === 'string' ? (
        <VerifyEmail token={searchParams.token}/>
    ) : (
        <div className="h-full flex flex-col items-center justify-center space-y-1">
            <div className="relative w-60 h-60 mb-4 text-muted-foreground">
                <Image
                    fill
                    src="/images/hippo-email-sent.png"
                    alt=""
                />
            </div>
            <p className="text-muted-foreground text-center">
                We&apos; have sent a verification link to {
                searchParams.to ? <span className="font-semibold">{searchParams.to}</span> :
                'your email'}.
            </p>
            <h3 className="font-semibold text-2xl">
                Please Check your inbox to verify your account.
            </h3>
        </div>
    );
}