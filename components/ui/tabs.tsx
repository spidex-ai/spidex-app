'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-9 items-center justify-center rounded-lg bg-neutral-100 p-1 text-neutral-500 dark:bg-bg-secondary dark:text-white',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center gap-2 justify-center whitespace-nowrap',
      'rounded-none px-6 py-2 text-sm font-medium',
      'border-b-2 border-transparent',
      'ring-offset-white transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      // Thay đổi background khi active tại đây
      'data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#131E2F] data-[state=active]:to-[#131E2F] data-[state=active]:text-white',
      // "dark:ring-offset-brand-600",
      // Thay đổi background cho dark mode khi active tại đây
      'dark:data-[state=active]:bg-gradient-to-r!important dark:data-[state=active]:from-indigo-500!important dark:data-[state=active]:to-purple-500!important dark:data-[state=active]:text-white!important',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

const TabsTriggerGradient = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center gap-2 justify-center whitespace-nowrap',
      'rounded-none px-3 py-2 text-sm font-medium',
      'border-b-2 border-transparent',
      'ring-offset-white transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:border-brand-600 data-[state=active]:text-brand-600',
      'dark:ring-offset-brand-600',
      'dark:data-[state=active]:border-brand-600 dark:data-[state=active]:text-brand-600',
      className
    )}
    {...props}
  />
));
TabsTriggerGradient.displayName = TabsPrimitive.Trigger.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsTriggerGradient };
