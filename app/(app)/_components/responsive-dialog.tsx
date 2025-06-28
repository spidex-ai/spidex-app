'use client';

import React from 'react';

import { AlertDialog, AlertDialogContent } from '@/components/ui';

const ResponsiveDialog: React.FC = () => {

  return (
    <AlertDialog open={false}>
      <AlertDialogContent className="flex flex-col items-center justify-center text-center z-[100]">
        <h1 className="text-xl font-bold">Mobile version is being completed</h1>
        <p className="text-sm">
          Please use Spidex AI on PC/Laptop for best experience
        </p>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResponsiveDialog;
