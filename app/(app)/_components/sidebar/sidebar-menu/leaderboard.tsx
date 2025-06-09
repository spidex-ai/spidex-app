'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui';
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
          <div className="flex items-center justify-between gap-2 w-full">
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

            {process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' && (
              <div className="bg-amber-100 text-amber-700 font-semibold text-sm px-1 rounded-md">
                soon
              </div>
            )}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default Leaderboard;
