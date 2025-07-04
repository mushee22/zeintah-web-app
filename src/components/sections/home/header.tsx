import React from 'react';
import Logo from '@/assets/images/logo.svg'
import Image from 'next/image';

export default function Header() {
    return (
        <div>
            <Image
                src={Logo}
                alt='Logo Image'
            />
        </div>
    )
}
