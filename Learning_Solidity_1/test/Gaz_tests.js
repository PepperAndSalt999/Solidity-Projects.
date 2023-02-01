// ./test/ContractFactory.js
const GasTest = artifacts.require("Gaz_test");
const Contract_single_fonction = artifacts.require("Contract_single_fonction");
const Contract_multiples_fonction = artifacts.require("Contract_multiples_fonction");
const Contract_lot_of_fonction = artifacts.require("Contract_lot_of_fonction");
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
  it("gaz used for creating Contract with single vs Multiple functions is smaller", async () => {

    const GasTest_instance = await GasTest.new();
    const gasEstimate_1 = await GasTest_instance.createSingleFonction.estimateGas();
    const gasEstimate_2 = await GasTest_instance.createMultFonction.estimateGas();
  
    console.log("single function :", gasEstimate_1);
    console.log("multiple functions:", gasEstimate_2);
    assert(gasEstimate_1 < gasEstimate_2); 
  });
  it("smaller amount of gaz used for using Contract with single vs Multiple functions", async () => {

    const Contract_single_fonction_instance = await Contract_single_fonction.new();
    const Contract_multiples_fonction_instance = await Contract_multiples_fonction.new();
    const gasEstimate_1 = await Contract_single_fonction_instance.test_function.estimateGas();
    const gasEstimate_2 = await Contract_multiples_fonction_instance.test_function.estimateGas();
  
    console.log("single function :", gasEstimate_1);
    console.log("multiple functions:", gasEstimate_2);
    assert(gasEstimate_1 < gasEstimate_2); 
  });
  it("number of external functions doesn't seems to influate on gaz price gaz it cost", async () => {

    const Contract_multiples_fonction_instance = await Contract_multiples_fonction.new();
    const gasEstimate_2 = await Contract_multiples_fonction_instance.test_function2.estimateGas();
    const gasEstimate_3 = await Contract_multiples_fonction_instance.test_function3.estimateGas();
    const gasEstimate_4 = await Contract_multiples_fonction_instance.test_function4.estimateGas();
    const gasEstimate_5 = await Contract_multiples_fonction_instance.test_function5.estimateGas();
  
    console.log("level1:", gasEstimate_2);
    console.log("level2", gasEstimate_3);
    console.log("level3", gasEstimate_4);
    console.log("level4", gasEstimate_5);
    assert(1); 
  });
  it("The further is the function the more gaz it cost", async () => {

    const Contract_lot_of_instance = await Contract_lot_of_fonction.new();
    const gasEstimate = await Contract_lot_of_instance.test_function.estimateGas();
    const gasEstimate_2 = await Contract_lot_of_instance.test_function2.estimateGas();
    const gasEstimate_3 = await Contract_lot_of_instance.test_function3.estimateGas();
    const gasEstimate_4 = await Contract_lot_of_instance.test_function4.estimateGas();
    const gasEstimate_5 = await Contract_lot_of_instance.test_function5.estimateGas();
    const gasEstimate_6 = await Contract_lot_of_instance.test_function6.estimateGas();
    const gasEstimate_7 = await Contract_lot_of_instance.test_function7.estimateGas();
    const gasEstimate_8 = await Contract_lot_of_instance.test_function8.estimateGas();
    const gasEstimate_9 = await Contract_lot_of_instance.test_function9.estimateGas();
    const gasEstimate_10 = await Contract_lot_of_instance.test_function10.estimateGas();
    console.log("level1:", gasEstimate);
    console.log("level2:", gasEstimate_2);
    console.log("level3", gasEstimate_3);
    console.log("level4", gasEstimate_4);
    console.log("level5", gasEstimate_5);
    console.log("level5", gasEstimate_6);
    console.log("level5", gasEstimate_7);
    console.log("level5", gasEstimate_8);
    console.log("level5", gasEstimate_9);
    console.log("level5", gasEstimate_10);
    assert(1); 
  });
});