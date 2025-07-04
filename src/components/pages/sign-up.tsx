"use client"
import DotsPattern from "@/assets/images/dots.png"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Container from '../elements/container'

import useSignUp from '@/hook/use-sign-up'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function SignUpPageContent() {

    const {
        data,
        isPending,
        mutate
    } = useSignUp();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        mutate(event)
    }

    return (
        <Container className='mx-auto mt-2'>
            <Pattern />
            <div className="max-w-xl mx-auto ">
                <div>
                    <h1 className='text-2xl font-semibold'>Create new account</h1>
                    <p className='text-sm font-medium mb-6 text-foreground/50'>Enter your details</p>
                    <form onSubmit={onSubmit} className="flex flex-col space-y-3  ">
                        <div className='flex flex-col gap-y-1'>
                            <label className='text-sm font-medium'>Full Name</label>
                            <Input
                                type="text"
                                placeholder="Name"
                                className=""
                                name='name'
                            />
                            {
                                data?.errors?.name && (
                                    <p className='text-red-500 text-sm font-medium'>{data?.errors?.name[0]}</p>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <label className='text-sm font-medium'>Email</label>
                            <Input
                                type="email"
                                placeholder="Email"
                                className=""
                                name='email'
                            />
                            {
                                data?.errors?.email && (
                                    <p className='text-red-500 text-sm font-medium'>{data?.errors?.email[0]}</p>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <label className='text-sm font-medium'>Phone</label>
                            <Input
                                type="text"
                                placeholder="Phone"
                                className=""
                                name='phone'
                            />
                            {
                                data?.errors?.phone && (
                                    <p className='text-red-500 text-sm font-medium'>{data?.errors?.phone[0]}</p>
                                )
                            }
                        </div>

                        <div className='flex flex-col gap-y-1'>
                            <label className='text-sm font-medium'>Password</label>
                            <Input
                                type="password"
                                placeholder="Password"
                                className=""
                                name='password'
                            />
                            {
                                data?.errors?.password && (
                                    <p className='text-red-500 text-sm font-medium'>{data?.errors?.password[0]}</p>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <label className='text-sm font-medium'>Confirm Password</label>
                            <Input
                                type="password"
                                placeholder="Password"
                                className=""
                                name='confirmPassword'
                            />
                            {
                                data?.errors?.confirmPassword && (
                                    <p className='text-red-500 text-sm font-medium'>{data?.errors?.confirmPassword[0]}</p>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <label className='text-sm font-medium'>Code</label>
                            <Input
                                type="text"
                                placeholder="Enter Referal Code"
                                className=""
                                name='code'
                            />
                        </div>
                        <Button
                            type="submit"
                            className="rounded-xl"
                            disabled={isPending}
                        >
                            Sign In
                        </Button>
                    </form>
                    <div className="flex flex-col items-center justify-center mt-6">
                        <p>Already have an account <Link replace href="/sign-in" className='text-primary'>Sign In</Link> </p>
                    </div>
                </div>
            </div>
        </Container>
    )
}


function Pattern() {
    return (
        <>
            <Image
                src={DotsPattern}
                alt="Horus Logo"
                // width={100}
                // height={100}
                className="mx-auto mb-4 absolute left-3 hidden md:block"
            />

            <Image
                src={DotsPattern}
                alt="Horus Logo"
                // width={100}
                // height={100}
                className="mx-auto mb-4 absolute right-3 translate-y-[120px] hidden md:block"
            />

            <Image
                src={DotsPattern}
                alt="Horus Logo"
                // width={100}
                // height={100}
                className="mx-auto mb-4 absolute left-3 bottom-0 -translate-y-[120px] hidden md:block"
            />

            <Image
                src={DotsPattern}
                alt="Horus Logo"
                // width={100}
                // height={100}
                className="mx-auto mb-4 absolute right-3 bottom-0 -translate-y-[80px] hidden md:block"
            />
        </>
    )
}