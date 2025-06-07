'use client';

import React from 'react';

import { SidebarMenu as SidebarMenuUI, useSidebar } from '@/components/ui';

import ChatsGroup from './chats-group';
import AccountButton from './account-button';
// import PortfolioButton from './portfolio-button';
import SavedTokensGroup from './saved-tokens-group';
import Points from './points';
import RefferalProgram from './referral-program';
import PortfolioWapper from './portfolio-wapper';
import Trade from './trade';

const SidebarMenu: React.FC = () => {
  const { open } = useSidebar();

  console.log('open: ', open);

  return (
    <SidebarMenuUI>
      <ChatsGroup />
      <SavedTokensGroup />

      <Trade />
      {/* <PortfolioButton /> */}
      <Points />
      <RefferalProgram />
      <PortfolioWapper />
      <AccountButton />
    </SidebarMenuUI>
  );
};

export default SidebarMenu;
