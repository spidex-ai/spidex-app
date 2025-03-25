import { GradientOutlineButton } from '@/components/Button';
import ConnectWallet from '@/components/Layout/ConnectWallet';
export default function Chat() {
  return (
    <div>
      <ConnectWallet />
      <GradientOutlineButton>Connect Wallet</GradientOutlineButton>
    </div>
  )
}
