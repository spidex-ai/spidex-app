import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  Badge,
} from '@/components/ui';
import Image from 'next/image';

const Event: React.FC = () => {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const isActive = pathname?.includes('/event');
  const href =
    process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production' ? '/event' : '/#';

  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={pathname?.includes('/event') ?? false}>
          <div className="flex items-center gap-2 w-full">
            <h1 className="flex items-center gap-2 font-semibold">
              {isActive ? (
                <Image
                  src="/icons/event-blink.svg"
                  alt="event"
                  width={5}
                  height={5}
                  className="w-4 h-4"
                />
              ) : (
                <Image
                  src="/icons/event.svg"
                  alt="event"
                  width={5}
                  height={5}
                  className="w-4 h-4"
                />
              )}
              <span className="pt-1">Event</span>
              <Badge
                variant="destructive"
                className="text-[10px] h-5 w-fit px-1 rounded-md"
              >
                Coming Soon
              </Badge>
            </h1>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default Event;
