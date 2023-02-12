const Strategies = artifacts.require("Strategies");

contract("Strategy", function(accounts) {
    it("test strategy setter and getter", async ()=>{
        const strategies = await Strategies.new();
        const id = "test";
        await strategies.createStrategy("0x0001", "target_setter", "target_getter", "uint uint uint", "uint uint uint"[50,20,30], [accounts[0], accounts[1]], id, 9800, "test", 10, 30);
        const stratInstance = await strategies.strategies(id);

        assert.equal(stratInstance.id, "test");
    });
});
