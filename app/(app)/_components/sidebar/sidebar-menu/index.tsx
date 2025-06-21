'use client';

import React from 'react';

import { SidebarMenu as SidebarMenuUI } from '@/components/ui';

import AccountButton from './account-button';
import ChatsGroup from './chats-group';
// import PortfolioButton from './portfolio-button';
import Leaderboard from './leaderboard';
import Points from './points';
import PortfolioWapper from './portfolio-wapper';
import RefferalProgram from './referral-program';
import SavedTokensGroup from './saved-tokens-group';
import Trade from './trade';
const SidebarMenu: React.FC = () => {
  return (
    <SidebarMenuUI>
      <ChatsGroup />
      <SavedTokensGroup />

      <Trade />
      <Points />
      <Leaderboard />
      <RefferalProgram />
      <PortfolioWapper />
      <AccountButton />
    </SidebarMenuUI>
  );
};

export default SidebarMenu;
