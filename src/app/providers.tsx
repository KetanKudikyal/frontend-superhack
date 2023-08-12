'use client';

import {
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import * as React from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { baseGoerli, optimismGoerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [optimismGoerli, baseGoerli]
      : []),
  ],
  [publicProvider()]
);

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '';
const demoAppInfo = {
  appName: 'Super Zapier',
};

const { wallets } = getDefaultWallets({
  appName: demoAppInfo.appName,
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
const appConfig = {
  appName: 'Super Zapier',
};
export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: '#fff',
          accentColorForeground: 'black',
          borderRadius: 'large',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
        modalSize='compact'
        initialChain={optimismGoerli}
        showRecentTransactions
        appInfo={demoAppInfo}
        chains={chains}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
