// ./test/ContractFactory.js
const GasTest = artifacts.require("Gaz_test");
//const Second_gaz_test = artifacts.require("Second_gaz_test");

contract("Gaz_test", () => {

  it("gaz used for creating instance", async () => {
    const GasTest_instance = await GasTest.new();
    const gasEstimate = await GasTest_instance.createInstance.estimateGas();
    const tx = await GasTest_instance.createInstance({
      gas: gasEstimate
    });

    console.log(gasEstimate);
    assert(tx);
  }); 
  it("gaz used for creating Storage Contract instance", async () => {
    const GasTest_instance = await GasTest.new();
    const gasEstimate = await GasTest_instance.createStorageContract.estimateGas();
    const tx = await GasTest_instance.createStorageContract({
      gas: gasEstimate
    });
    console.log(gasEstimate);
    assert(tx);
  });

  it("gaz used for creating Storage Contract Filled", async () => {

    //the more storage declarations, the ,more gaz is spent. declaring in the constructor doesn't change anything
    // Redeclaring the variable in the constructor as 0 makes apparently ignored as gaz fees.
    const GasTest_instance = await GasTest.new();
    const gasEstimate = await GasTest_instance.createFillStorageContract.estimateGas();
    const tx = await GasTest_instance.createFillStorageContract({
      gas: gasEstimate
    });
    console.log(gasEstimate);
    assert(tx);
  });
});