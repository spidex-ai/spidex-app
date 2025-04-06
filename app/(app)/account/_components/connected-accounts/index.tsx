"use client";

import React from "react";

import { usePrivy, type User } from "@privy-io/react-auth";

import ConnectedAccount from "./connected-account";
import { TextGradient } from "@/components/ui/text";
import Image from "next/image";

interface Props {
  user: User;
}

const ConnectedAccounts: React.FC<Props> = ({ user }) => {
  const { linkTwitter, linkGoogle } = usePrivy();

  return (
    <div className="flex flex-col gap-4 mt-8">
      <TextGradient className="text-2xl font-bold">
        Connected Accounts
      </TextGradient>
      <div className="border boder-1 border-gray-800 p-8 mt-4 rounded-2xl">
        <div className="flex flex-col gap-4">
          <ConnectedAccount
            icon={
              <Image
                src="/icons/x-white.svg"
                alt="twitter"
                width={28}
                height={28}
              />
            }
            name="Twitter"
            value={user.twitter?.username ?? undefined}
            isConnected={!!user.twitter}
            onConnect={linkTwitter}
            isSeparator={true}
          />
          <ConnectedAccount
            icon={
              <Image
                src="/icons/google-white.svg"
                alt="google"
                width={28}
                height={28}
                className="h-full"
              />
            }
            name="Google"
            value={user.google?.email ?? undefined}
            isConnected={!!user.google}
            onConnect={linkGoogle}
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectedAccounts;
