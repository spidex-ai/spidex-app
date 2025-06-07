import { useSpidexCoreContext } from '@/app/_contexts';

export const useSendTransaction = () => {
  const { auth } = useSpidexCoreContext();

  const wallet = auth?.user?.walletAddress;

  const sendTransaction = async (transaction: any) => {
    if (!wallet) throw new Error('No wallets found');

    // const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);

    // return wallet.sendTransaction(transaction, connection, {
    //     skipPreflight: true,
    // });
  };

  return {
    sendTransaction,
    wallet,
  };
};
