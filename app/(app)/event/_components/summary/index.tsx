'use client';
import {
  GradientButton,
} from '@/components/ui';

import React from 'react';

const Summary: React.FC = () => {
  return (
    <div className="flex gap-4">
      <div className="w-full border border-gray-500 rounded-md  py-12 px-6">
        <div className="">
          <div className="flex gap-6">
            <div>
              <img
                src="/icons/competition.svg"
                alt="com-1"
                className="w-52 h-52"
              />
            </div>
            <div>
              <div className="text-sm bg-bg-swap rounded-3xl py-1 px-3 inline-block items-center">
                Ended
              </div>
              <div className="text-[28px] font-medium mt-3">
                Trading Competition
              </div>
              <div className="text-sm text-gray-500">
                Trade to share 50,000 ADA prize pool
              </div>
              <div className="text-lg text-text-10 mt-3 font-medium">
                <GradientButton className="font-medium">View Details</GradientButton>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 pl-4">
          <div className="flex gap-4">
            <div className="flex gap-4">
              <div>
                <img
                  src="/icons/ada.svg"
                  alt="ada-1"
                  className="w-16 h-16"
                />
              </div>
              <div>
                <div className="text-[28px] font-medium">50K</div>
                <div className="flex gap-1 items-center">
                  <div><img src="/icons/prize.svg" alt="prize" className="w-3 h-3" /></div>
                  <div className="text-sm pt-1">Total Prize Pool (ADA)</div>
                </div>
              </div>
            </div>
            <div className="border border-white mx-3"></div>
            <div>
              <div className="text-[28px] font-medium">23.5K</div>
              <div className="flex gap-1 items-center">
                <div>
                  <img src="/icons/user.svg" alt="user" className="w-3 h-3" />
                </div>
                <div className="text-sm pt-1">Total Volume</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-4">
        <div className="border border-gray-500 rounded-md pr-2 pt-2">
          <img src="/icons/competition.svg" alt="com-1" className="w-28 h-28" />
        </div>
        <div className="border border-gray-500 rounded-md pr-2 pt-2">
          <img src="/icons/competition.svg" alt="com-1" className="w-28 h-28" />
        </div>
        <div className="border border-gray-500 rounded-md pr-2 pt-2">
          <img src="/icons/competition.svg" alt="com-1" className="w-28 h-28" />
        </div>
      </div>
    </div>
  );
};

export default Summary;
