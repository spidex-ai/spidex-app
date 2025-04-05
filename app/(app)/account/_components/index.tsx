'use client'

import React from 'react'
import '@/components/utils/suppress-console'
import { usePrivy } from '@privy-io/react-auth';
// import { Skeleton } from '@/components/ui';
import NotLoggedInAlert from '../../chat/_components/not-logged-in-alert';
import Information from './informations';
import ConnectedAccounts from './connected-accounts';
// import AccountHeading from './heading';
// import ConnectedAccounts from './connected-accounts';

const Account: React.FC = () => {

    const { user, ready } = usePrivy();
    console.log('user', user);
    console.log('ready', ready);
    

    // if(!ready) return <Skeleton className="h-full w-full" />;

    return (
        <>
            <div className="flex flex-col min-w-[42rem] mx-auto gap-4">
                {
                    user && <Information user={user} />
                }
                {
                    user && <ConnectedAccounts user={user} />
                }

            </div>
            <NotLoggedInAlert />
        </>
    )
}

export default Account