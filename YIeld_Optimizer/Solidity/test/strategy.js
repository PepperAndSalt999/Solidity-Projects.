const Strategies = artifacts.require("Strategies");

contract("Strategy", function(accounts) {
    it("test strategy setter and getter", async ()=>{
        const strategies = await Strategies.new();
        const id = "test";
        await strategies.createStrategy([50,20,30], id, 9800, "test",  30,  10,);
        await strategies.createStrategy_targets(accounts[0], "target_setter", "target_getter", "uint uint uint", "uint uint uint", "test");
        const stratInstance = await strategies.strategies(id);

        assert.equal(stratInstance.id, "test");
    });
});
