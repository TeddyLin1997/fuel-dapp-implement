import { AppWallet } from "@/lib";
import { useIsConnected, useNetwork, useWallet } from "@fuels/react";
import { Fuel, BN } from "fuels";
import { useCallback, useState } from "react";
import useAsync from "react-use/lib/useAsync";
import { defaultConnectors } from '@fuels/connectors';

interface BrowserWallet extends AppWallet {
  isConnected: boolean | null;
  network: any;
}

export const useBrowserWallet: () => BrowserWallet = () => {
  const { isConnected } = useIsConnected();
  const { network } = useNetwork();

  // connect wallet
  const { wallet } = useWallet();
  useAsync(async () => {
    const fuel = new Fuel({ connectors: defaultConnectors({ devMode: false }) })
    const hasConnector = await fuel.hasConnector();
    // if (!hasConnector) await fuel.connect()
  }, [])


  // wallet balance
  const [browserWalletBalance, setBrowserWalletBalance] = useState<BN>();
  useAsync(async () => {
    if (!wallet) return
    const browserWalletBalance = await wallet.getBalance();
    setBrowserWalletBalance(browserWalletBalance);
  }, [wallet])

  // fresh balance
  const refreshBrowserWalletBalance = useCallback(async () => {
    if (!wallet) return
    const browserWalletBalance = await wallet.getBalance();
    setBrowserWalletBalance(browserWalletBalance);
  }, [wallet]);

  return {
    wallet: wallet || undefined,
    walletBalance: browserWalletBalance,
    refreshWalletBalance: refreshBrowserWalletBalance,
    isConnected,
    network,
  };
};
