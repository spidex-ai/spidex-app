'use client'

import React from 'react'
import {  LogOut, Wallet } from 'lucide-react'; 
import {
    SidebarMenu,
    SidebarMenuItem,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    useSidebar,
    Skeleton,
    GradientButtonIcon,
    GradientButton,
} from '@/components/ui';

import Balances from './balances';

import { truncateAddress } from '@/lib/wallet';
import Image from 'next/image';
import { useSpidexCoreContext } from '@/app/_contexts';
import { useLoginModal } from '@/app/_contexts/login-modal-context';

const AuthButton: React.FC = () => {

    const { auth, logout } = useSpidexCoreContext();
    const { openModal } = useLoginModal();
    const { isMobile, open } = useSidebar();

    if (!auth) return <Skeleton className="w-full h-8" />;

    const handleConnectWallet = () => {
        openModal(true);
    }

    if (!auth.user || !auth.user.walletAddress) return (
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
                                        <div>{truncateAddress(auth.user.walletAddress)}</div>
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
                                    <span className="truncate font-semibold">{truncateAddress(auth.user.walletAddress)}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Balances address={auth.user.walletAddress} />
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