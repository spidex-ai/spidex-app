'use client';
import React from 'react';

const ReportBug = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      className="absolute bottom-0 right-5 cursor-pointer flex items-center gap-2 "
      onClick={() => {
        window.open(
          'https://spidex-ai.gitbook.io/spidex-ai-docs/bug-bounty-program',
          '_blank'
        );
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div
        className={`flex gap-2 items-center ${isHovered ? 'border-2 border-[#009EFF] rounded-full' : ''}`}
      >
        <div
          className={`px-3 py-2 pl-6  rounded-lg text-[#009EFF] font-medium text-sm whitespace-nowrap transition-all duration-300 ${
            isHovered
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-4 pointer-events-none'
          }`}
        >
          Report a bug
        </div>

  
        <img
          src="/icons/report-bug-icon.svg"
          alt="Report Bug"
          className="block"
        />
      </div>
    </div>
  );
};

export const ReportBugIcon = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
    className="absolute bottom-4 right-5 cursor-pointer flex items-center gap-2 "
    onClick={() => {
      window.open(
        'https://spidex-ai.gitbook.io/spidex-ai-docs/bug-bounty-program',
        '_blank'
      );
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >

    <div
      className={`flex gap-2 items-center ${isHovered ? 'border-2 border-[#009EFF] rounded-full' : ''}`}
    >
      <div
        className={`px-3 py-2 pl-6  rounded-lg text-[#009EFF] font-medium text-sm whitespace-nowrap transition-all duration-300 ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        Report a bug
      </div>


      <img
        src="/icons/report-bug-icon.svg"
        alt="Report Bug"
        className="block"
      />
    </div>
  </div>
  );
};

export default ReportBug;
