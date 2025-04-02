import React from "react";
import Image from "next/image";

const AgentClub: React.FC = () => {
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
                <div>2222</div>
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
                <div>50000</div>
              </div>
            </div>
          </div>
          <div>
            <div>Your Referrals Link</div>
            <div className="flex justify-between bg-bg-main p-4 my-4 rounded-sm">
              <div>robotician.gg/ref=34565459965363626365435345</div>
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
