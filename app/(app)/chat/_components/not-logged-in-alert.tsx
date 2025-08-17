'use client';

import React from 'react';
import '@/components/utils/suppress-console';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  Logo,
} from '@/components/ui';

import { useExperimentalConfirmed } from '../../_hooks';
import LoginButtonWrapper from '@/app/_components/login-button-wrapper';
import { useSpidexCore } from '@/hooks/core/useSpidexCore';

const NotLoggedInAlert: React.FC = () => {
  const { isAuthenticated } = useSpidexCore();

  const { confirmed } = useExperimentalConfirmed();

  return (
    <AlertDialog open={!isAuthenticated && confirmed}>
      <AlertDialogHeader className="hidden">
        <AlertDialogTitle>You are not logged in</AlertDialogTitle>
        <AlertDialogDescription>
          Please login to continue
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogContent className="flex flex-col items-center justify-center">
        <Logo className="w-16 h-16" />
        <h1 className="text-2xl font-bold">You are not logged in</h1>
        <p className="text-sm text-gray-500">Please login to continue</p>
        <LoginButtonWrapper />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NotLoggedInAlert;
