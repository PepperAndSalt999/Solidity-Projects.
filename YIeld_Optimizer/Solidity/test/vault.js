const Vault =  artifacts.require("Vault");


contract("Vault", function (accounts) {
    it("able to receive money", async function(){
        const vault = await Vault.new();

        const amount = web3.utils.toWei("1", "ether");
        await vault.send(web3.utils.toWei("1", "ether")); //equivalent of web3.eth.sendTransaction
        assert.equal(await vault.getter(), amount);
    });
});