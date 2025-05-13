"use client";

import React from "react";

// import { User } from 'lucide-react';

import Link from "next/link";

import { usePathname } from "next/navigation";

import { useSpidexCoreContext } from "@/app/_contexts";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui";
import Image from "next/image";

const Portfolio: React.FC = () => {
  const pathname = usePathname();

  const { auth } = useSpidexCoreContext();

  if (!auth?.user?.walletAddress) return null;
  const isActive = pathname?.includes("/portfolio");
  return (
    <Link href={`/portfolio/${auth?.user?.walletAddress}`}>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={isActive}>
          <h1 className="flex items-center gap-2 font-semibold">
            {isActive ? (
              <Image
                src="/icons/portfolio-blink.svg"
                alt="portfolio"
                width={5}
                height={5}
                className="w-4 h-4"
              />
            ) : (
              <Image
                src="/icons/portfolio-white.svg"
                alt="portfolio"
                width={5}
                height={5}
                className="w-4 h-4"
              />
            )}
            Portfolio
          </h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export default Portfolio;
