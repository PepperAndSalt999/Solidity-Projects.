const Vault =  artifacts.require("Vault");

const amount = web3.utils.toWei("0.0001", "ether"); // change eth to wei format
const account = "0x4C36173c2Fa66E8725553a14FDBfd3261032226F";
let strategy_name = "test";
let gas_fees;
var vault;

contract("Vault", function(accounts){
    it("set account, strategy and money", async function(){
        vault = await Vault.deployed();
        await vault.setter(strategy_name, {from: account, value: amount * 2});
        assert.equal((await vault.accounts(account)).strategy_name, strategy_name);
    });
    // it("send more money", async function(){ 
    //     let balance = await vault.accounts(accounts[0]);
    //     await vault.send(amount, {from: accounts[0]});
    //     assert.ok(balance.eth < (await vault.accounts(accounts[0])).eth);
    // });
});