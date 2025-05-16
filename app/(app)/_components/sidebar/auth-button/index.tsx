'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    GradientButton,
    GradientButtonIcon,
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui';
import { LogOut } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import Balances from './balances';

import { LOGIN_METHODS } from '@/app/_components/login-modal';
import { useSpidexCoreContext } from '@/app/_contexts';
import { useLoginModal } from '@/app/_contexts/login-modal-context';
import { truncateAddress } from '@/lib/wallet';
import Image from 'next/image';

const AuthButton: React.FC = () => {

    const { auth, logout } = useSpidexCoreContext();
    const { openModal } = useLoginModal();
    const { isMobile, open } = useSidebar();
    const [walletIcon, setWalletIcon] = useState<string>("/icons/connect-wallet.svg");

    const handleConnectWallet = () => {
        openModal(true);
    }
    useEffect(() => {
        if (auth?.walletName) {
            setWalletIcon(LOGIN_METHODS.find(method => method.id === auth.walletName)?.icon || "/icons/connect-wallet.svg");
        }
    }, [auth]);
    if (!auth || !auth.user || !auth.user.walletAddress) return (
        <SidebarMenu>
            <SidebarMenuItem>
                {
                    open ? (
                        <GradientButton className='w-full' onClick={handleConnectWallet}>
                            <div className='flex gap-2'>
                                <Image src="/icons/connect-wallet.svg" alt="connect-wallet" width={20} height={20} />
                                <div>Connect Wallet</div>
                            </div>
                        </GradientButton>
                    ) : (
                        <GradientButtonIcon className='w-full' onClick={handleConnectWallet}>
                            <Image src="/icons/connect-wallet.svg" alt="connect-wallet" width={20} height={20} />
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
                                <GradientButton className='w-full'>
                                    <div className='flex gap-2'>
                                        <Image src={walletIcon} alt="wallet-wallet" width={15} height={15} />
                                        <div>{truncateAddress(auth.user.walletAddress)}</div>
                                    </div>
                                </GradientButton>
                            ) : (
                                <GradientButtonIcon>
                                    <Image src={walletIcon} alt="wallet-wallet-1" width={15} height={15} />
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
                                <Image src={walletIcon} alt="wallet-wallet" width={20} height={20} />
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