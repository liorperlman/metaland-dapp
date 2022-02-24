const PurchaseLand = artifacts.require("PurchaseLand");
const truffleAssert = require('truffle-assertions');
contract("PurchaseLand", (accounts) => {
  let purchase;
  let expectedOwner;
  let expectedId;

  before(async () => {
    purchase = await PurchaseLand.deployed();
  });

  describe("purchasing a land and retrieving account addresses", async () => {
    before("purchase land using accounts[0]", async () => {
      expectedId = await purchase.purchase(8);
      expectedOwner = accounts[0];
    });
    it("can fetch the address of an owner by land id", async () => {
      const owner = await purchase.getOwner(8);
      assert.equal(owner, expectedOwner, "The owner of the land bought should be the first account.");
    });
    it("can fetch the collection of all land owners' addresses", async () => {
      const owners = await purchase.getOwners();
      assert.equal(owners[8], expectedOwner, "The owner of the land bought should be in the collection.");
    });
    it("can fetch the collection of all land owners' addresses", async () => {
      assert.equal(8, expectedId.logs[1].args[1].words[0], "The owner of the land bought should be in the collection.");
    });
    it("increment token balance by 2 for owner", async() =>{
      await purchase.purchase(7);
      const balance = await purchase.balanceOf(expectedOwner)
      assert.equal(balance, 2)
    })
    it("fail to buy owned land", async() =>{
      // assert.throws(async()=> await purchase.purchase(8), Error());
      await truffleAssert.fails(
        purchase.purchase(8),
        truffleAssert.ErrorType.REVERT
    );
    }) 

  });
});