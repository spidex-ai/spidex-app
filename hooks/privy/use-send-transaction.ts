import { useSpidexCore } from "../core/useSpidexCore";

export const useSendTransaction = () => {
  const { auth } = useSpidexCore();

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
