'use client';

import { useState } from 'react';
import { ContentProps } from '@optimizely/cms-sdk';
import { HeaderCT } from '@/content-types/blocks/header/Header';
import Logo from '../../layout/Logo';
import SearchModal from '../search/SearchModal';
import DesktopNav from './DesktopNav';
import HeaderAi from './HeaderAi';
import HeaderTopBar from './HeaderTopBar';
import MobileNav from './MobileNav';
import SearchButton from './SearchButton';

type Props = {
  content: ContentProps<typeof HeaderCT>;
};

export default function Header({ content }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuItems = content.menuItems ?? [];
  const showAiButton = content.showAiButton ?? false;
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      data-optimizely-content-id={content.id ?? undefined}
      data-optimizely-content-type="Header"
    >
      <HeaderTopBar />

      <div className="border-b bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-6">
          <Logo variant="header" />

          <DesktopNav items={menuItems} />

          {/* Right-side controls - AI Button & Mobile Menu Trigger */}

          <div className="ms-auto flex items-center gap-3">
            <HeaderAi
              mobileOpen={mobileOpen}
              onToggle={() => setMobileOpen((v) => !v)}
              showAiButton={showAiButton}
            />

            <SearchButton onClick={() => setOpen(true)} />

            <SearchModal isOpen={open} onClose={() => setOpen(false)} />
          </div>
        </div>
      </div>

      {mobileOpen && <MobileNav items={menuItems} />}
    </header>
  );
}
