import React from 'react';

import AgentPage from '../_components';

import ProtectedClient from '@/app/components/protected-client';
import { socialAgent } from './_data';

const SocialAgentPage: React.FC = () => {
    return (
                <ProtectedClient>
        <AgentPage
            agent={socialAgent}
            />
            </ProtectedClient>
    )
}

export default SocialAgentPage;   