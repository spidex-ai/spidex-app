'use client';

import React from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Logo,
} from '@/components/ui';
import { useSpidexCoreContext } from '@/app/_contexts';

const NotLoggedIn: React.FC = () => {
  const { auth } = useSpidexCoreContext();
  return (
    <AlertDialog open={!auth?.user}>
      <AlertDialogHeader className="hidden">
        <AlertDialogTitle>You are not logged in</AlertDialogTitle>
        <AlertDialogDescription>
          Please login to continue
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogContent className="flex flex-col items-center justify-center gap-4">
        <Logo className="w-16 h-16" />
        <h1 className="text-2xl font-bold">You are not logged in</h1>
        <p className="text-sm text-gray-500">Please login to continue</p>
        <Button variant="brand" onClick={() => {}}>
          Login
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NotLoggedIn;
