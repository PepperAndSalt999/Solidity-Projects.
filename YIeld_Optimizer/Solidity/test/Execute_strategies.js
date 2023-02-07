const Executer = artifacts.require("Execute_strategies");

contract("Execute_strategies", function(accounts) {
    it("fill_strategy metadata", async function(){
        const executer = await Executer.deployed();
        const strategy = {
            debtRatio: 9800,
            performanceFee: 2,
            harvestTiming: 50,
            repartition: [10,50,20,15],
            id: "123",
            name :"test",
            targets: [accounts[2],accounts[3], accounts[3], accounts[4]]
        };
        await executer.set_execution(strategy, {from: accounts[0], value: 1000000000});
        assert.ok((await executer.eth(accounts[0])) > 0);
    });
});