'use client';

import React from 'react';
import '@/components/utils/suppress-console';
import NotLoggedInAlert from '../../chat/_components/not-logged-in-alert';
import Information from './informations';
import ConnectedAccounts from './connected-accounts';
import { useSpidexCore } from '@/hooks/core/useSpidexCore';

const Account: React.FC = () => {
  const { auth } = useSpidexCore();

  return (
    <>
      <div className="flex flex-col w-full mx-auto gap-4 px-2 overflow-y-auto pb-12 sm:pb-0">
        {auth?.user && <Information user={auth.user} />}
        {auth?.user && <ConnectedAccounts user={auth.user} />}
      </div>
      <NotLoggedInAlert />
    </>
  );
};

export default Account;
