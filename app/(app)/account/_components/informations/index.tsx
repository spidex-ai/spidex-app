"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GradientBorderButton } from "@/components/ui/button";
import { TextGradient } from "@/components/ui/text";

import { UserSpidex } from "@/hooks/core/useSpidexCore";
import { useSpidexCoreContext } from "@/app/_contexts";
import Address from "@/app/_components/address";
interface Props {
  user: UserSpidex;
}

const Information: React.FC<Props> = ({ user }) => {
  const wallets = [user.walletAddress];
  const { logout, uploadAvatar, updateUserInfo } = useSpidexCoreContext();

  const [uploading, setUploading] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          setUploading(true);

          // Tạo FormData để gửi file
          const formData = new FormData();
          formData.append("file", file);

          // Gọi API để upload ảnh
          const avatar = await uploadAvatar(formData);
          console.log("🚀 ~ input.onchange= ~ avatar:", avatar)
          
          const updateUser = await updateUserInfo({
            avatar: avatar,
            fullName: user.fullName || "",
            username: user.username,
            bio: user.bio || "",
          });

          if (!updateUser) {
            throw new Error("Upload failed");
          }

          setAvatar(avatar);

        } catch (error) {
          console.error("Error uploading image:", error);
         
        } finally {
          setUploading(false);
        }
      }
    };

    input.click();
  };

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
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => logout()}
        >
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
              {
                avatar ? (
                  <img
                    src={avatar}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src="/icons/example-ava.svg"
                    alt="profile"
                    width={40}
                    height={40}
                  />
                )
              }
            </div>
            <div>
              <div>
                {user?.walletAddress ? (
                  <Address
                    address={user?.walletAddress}
                    className="text-md font-bold"
                  />
                ) : (
                  "No wallet connected"
                )}
              </div>
              <div className="text-xs text-text-gray">
                Joined on{" "}
                {user?.createdAt
                  ? new Date(user?.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          </div>

          <div>
            <GradientBorderButton
              className="px-8 py-2"
              onClick={handleImageUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Change profile picture"}
            </GradientBorderButton>
          </div>
        </div>

        <div className="h-[1px] w-full my-5 bg-bg-gray" />
        <div>
          <div className="text-xs text-text-gray">User ID</div>
          <div className="text-xs mt-2">{user.id.toString()}</div>
        </div>

        <div className="h-[1px] w-full my-5" />

        <div>
          <div className="text-xs text-text-gray">Connected Wallet</div>
          {wallets?.length > 0 ? (
            <>
              {wallets.map((wallet) => (
                <div className="text-xs mt-2" key={wallet}>
                  {wallet}
                </div>
              ))}
            </>
          ) : (
            <div className="text-xs mt-2">No wallets connected</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Information;
