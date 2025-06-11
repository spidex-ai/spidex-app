'use client';

import React, { useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';

import { cn } from '@/lib/utils';
import { truncateAddress } from '@/lib/wallet';
import Image from 'next/image';

interface Props {
  address: string;
  className?: string;
}

const Address: React.FC<Props> = ({ address, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p
            className={cn(
              'text-sm cursor-pointer hover:bg-neutral-200 flex gap-2 items-center dark:hover:bg-neutral-700 rounded-md w-fit px-1',
              copied ? 'text-green-600' : 'text-muted-foreground',
              className
            )}
            onClick={handleCopy}
          >
            {address === 'lovelace' ? 'lovelace' : address === 'ADA' ? 'ADA' : truncateAddress(address)}
            <Image
              src={`/icons/${copied ? 'tick-blue.svg' : 'copy-gray.svg'}`}
              alt="copy"
              width={15}
              height={15}
            />
          </p>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {copied ? 'Copied to clipboard' : 'Copy to clipboard'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Address;
