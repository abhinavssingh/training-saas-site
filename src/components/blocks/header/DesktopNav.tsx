'use client';

import { PopoverGroup } from '@headlessui/react';
import { MenuItemDesktop } from './MenuItemDesktop';

export function DesktopNav({ items }: { items: any[] }) {
  return (
    <PopoverGroup as="nav" className="hidden gap-1 lg:flex">
      {items.map((item) => (
        <MenuItemDesktop key={item.id} item={item} />
      ))}
    </PopoverGroup>
  );
}
