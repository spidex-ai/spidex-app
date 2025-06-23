'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import React from 'react';

const ReportBug = () => {
  return (
    <div
      className="absolute bottom-0 right-5 cursor-pointer"
      onClick={() => {
        window.open(
          'https://spidex-ai.gitbook.io/spidex-ai-docs/bug-bounty-program',
          '_blank'
        );
      }}
    >
      <img src="/icons/report-bug.svg" alt="Report Bug" />
    </div>
  );
};

export const ReportBugIcon = () => {
  return (
    <div
      className="absolute bottom-4 right-5 cursor-pointer"
      onClick={() => {
        window.open(
          'https://spidex-ai.gitbook.io/spidex-ai-docs/bug-bounty-program',
          '_blank'
        );
      }}
    >
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <img src="/icons/report-bug-icon.svg" alt="Report Bug" />
          </TooltipTrigger>
          <TooltipContent>Report a bug</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ReportBug;
