'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarMenuItem,
  SidebarMenuButton,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from '@/components/ui';
import Image from 'next/image';
const Leaderboard: React.FC = () => {
  const pathname = usePathname();
  const isActive = pathname?.includes('/leaderboard');
  return (
    <Link href="#">
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={pathname?.includes('/leaderboard') ?? false}
        >
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <h1 className="flex items-center gap-2 font-semibold">
                  {isActive ? (
                    <Image
                      src="/icons/leaderboard-blink.svg"
                      alt="leaderboard"
                      width={5}
                      height={5}
                      className="w-4 h-4"
                    />
                  ) : (
                    <Image
                      src="/icons/leaderboard-white.svg"
                      alt="leaderboard"
                      width={5}
                      height={5}
                      className="w-4 h-4"
                    />
                  )}
                  Leaderboard
                </h1>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Coming soon
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default Leaderboard;
