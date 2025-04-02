import React from "react";
import Image from "next/image";
import { GradientBorderButton } from "@/components/ui/button";
import { TextGradient } from "@/components/ui/text";

const Information = () => {
  return (
    <>
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-2">
          <div>
            <Image
              src="/icons/profile.svg"
              alt="profile"
              width={12}
              height={12}
            />
          </div>
          <TextGradient className="text-2xl">Account</TextGradient>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <Image
              src="/icons/logout-white.svg"
              alt="logout"
              width={18}
              height={15}
            />
          </div>
          <div>Log out</div>
        </div>
      </div>
      <div className="border boder-1 border-gray-800 p-8 mt-4 rounded-2xl">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div>
              <Image
                src="/icons/example-ava.svg"
                alt="profile"
                width={24}
                height={24}
              />
            </div>
            <div>
              <div>0x45e61e2f23...99990z</div>
              <div>Joined on 3/19/2025</div>
            </div>
          </div>

          <div>
            <GradientBorderButton>Change profile picture</GradientBorderButton>
          </div>
        </div>

        <div className="h-[1px] w-full my-5 bg-bg-gray" />
        <div>
          <div className="text-xs text-text-gray">User ID</div>
          <div className="text-xs mt-2">cm8fd5nqk01x4zpzjv7ud3udf</div>
        </div>

        <div className="h-[1px] w-full my-5" />

        <div>
          <div className="text-xs text-text-gray">Connected Wallet</div>
          <div className="text-xs mt-2">HTn8zrOU8elEdMvRIrKErdHOx6plJp4LQ</div>
        </div>
      </div>
    </>
  );
};

export default Information;
