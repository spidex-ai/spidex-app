'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui';
import Image from 'next/image';

const Points: React.FC = () => {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const isActive = pathname?.includes('/points');

  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Link href="/points" onClick={handleClick}>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={pathname?.includes('/points') ?? false}>
          <h1 className="flex items-center gap-2 font-semibold">
            {isActive ? (
              <Image
                src="/icons/rewards-blink.svg"
                alt="points"
                width={5}
                height={5}
                className="w-4 h-4"
              />
            ) : (
              <Image
                src="/icons/points-white.svg"
                alt="points"
                width={5}
                height={5}
                className="w-4 h-4"
              />
            )}
            Points
          </h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default Points;
