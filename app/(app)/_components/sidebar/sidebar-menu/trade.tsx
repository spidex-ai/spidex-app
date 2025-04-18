'use client'

import React from 'react'

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui'

import { usePathname } from 'next/navigation'

import { useSpidexCoreContext } from '@/app/_contexts'
import Link from 'next/link'
import Image from 'next/image'

const Trade: React.FC = () => {
    const pathname = usePathname()
    const { auth } = useSpidexCoreContext() 

    if(!auth?.user?.walletAddress) return null
    const tokenTrade = '29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c64d494e'
    const isActive = pathname.includes(`/token/${tokenTrade}`)
    return (
        <Link href={`/token/${tokenTrade}`}>
            <SidebarMenuItem>
                <SidebarMenuButton isActive={isActive} >
                    <h1 className='flex items-center gap-2 font-semibold'>
                        {
                            isActive ? (
                                <Image src='/icons/trade-blink.svg' alt='trade' width={20} height={20} className='h-4 w-4' />
                            ) : (
                                <Image src='/icons/trade-white.svg' alt='trade' width={20} height={20} className='h-4 w-4' />
                            )
                        }
                        Trade
                    </h1>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </Link>
    )
}

export default Trade;