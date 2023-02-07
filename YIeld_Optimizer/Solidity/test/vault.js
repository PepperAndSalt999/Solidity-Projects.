const Vault =  artifacts.require("Vault");

const amount = web3.utils.toWei("0.0001", "ether"); // change eth to wei format
let strategy_name = "test";
let gas_fees;

contract("Vault", async (accounts) => {
    const vault = await Vault.new();
    it("set account, strategy and money", async function(){
        //const vault = await Vault.new();
        await vault.setter(strategy_name, {from: accounts[0], value: amount * 2});
        assert.equal((await vault.accounts(accounts[0])).strategy_name, strategy_name);
    });
    it("send more money", async function(){ 
        //const vault = await Vault.new();
        await vault.send(amount, {from: accounts[0]});
        let balance = await vault.accounts(accounts[0]);
        //assert.ok(balance.eth < (await vault.accounts(accounts[0])).eth);
    });

    // it("deposit, setup strategy and withdraw money", async function(){

    
    // let options = {
    //     from: accounts[0],
    //     to: vault.address,
    //     value: amount
    // };
    //     gas_fees = (await web3.eth.estimateGas(options)) * 2;
    //     await vault.send(amount, {from: accounts[0]});
    //     //from (option object )does specify the account that is gonna be used to send the transaction and pay the gaz fees.
        
    //     await vault.withdraw(amount, {from: accounts[0]});
    //     assert.ok((Number(amount) - Number(await web3.eth.getBalance(accounts[0])) - Number(gas_fees)) < 0.1); //make a call aka read to get contract balance and test getter
    // });

});