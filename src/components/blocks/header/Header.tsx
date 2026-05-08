'use client';

import { useState } from 'react';
import { ContentProps } from '@optimizely/cms-sdk';
import { HeaderCT } from '@/content-types/blocks/header/Header';
import Logo from '../../layout/Logo';
import { DesktopNav } from './DesktopNav';
import { HeaderAi } from './HeaderAi';
import { HeaderTopBar } from './HeaderTopBar';
import { MobileNav } from './MobileNav';

type Props = {
  content: ContentProps<typeof HeaderCT>;
};

export default function Header({ content }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = content.menuItems ?? [];

  return (
    <header
      className="sticky top-0 z-50"
      data-optimizely-content-id={content.id}
      data-optimizely-content-type="Header"
    >
      <HeaderTopBar />

      <div className="border-b bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6">
          <Logo variant="header" />
          <DesktopNav items={menuItems} />
          {content.showAiButton && (
            <HeaderAi mobileOpen={mobileOpen} onToggle={() => setMobileOpen((v) => !v)} />
          )}
        </div>
      </div>

      {mobileOpen && <MobileNav items={menuItems} />}
    </header>
  );
}
