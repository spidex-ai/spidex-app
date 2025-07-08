'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GradientBorderButton } from '@/components/ui/button';
import { TextGradient } from '@/components/ui/text';

import { UserSpidex, useSpidexCore } from '@/hooks/core/useSpidexCore';
import Address from '@/app/_components/address';
import toast from 'react-hot-toast';
import ChangeUserNameModal from './change-username-modal';
import { useIsMobile } from '@/hooks/utils/use-mobile';
interface Props {
  user: UserSpidex;
}

const Information: React.FC<Props> = ({ user }) => {
  const wallets = [user.walletAddress];
  const { logout, uploadAvatar, updateUserInfo, getMe } = useSpidexCore();
  const isMobile = useIsMobile();

  const [uploading, setUploading] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);

  const [isOpenChangeUsername, setIsOpenChangeUsername] = useState(false);

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          setUploading(true);
          const maxSize = 1024 * 1024; // 1MB
          if (file.size > maxSize) {
            toast.error('Image size must be less than 1MB!');
            return;
          }

          // Tạo FormData để gửi file
          const formData = new FormData();
          formData.append('file', file);

          // Gọi API để upload ảnh
          const avatar = await uploadAvatar(formData);
          console.log('🚀 ~ input.onchange= ~ avatar:', avatar);

          const updateUser = await updateUserInfo({
            avatar: avatar,
            fullName: user.fullName || '',
            username: user.username,
            bio: user.bio || '',
          });

          if (!updateUser) {
            throw new Error('Upload failed');
          }

          setAvatar(avatar);
          toast.success('Avatar updated successfully!');
          getMe();
        } catch (error) {
          if (typeof error === 'string') {
            toast.error(error);
          } else {
            toast.error('Error uploading avatar! Please try again.');
          }
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
              className="w-6 h-6"
            />
          </div>
          <TextGradient className="text-base sm:text-2xl font-medium leading-none">
            Account
          </TextGradient>
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
              {avatar ? (
                <img
                  src={avatar}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full w-[40px] h-[40px] object-cover border border-green-500"
                />
              ) : (
                <Image
                  src="/icons/example-ava.svg"
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full w-[40px] h-[40px] object-cover border border-green-500"
                />
              )}
            </div>
            <div>
              <div className="text-sm sm:text-md font-bold">
                {user?.walletAddress ? (
                  <Address
                    address={user?.walletAddress}
                    className=" text-sm sm:text-md font-bold"
                  />
                ) : (
                  'No wallet connected'
                )}
              </div>
              <div className="text-xs text-text-gray">
                Joined on{' '}
                {user?.createdAt
                  ? new Date(user?.createdAt).toLocaleDateString()
                  : 'N/A'}
              </div>
            </div>
          </div>

          <div>
            {isMobile ? (
              <div className="flex flex-col">
              <div>
                <GradientBorderButton
                  className="px-8 py-2 text-xs sm:text-sm"
                  onClick={handleImageUpload}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Change avatar'}
                </GradientBorderButton>
              </div>
              <div>
                <GradientBorderButton
                  className="px-8 py-2 text-xs sm:text-sm"
                  onClick={() => setIsOpenChangeUsername(true)}
                  disabled={uploading}
                >
                  {'Change username'}
                </GradientBorderButton>
              </div>
            </div>
            ) : (
              <div className="flex gap-2">
                <div>
                  <GradientBorderButton
                    className="px-8 py-2 text-xs sm:text-sm"
                    onClick={handleImageUpload}
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading...' : 'Change avatar'}
                  </GradientBorderButton>
                </div>
                <div>
                  <GradientBorderButton
                    className="px-8 py-2 text-xs sm:text-sm"
                    onClick={() => setIsOpenChangeUsername(true)}
                    disabled={uploading}
                  >
                    {'Change username'}
                  </GradientBorderButton>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-[1px] w-full my-5 bg-bg-gray" />
        <div>
          <div className="text-xs text-text-gray">User ID</div>
          <div className="text-xs mt-2">{user.id.toString()}</div>
        </div>

        <div className="mt-8">
          <div className="text-xs text-text-gray">Username</div>
          <div className="text-xs mt-2">{user.username}</div>
        </div>

        <div className="h-[1px] w-full my-5" />

        <div>
          <div className="text-xs text-text-gray">Connected Wallet</div>
          {wallets?.length > 0 ? (
            <>
              {wallets.map(wallet => (
                <div
                  className="text-xs mt-2 break-all sm:break-normal"
                  key={wallet}
                >
                  {wallet}
                </div>
              ))}
            </>
          ) : (
            <div className="text-xs mt-2">No wallets connected</div>
          )}
        </div>
      </div>

      <ChangeUserNameModal
        isOpen={isOpenChangeUsername}
        onOpenChange={setIsOpenChangeUsername}
        user={user}
      />
    </>
  );
};

export default Information;
