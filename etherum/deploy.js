const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require("./build/ campaignFactory.json");

const provider = new HDWalletProvider(
  "sketch sunset delay movie group drama mesh usage spot sausage olive cost",
  "https://sepolia.infura.io/v3/060e2ee2dc34413387787c3f1d9a0a5c"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  //console.log(interface);
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
