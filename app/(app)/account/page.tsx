'use client';

import ProtectedClient from '@/app/components/protected-client';
import Account from './_components';

const AccountPage = () => {
  return (
    <ProtectedClient>
      <Account />
    </ProtectedClient>
  );
};

export default AccountPage;
