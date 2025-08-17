import React from 'react';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export const Logo: React.FC<Props> = ({
  className,
  showText = false,
  textClassName,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/icons/logo.svg"
        alt="Logo"
        width={100}
        height={100}
        className={cn('w-10 h-10 hidden dark:block', className)}
      />
      <Image
        src="/icons/logo.svg"
        alt="Logo"
        width={100}
        height={100}
        className={cn('w-10 h-10 block dark:hidden', className)}
      />
      {showText && (
        <h3 className={cn('text-lg font-bold', textClassName)}>Spidex AI</h3>
      )}
    </div>
  );
};

export const LogoChat: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/icons/logo-chat.svg"
        alt="Logo"
        width={100}
        height={100}
        className={cn('w-10 h-10 hidden dark:block', className)}
      />
      <Image
        src="/icons/logo-chat.svg"
        alt="Logo"
        width={100}
        height={100}
        className={cn('w-10 h-10 block dark:hidden', className)}
      />
    </div>
  );
};

export default Logo;
