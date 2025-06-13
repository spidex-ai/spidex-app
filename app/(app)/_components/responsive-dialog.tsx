'use client';

import React from 'react';

import {
    AlertDialog,
    AlertDialogContent,

    AlertDialogHeader,
    AlertDialogTitle,

  } from '@/components/ui';
import { useIsMobile } from '@/hooks/utils/use-mobile';

const ResponsiveDialog: React.FC = () => {
    const isMobile = useIsMobile();
    return (
        <AlertDialog open={isMobile}>
          <AlertDialogHeader className="">
            <AlertDialogTitle> Mobile version is being completed</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogContent className="flex flex-col items-center justify-center text-center z-[100]">
          <h1 className="text-xl font-bold">Mobile version is being completed</h1>
            <p className="text-sm ">Please use Spidex AI on PC/Laptop for best experience</p>
          </AlertDialogContent>
        </AlertDialog>
      );
  
}

export default ResponsiveDialog;
