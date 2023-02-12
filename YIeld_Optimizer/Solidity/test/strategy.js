const Strategies = artifacts.require("Strategies");

contract("Strategy", function(accounts) {
    it("test strategy setter and getter", async ()=>{
        const strategies = await Strategies.new();
        const id = "test";
        await strategies.createStrategy(9800, 10, 30, [50,20,30], "test", "test");
        await strategies.createStrategy_targets("target_setter", "target_getter", accounts[0], "uint uint uint", "uint uint uint", "test");
        const stratInstance = await strategies.strategies(id);

        assert.equal(stratInstance.id, "test");
    });
});
