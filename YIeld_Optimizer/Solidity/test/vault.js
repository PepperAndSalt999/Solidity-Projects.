const Vault =  artifacts.require("Vault");


contract("Vault", function (accounts) {
    it("able to receive money", async function(){
        const vault = await Vault.new(); //create contract abastraction
        const amount = web3.utils.toWei("0.00001", "ether"); // change eth to wei format

        //force truffle to make a transaction from test account 0 to contract
        const result = await vault.send(amount, {from: accounts[0]}); //equivalent of web3.eth.sendTransaction, it is a special method embeeded on truffle contract objects.
        const result0 = await vault.getter();
        console.log(result0);
        assert.equal(await vault.getter(), amount); //make a call aka read to get contract balance and test getter
    });
    
    it("deposit and withdraw money", async function(){
        const vault = await Vault.new(); //create contract abastraction
        const amount = web3.utils.toWei("0.0001", "ether"); // change eth to wei format
        let gas_fees;
        let options = {
            from: accounts[0],
            to: vault.address,
            value: amount
        };
        let res = await web3.eth.getBalance(accounts[0]);
    
        gas_fees = (await web3.eth.estimateGas(options)) * 2;
        await vault.send(amount, {from: accounts[0]});
        //from (option object )does specify the account that is gonna be used to send the transaction and pay the gaz fees.
        
        await vault.withdraw({from: accounts[0]});
        //assert.ok((Number(amount) - Number(await web3.eth.getBalance(accounts[0])) - Number(gas_fees)) < 0.1); //make a call aka read to get contract balance and test getter
    });
});