'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarMenuItem, SidebarMenuButton, Badge, useSidebar } from '@/components/ui';
import Image from 'next/image';

const Leaderboard: React.FC = () => {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const isActive = pathname?.includes('/leaderboard');
  const href = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? '#' : '/leaderboard';

  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={pathname?.includes('/leaderboard') ?? false}
        >
          <div className="flex items-center gap-2 w-full">
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
              <Badge
                variant="brandOutline"
                className="text-[10px] h-5 w-fit px-1 rounded-md"
              >
                Soon
              </Badge>
            )}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default Leaderboard;
