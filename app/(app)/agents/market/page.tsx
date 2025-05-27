import React from 'react';

import AgentPage from '../_components';

import ProtectedClient from '@/app/components/protected-client';
import { marketAgent } from './_data';

const MarketAgentPage: React.FC = () => {
    return (
        <ProtectedClient>
            <AgentPage
                agent={marketAgent}
            />
        </ProtectedClient>
    )
}

export default MarketAgentPage;