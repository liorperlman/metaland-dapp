const PurchaseLand = artifacts.require("PurchaseLand");

contract("PurchaseLand", (accounts) => {
  let purchase;
  let expectedOwner;

  before(async () => {
    purchase = await purchase.deployed();
  });

  describe("purchasing a land and retrieving account addresses", async () => {
    before("purchase land using accounts[0]", async () => {
      await purchase.purchase(8);
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
  });
});