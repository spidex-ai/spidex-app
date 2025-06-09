import Header from './_components/header';
import Tokens from './_components/tokens';
import Transactions from './_components/transactions';

import ProtectedClient from '../../../components/protected-client';
import { SwapModalProvider } from './_contexts/use-swap-modal';

const Portfolio = async ({
  params,
}: {
  params: Promise<{ address: string }>;
}) => {
  const { address } = await params;

  return (
    <ProtectedClient>
      <SwapModalProvider>
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 md:pt-4 h-full overflow-y-scroll no-scrollbar">
          <Header address={address} />
          <Tokens address={address} />
          <Transactions address={address} />
        </div>
      </SwapModalProvider>
    </ProtectedClient>
  );
};

export default Portfolio;
