"use client";
import Link from 'next/link';
import {
    Button,
    buttonVariants,
} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/Logo';
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner'
import { ZodError } from 'zod'
import {
    SigninCredentialsValidator,
    TSigninCredentialsValidator
} from '@/lib/validators';
import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '@/trpc/client';

export default function SignInPage() {
    const searchParams = useSearchParams();
    const origin = searchParams.get('origin');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSigninCredentialsValidator>({
        resolver: zodResolver(SigninCredentialsValidator),
    });
    const router = useRouter();
    const { mutate, isPending } = trpc.auth.signin.useMutation({
        onError: (err) => {
            if (err.data?.code === 'UNAUTHORIZED') {
                toast.error('Invalid email or password.');
                return;
            }

            if (err instanceof ZodError) {
                toast.error(err.issues[0].message);
                return;
            }

            toast.error(
                'Something went wrong. Please try again.'
            );
        },

        onSuccess: () => {
            toast.success('Signed in successfully!');
            router.refresh();
            router.push('/dashbord');
        },
    });

    const onSubmit = ({
        email,
        password,
    }: TSigninCredentialsValidator) => {
        mutate({email, password});
    }

    return (
        <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                <div className='flex flex-col items-center space-y-2 text-center'>
                    <Logo twWidth="w-12" twHeight="h-12" />
                    <h1 className='text-2xl font-semibold tracking-tight'>
                        Sign in to your account
                    </h1>

                    <Link
                        className={buttonVariants({
                            variant: 'link',
                            className: 'gap-1.5',
                        })}
                        href='/sign-up'
                    >
                        Don&apos;t have an account yet? Sign up
                        <ArrowRight className='h-4 w-4' />
                    </Link>
                </div>

                <div className='grid gap-6'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-2'>
                        <div className='grid gap-1 py-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                {...register('email')}
                                className={cn({
                                'focus-visible:ring-red-500':
                                    errors.email,
                                })}
                                placeholder='you@example.xyz'
                                autoComplete="username"
                            />
                            {errors?.email && (
                                <p className='text-sm text-red-500'>
                                {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className='grid gap-1 py-2'>
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                {...register('password')}
                                type='password'
                                className={cn({
                                'focus-visible:ring-red-500':
                                    errors.password,
                                })}
                                placeholder='Password'
                                autoComplete="current-password"
                            />
                            {errors?.password && (
                                <p className='text-sm text-red-500'>
                                {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button>Sign in</Button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}