import chatappabi from "./ChatApp.json";
export const ChatAppAddress = "0x0a4c232C09b138f3C17d32B49CfB47241Eac9C78";
export const ChatAppABI = chatappabi.abi;

export const changeNetwork = async () => {
  try {
    if (!window.ethereum) throw new Error("Please connect to a wallet");

    // Try switching to the Polygon Amoy network
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13882" }], // 80002 in hex
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13882", // 80002 in hex
                chainName: "Polygon Amoy",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc-amoy.polygon.technology/"],
                blockExplorerUrls: ["https://amoy.polygonscan.com/"],
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add the network:", addError.message);
        }
      } else {
        console.error("Failed to switch the network:", switchError.message);
      }
    }
  } catch (error) {
    console.error("Failed to change the network:", error.message);
  }
};
