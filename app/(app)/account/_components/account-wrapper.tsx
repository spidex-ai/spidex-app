'use client'

import React from 'react'
import '@/components/utils/suppress-console'
import NotLoggedInAlert from '../../chat/_components/not-logged-in-alert';
import Information from './informations';
import ConnectedAccounts from './connected-accounts';
import { useSpidexCoreContext } from '@/app/_contexts';

const Account: React.FC = () => {

    const { auth } = useSpidexCoreContext();

    return (
        <>
            <div className="flex flex-col min-w-[42rem] mx-auto gap-4">
                {
                    auth?.user && <Information user={auth.user} />
                }
                {
                    auth?.user && <ConnectedAccounts user={auth.user} />
                }

            </div>
            <NotLoggedInAlert />
        </>
    )
}

export default Account