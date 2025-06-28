'use client';

import React from 'react';

import { GradientBorderButton, Separator } from '@/components/ui';

export interface ConnectedAccountProps {
  icon: React.ReactNode;
  name: string;
  value: string | undefined;
  isConnected: boolean;
  onConnect: () => void;
  isSeparator?: boolean;
}

const ConnectedAccount: React.FC<ConnectedAccountProps> = ({
  icon: Icon,
  name,
  value,
  isConnected,
  onConnect,
  isSeparator = false,
}) => {
  return (
    <>
      <div className="flex flex-row gap-2 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="">{Icon}</div>
          <div className="flex flex-col">
            <p className="text-xs sm:text-sm font-bold">{name}</p>
            <p className="text-xs text-muted-foreground">
              {value ?? 'Not Connected'}
            </p>
          </div>
        </div>
        {!isConnected && (
          <GradientBorderButton
            onClick={onConnect}
            disabled={isConnected}
            className="px-4 py-2 sm:px-8 sm:py-2 text-xs sm:text-sm"
          >
            Connect
          </GradientBorderButton>
        )}
      </div>
      {isSeparator && <Separator className="my-4" />}
    </>
  );
};

export default ConnectedAccount;
