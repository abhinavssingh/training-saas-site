'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'header' | 'footer';
  className?: string;
}

export default function Logo({ variant = 'header', className = '' }: LogoProps) {
  // Logo SVG has aspect ratio ~7.6:1 (1247:164 from viewBox)
  const config = {
    header: { src: '/sample_logo.png', width: 120, height: 48 },
    footer: { src: '/sample_logo.png', width: 160, height: 21 },
  };

  const { src, width, height } = config[variant];

  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <Image
        src={src}
        alt="Ministry of Investment"
        width={width}
        height={height}
        priority={variant === 'header'}
      />
    </Link>
  );
}
