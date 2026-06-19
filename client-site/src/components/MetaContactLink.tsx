'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { fireMetaContact } from '@/lib/meta-pixel';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  contentName: 'phone_call' | 'telegram';
};

export function MetaContactLink({ children, contentName, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(event) => {
        void fireMetaContact(contentName);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
