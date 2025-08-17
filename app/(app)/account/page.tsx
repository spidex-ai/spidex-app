'use client';

import ProtectedClient from '@/app/components/protected-client';
import Account from './_components';
import ReportBug from '../_components/report-bug';

const AccountPage = () => {
  return (
    <ProtectedClient>
      <div className="flex flex-col gap-8 mx-auto w-full h-full max-h-full px-1 relative">
        <Account />
        <ReportBug />
      </div>
    </ProtectedClient>
  );
};

export default AccountPage;
