const Strategies = artifacts.require("Strategies");

contract("Strategy", function(accounts) {
    it("test strategy setter and getter", async ()=>{
        const strategies = await Strategies.new();
        const id = "test";
        await strategies.createStrategy(id, 9800, "test", 10, 30);
        const stratInstance = await strategies.strategies(id);

        assert.equal(stratInstance.id, "test");
    });
});
