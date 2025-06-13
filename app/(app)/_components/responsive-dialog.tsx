'use client';

import React from 'react';

import {
   Dialog,
   DialogClose,
   DialogContent,
  } from '@/components/ui';
import { useIsMobile } from '@/hooks/utils/use-mobile';

const ResponsiveDialog: React.FC = () => {
    const isMobile = useIsMobile();

    return (
      <Dialog open={isMobile}>
        <DialogClose>
          hehe
        </DialogClose>
      <DialogContent className="!bg-bg-modal text-center" isClose={false}>
        <div className="text-white text-xl font-medium mt-5">Mobile version is being completed</div>
        <div className="text-white text-sm">
          Please use Spidex AI on PC/Laptop for best experience
        </div>
      </DialogContent>
    </Dialog>
      );
  
}

export default ResponsiveDialog;
