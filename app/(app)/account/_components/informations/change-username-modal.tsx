'use client';

import { Dialog, DialogContent, GradientButton } from '@/components/ui';
import { UserSpidex, useSpidexCore } from '@/hooks/core/useSpidexCore';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { isString } from 'util';

interface ChangeUserNameModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  user: UserSpidex;
}

const MAX_LENGTH_USERNAME = 12;

const ChangeUserNameModal = ({
  isOpen,
  onOpenChange,
  user,
}: ChangeUserNameModalProps) => {
  const { updateUserInfo, getMe } = useSpidexCore();
  const [newUsername, setNewUsername] = useState(user.username);

  const [isConnecting, setIsConnecting] = useState(false);

  const disabled = newUsername.length < 6;

  const handleChangeUsername = useCallback(async () => {
    try {
        setIsConnecting(true);
        const response = await updateUserInfo({
            fullName: user.fullName || '',
            bio: user.bio || '',
            avatar: user.avatar || '',
            username: newUsername,
        });
        if (response) {
            toast.success('Username changed successfully.');
            getMe();
        }
    } catch (error) {
        console.log("🚀 ~ handleChangeUsername ~ error:", error)
        toast.error(isString(error) ? error : 'Failed to change username. Please try again later.');
    } finally {
        setIsConnecting(false);
        onOpenChange(false);
    }
  },[user, newUsername]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="!bg-bg-modal">
          <div className="text-white text-2xl font-medium mt-5">
            Set new username
          </div>
          <div className="text-white text-sm">
            <input
              type="text"
              autoFocus
              value={newUsername}
              onChange={e => {
                const value = e.target.value;
                if (/^[\x00-\x7F]*$/.test(value) && /^[a-zA-Z0-9]*$/.test(value) && value.length <= MAX_LENGTH_USERNAME) {
                  setNewUsername(value);
                }
              }}
              placeholder="Type your new username"
              className="w-full bg-transparent rounded-md p-2 text-white outline-none focus:border-primary"
            />
          </div>
          <div className="flex justify-end mt-5">
            <GradientButton
              onClick={handleChangeUsername}
              isLoading={isConnecting}
              disabled={disabled}
            >
              Save
            </GradientButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangeUserNameModal;
