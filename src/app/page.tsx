'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import * as React from 'react';

import UnstyledSelectIntroduction from '@/components/select/ChainSelector';

export default function HomePage() {
  return (
    <main className='main'>
      <div className='flex items-center justify-end py-10 pr-10'>
        <ConnectButton />
      </div>
      <div className='mx-auto my-10 max-w-5xl '>
        <div className='flex items-center justify-end'>
          <UnstyledSelectIntroduction />
        </div>
      </div>
    </main>
  );
}
