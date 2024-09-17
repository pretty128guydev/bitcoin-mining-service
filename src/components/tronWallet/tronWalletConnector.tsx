import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { AdapterName } from "@tronweb3/tronwallet-abstract-adapter";
import { WalletActionButton } from "@tronweb3/tronwallet-adapter-react-ui";

function TronWalletConnector() {
  const { connect, disconnect, select, connected } = useWallet();
  return <WalletActionButton></WalletActionButton>;
}
function Profile() {
  const { address, connected, wallet } = useWallet();
  return (
    <div>
      <p>
        <span>Connection Status:</span>{" "}
        {connected ? "Connected" : "Disconnected"}
      </p>
      <p>
        <span>Your selected Wallet:</span> {wallet?.adapter.name}
      </p>
      <p>
        <span>Your Address:</span> {address}
      </p>
    </div>
  );
}
export default TronWalletConnector;
