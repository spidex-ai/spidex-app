'use client'

import React from 'react'
import '@/components/utils/suppress-console'
// import { usePrivy } from '@privy-io/react-auth';
// import { Skeleton } from '@/components/ui';
import NotLoggedInAlert from '../../chat/_components/not-logged-in-alert';
import Information from './informations';
// import AccountHeading from './heading';
// import ConnectedAccounts from './connected-accounts';

const Account: React.FC = () => {

    // const { user, ready } = usePrivy();

    // if(!ready) return <Skeleton className="h-full w-full" />;

    return (
        <>
            <div className="flex flex-col min-w-[42rem] mx-auto gap-4">
                <Information />
                {/* {user && (
                    <>
                        <AccountHeading user={user} />
                        <ConnectedAccounts user={user} />
                    </>
                )} */}
            </div>
            <NotLoggedInAlert />
        </>
    )
}

export default Account