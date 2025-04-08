'use client'

import React from 'react'
import '@/components/utils/suppress-console'
import { GradientButton } from '@/components/ui'
import { useLogin } from '@/hooks'
import { Wallet } from '@privy-io/react-auth'

interface Props {
    onComplete?: (wallet: Wallet) => void,
}

const LogInButton: React.FC<Props> = ({ onComplete }) => {

    const { login, user, linkWallet } = useLogin({
        onComplete
    })

    const address = user?.wallet?.address;

    return (
        <GradientButton 
            variant="brand"
            onClick={() => { if(user) { linkWallet() } else { login() } }}
            className="w-full"
        >
            Connect {address ? `${address.slice(0, 4)}...${address.slice(-4)}` : ''}
        </GradientButton>
    )
}

export default LogInButton