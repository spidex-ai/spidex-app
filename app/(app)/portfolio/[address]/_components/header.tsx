import React from 'react'

import Address from '@/app/_components/address'

import Image from 'next/image'
import { TextGradient } from '@/components/ui/text'
interface Props {
    address: string
}

const Header: React.FC<Props> = ({ address }) => {
    return (
        <div>
            <div className="flex items-end gap-2">
                <Image src="/icons/portfolio-white.svg" width={12} height={12} alt="portfolio" className="h-6 w-6" />
                <TextGradient className="text-2xl font-bold leading-none">
                    Portfolio
                </TextGradient>
                <Address
                    address={address}
                />
            </div>
        </div>
    )
}

export default Header