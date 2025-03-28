import React from 'react'
import { GradientOutlineButton } from '@/components/Button';
import ConnectWallet from '@/components/Layout/ConnectWallet';
const Account: React.FC = () => {
  return (
    <div>
      <GradientOutlineButton />
      <ConnectWallet />
    </div>
  )
}

export default Account