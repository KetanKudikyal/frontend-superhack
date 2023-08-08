'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  polygonMumbai,
  optimism,
  arbitrum,
  zora,
  goerli,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [goerli, polygonMumbai]
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
        initialChain={goerli}
        showRecentTransactions
        appInfo={demoAppInfo}
        chains={chains}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
