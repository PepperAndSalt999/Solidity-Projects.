const Vault =  artifacts.require("Vault");


contract("Vault", function (accounts) {
    it("able to receive money", async function(){
        const vault = await Vault.new(); //create contract abastraction
        const amount = web3.utils.toWei("0.00001", "ether"); // change eth to wei format

        //force truffle to make a transaction from test account 0 to contract
        const result = await vault.send(amount, {from: accounts[0]}); //equivalent of web3.eth.sendTransaction, it is a special method embeeded on truffle contract objects.
        console.log(result);
        assert.equal((await vault.getter()).toNumber() / 10**18, 0.00001); //make a call aka read to get contract balance and test getter
    });
});