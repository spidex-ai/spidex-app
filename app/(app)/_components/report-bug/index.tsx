'use client';

import React from 'react';

const ReportBug = () => {
  return <div className="absolute bottom-0 right-5 cursor-pointer" onClick={() => {
    window.open('https://spidex-ai.gitbook.io/spidex-ai-docs/bug-bounty-program', '_blank');
  }}>
    <img src="/icons/report-bug.svg" alt="Report Bug" />
  </div>;
};

export default ReportBug;


