'use client'

import React from "react";
import Image from "next/image";
import { useRefInfo } from "@/hooks/referral/user-ref";

const AgentClub: React.FC = () => {
  const { referralInfo, loading, error } = useRefInfo();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8 border border-border-main rounded-lg">
      <div className="flex gap-8">
        <div>
          <Image
            src="/icons/agent-club.svg"
            alt="agent-club"
            width={100}
            height={100}
          />
        </div>
        <div className="w-full">
          <div className="text-lg">Spidex Agent Club</div>
          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="flex gap-4 p-4 bg-bg-main">
              <div>
                <Image
                  src="/icons/gift.svg"
                  alt="referral"
                  width={50}
                  height={50}
                />
              </div>
              <div>
                <div>Total referrals</div>
                <div>{referralInfo?.referralUserCount}</div>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-bg-main">
              <div>
                <Image
                  src="/icons/logo-gray.svg"
                  alt="referral"
                  width={50}
                  height={50}
                />
              </div>
              <div>
                <div>SILK Points Earned</div>
                <div>{referralInfo?.referralPointEarned}</div>
              </div>
            </div>
          </div>
          <div>
            <div>Your Referrals Link</div>
            <div className="flex justify-between bg-bg-main p-4 my-4 rounded-sm">
              <div>{`${process.env.NEXT_PUBLIC_SPIDEX_APP_URL}/ref=${referralInfo?.referralCode}`}</div>
              <div><Image src="/icons/copy-gray.svg" alt="copy" width={24} height={24} /></div>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <div></div>
            <div className="flex gap-4">
              <div className="flex items-center">Share to</div>
              <div className="flex gap-4">
                <Image src="/icons/x-white.svg" alt="whatsapp" width={30} height={30} /> 
                <Image src="/icons/discord-white.svg" alt="facebook" width={30} height={30} /> 
                <Image src="/icons/tele-white.svg" alt="telegram" width={30} height={30} /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentClub;
