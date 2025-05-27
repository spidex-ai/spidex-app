import React from 'react';

import AgentPage from '../_components';

import ProtectedClient from '@/app/components/protected-client';
import { tradingAgent } from './_data';

const TradingAgentPage: React.FC = () => {
    return (
        <ProtectedClient>
            <AgentPage
                agent={tradingAgent}
            />
        </ProtectedClient>
    )
}

export default TradingAgentPage;