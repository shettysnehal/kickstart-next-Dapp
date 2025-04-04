const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());
const compiledFactory = require("../etherum/build/ campaignFactory.json");
const compiledCampaign = require("../etherum/build/ campaign.json");
let accounts;
let factory;
let camapignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  console.log(accounts);
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });
  const addresses = await factory.methods.getDeployedCampaigns().call();
  campaignAddress = addresses[0];
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});
describe("campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });
  it("allows people to contribute money and marks them as approvers", async () => {
    const approver = await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });
    isapprover = await campaign.methods.approvers(accounts[1]).call();
    assert.ok(isapprover);
  });
  it("throws error if the contribution is less than the minimum value", async () => {
    try {
      const approver = await campaign.methods.contribute().send({
        value: "100",
        from: accounts[2],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
  it("allows a manager to make payment request", async () => {
    await campaign.methods
      .createRequest("buy batteries", 10, accounts[3])
      .send({
        from: accounts[0],
        gas: "1000000",
      });
    const request = await campaign.methods.requests(0).call();
    assert.equal("buy batteries", request.description);
  });
});
