'use client'

import React from 'react'

import { ChevronsUpDown, Coins, LogIn, LogOut, Wallet } from 'lucide-react';

import { useLogin } from '@/hooks';

import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
    useSidebar,
    Skeleton,
    GradientButtonIcon,
    GradientButton,
} from '@/components/ui';

import Balances from './balances';

import { truncateAddress } from '@/lib/wallet';
import Image from 'next/image';

const AuthButton: React.FC = () => {

    const { user, ready, login, logout, fundWallet, linkWallet } = useLogin({
        onComplete: async () => {
        }
    });

    const { isMobile, open } = useSidebar();

    if (!ready) return <Skeleton className="w-full h-8" />;

    const handleConnectWallet = () => {
        console.log('xxxxxxx');
        
        if(user) {
            linkWallet()
        } else {
            console.log('xxxxxxx');
            
            login()
        }
    }

    if (!user || !user.wallet) return (
        <SidebarMenu>
            <SidebarMenuItem>
                {
                    open ? (
                        <GradientButton  onClick={handleConnectWallet}>
                           <div className='flex gap-2'>
                           <Image src="/icons/connect-wallet.svg" alt="connect-wallet" width={15} height={15} /> 
                            <div>Connect Wallet</div>
                           </div>
                        </GradientButton>
                    ) : (
                        <GradientButtonIcon  onClick={handleConnectWallet}>
                            <Image src="/icons/connect-wallet.svg" alt="connect-wallet" width={15} height={15} />
                        </GradientButtonIcon>
                    )
                }
            </SidebarMenuItem>
        </SidebarMenu>
    )

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {
                            open ? (
                                <GradientButton>
                                    <div>
                                        <Image src="/icons/wallet.svg" alt="wallet-wallet" width={15} height={15} /> 
                                        <div>{truncateAddress(user.wallet.address)}</div>
                                    </div>
                                </GradientButton>
                            ) : (
                                <GradientButtonIcon>
                                    <Image src="/icons/wallet.svg" alt="wallet-wallet-1" width={15} height={15} />
                                </GradientButtonIcon>
                            )
                        }
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-80 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Wallet className="size-4" />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{truncateAddress(user.wallet.address)}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Balances address={user.wallet.address} />
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => fundWallet(user.wallet!.address, { amount: "0.01" })}>
                                <Coins className="size-4" />
                                Fund Wallet
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logout()}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default AuthButton;