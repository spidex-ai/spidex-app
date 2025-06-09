'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRefInfo } from '@/hooks/referral/user-ref';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSpidexCoreContext } from '@/app/_contexts/spidex-core';
import { formatSILK } from '@/app/utils/format';
import SharePostModalWrapper from './share-post-modal-wrapper';
import toast from 'react-hot-toast';

const AgentClub: React.FC = () => {
  const { referralInfo, loading, error } = useRefInfo();
  const { uploadAvatar, updateUserInfo } = useSpidexCoreContext();
  const { auth, getMe } = useSpidexCoreContext();
  console.log('🚀 ~ auth:', auth);
  const [copied, setCopied] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(
    auth?.user?.avatar ? auth?.user?.avatar : '/icons/spider.svg'
  );

  const [uploading, setUploading] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_SPIDEX_APP_URL}/chat?ref=${referralInfo?.referralCode}`
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const maxSize = 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('Image size must be less than 1MB!');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const avatar = await uploadAvatar(formData);

      const updateUser = await updateUserInfo({
        avatar: avatar,
        fullName: auth?.user?.fullName || '',
        username: auth?.user?.username || '',
        bio: auth?.user?.bio || '',
      });

      if (!updateUser) {
        throw new Error('Upload failed');
      }

      setAvatar(avatar);
      getMe();
      toast.success('Avatar updated successfully');
    } catch (error) {
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('Error uploading avatar! Please try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 border border-border-main rounded-lg bg-bg-secondary">
      <div className="flex gap-8">
        <div className="relative group cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
            id="avatar-input"
          />
          <label htmlFor="avatar-input" className="cursor-pointer">
            <div className="relative w-[120px] h-[120px] group">
              <img
                src={avatar}
                alt="agent-club"
                className="rounded-full w-[120px] h-[120px] object-cover"
                style={{
                  width: '120px',
                  height: '120px',
                  minWidth: '120px',
                  minHeight: '120px',
                }}
              />
              <div
                className={`
                absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white text-sm opacity-0  transition-opacity duration-100
                ${uploading ? 'opacity-100' : 'group-hover:opacity-100'}
                `}
              >
                {uploading ? 'Uploading...' : 'Change avatar'}
              </div>
            </div>
          </label>
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
                <div>SILK Earned</div>
                <div>{formatSILK(referralInfo?.referralPointEarned || 0)}</div>
              </div>
            </div>
          </div>
          <div>
            <div>Your Referrals Link</div>
            <div className="flex justify-between bg-bg-main p-4 my-4 rounded-sm">
              <div>{`${process.env.NEXT_PUBLIC_SPIDEX_APP_URL}/chat?ref=${referralInfo?.referralCode}`}</div>
              <div onClick={handleCopy} className="cursor-pointer">
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Image
                        src={`/icons/${
                          copied ? 'tick-blue.svg' : 'copy-gray.svg'
                        }`}
                        alt="copy"
                        width={24}
                        height={24}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? 'Copied' : 'Copy to clipboard'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 mt-5">
            <div></div>
            <div className="flex gap-4">
              <div className="flex items-center">Share to</div>
              <div
                className="flex gap-4 cursor-pointer"
                onClick={() => setPostModalOpen(true)}
              >
                <Image
                  src="/icons/x-white.svg"
                  alt="whatsapp"
                  width={30}
                  height={30}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SharePostModalWrapper
        isOpen={postModalOpen}
        onOpenChange={value => setPostModalOpen(value)}
        refCode={referralInfo?.referralCode || ''}
      />
    </div>
  );
};

export default AgentClub;
