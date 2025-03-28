import React from 'react';
import { GradientOutlineButton } from '@/components/Button';
import ConnectWallet from '@/components/Layout/ConnectWallet';
const Chat: React.FC = () => {
  return (
    <div>
      <ConnectWallet />
      <GradientOutlineButton>Connect Wallet</GradientOutlineButton>
    </div>
  )
}

export default Chat
