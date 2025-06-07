'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { ArrowUpRight } from 'lucide-react';

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';

import { cn } from '@/lib/utils';

import { truncateAddress } from '@/lib/wallet';
import Image from 'next/image';

interface Props {
  hash: string;
  className?: string;
  hideTransactionText?: boolean;
}

const TransactionHash: React.FC<Props> = ({
  hash,
  className,
  hideTransactionText,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-row gap-1 items-center">
      {!hideTransactionText && <p className="text-sm">Transaction:</p>}
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <p
              className={cn(
                'text-sm cursor-pointer hover:bg-neutral-200 flex gap-2 items-center dark:hover:bg-neutral-700 rounded-md w-fit px-1',
                copied ? 'text-green-600' : 'text-brand-600',
                className
              )}
              onClick={handleCopy}
            >
              {truncateAddress(hash)}
              <Image
                src={`/icons/${copied ? 'tick-blue.svg' : 'copy-gray.svg'}`}
                alt="copy"
                width={15}
                height={15}
              />
            </p>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="p-2">
            <div className="flex flex-row gap-2 items-center">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? 'Copied' : 'Copy Hash'}
              </Button>
              <Link
                href={`${process.env.NEXT_PUBLIC_CARDANO_SCAN_URL}/transaction/${hash}`}
                target="_blank"
              >
                <Button variant="outline" size="sm">
                  Cardanoscan <ArrowUpRight className="size-4" />
                </Button>
              </Link>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TransactionHash;
