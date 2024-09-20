import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { WalletActionButton } from "@tronweb3/tronwallet-adapter-react-ui";

function TronWalletConnector() {
  const { address, connected, wallet } = useWallet();
  
  return (
    <WalletActionButton style={{ width: "100%" }}>
      {connected ? "Wallet Connected" : "Connect Wallet"}
    </WalletActionButton>
  );
}

export default TronWalletConnector;
