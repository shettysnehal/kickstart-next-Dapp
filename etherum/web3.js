import Web3 from "web3";
let web3;
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  window.ethereum.request({ method: "eth_requestAccounts" });

  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://sepolia.infura.io/v3/060e2ee2dc34413387787c3f1d9a0a5c"
  );
  web3 = new Web3(provider);
}
export default web3;
