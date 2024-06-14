import { Toaster } from "react-hot-toast";
import { Link } from "./Link";
import { Button } from "./Button";
import { CURRENT_ENVIRONMENT, NODE_URL, TESTNET_FAUCET_LINK } from "../lib";
import { useConnectUI, useDisconnect } from "@fuels/react";
import { WalletDisplay } from "./WalletDisplay";
import { useBrowserWallet } from "../hooks/useBrowserWallet";
import Head from "next/head";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isConnected, wallet, network } = useBrowserWallet();

  const { connect } = useConnectUI();
  const { disconnect } = useDisconnect();

  const showAddNetworkButton = wallet && network && network?.url !== NODE_URL;
  console.log('wallet', wallet)
  console.log('network', network)
  console.log('network?.url', network?.url)

  const tryToAddNetwork = () => {
    return alert(
      `Please add the network ${NODE_URL} to your Fuel wallet, or swtich to it if you have it already, and refresh the page.`,
    );
  };

  return (
    <>
      <Head>
        <title>Fuel App</title>
        <link rel="icon" href="/fuel.ico" />
      </Head>
      <Toaster />
      <div className="flex flex-col">
        <nav className="flex justify-between items-center p-4 bg-black text-white gap-6">
          <Link href="/">Home</Link>

          <Link
            href={CURRENT_ENVIRONMENT === "local" ? "/faucet" : TESTNET_FAUCET_LINK}
            target={CURRENT_ENVIRONMENT === "local" ? "_self" : "_blank"}
          >
            Faucet
          </Link>

          {showAddNetworkButton && <Button onClick={tryToAddNetwork} className="bg-red-500">Wrong Network</Button>}

          <div className="ml-auto">
            <WalletDisplay />
          </div>

          {isConnected && <Button onClick={disconnect}>Disconnect</Button>}
          {!isConnected && <Button onClick={connect}>Connect</Button>}
        </nav>

        <div className="min-h-screen items-center p-24 flex flex-col gap-6">
          {children}
        </div>
      </div>
    </>
  );
};
