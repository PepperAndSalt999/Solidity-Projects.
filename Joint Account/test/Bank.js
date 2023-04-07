const Bank = artifacts.require("Bank");
const truffleAssert = require('truffle-assertions');


contract("Bank", accounts => {
    let bank;
    let account_id_1;
    let account_id_2;
    let account_id_3;
    let amount;
    let balance;
    let withdraw;
    let request_id;

    before(async () => {
        bank = await Bank.deployed();

        amount = web3.utils.toWei("0.1", "ether");
    
    });
    
    it ("create a new account", async () => {
        account = await bank.create_Account([accounts[0], accounts[1], accounts[2]], {from: accounts[0]});
        const id = await bank.get_account({from: accounts[0]});
        assert.ok(id);
    })

    it ("Get Account Id", async () => {
        account_id_1 = await bank.get_account({from: accounts[0]});
        account_id_2 = await bank.get_account({from: accounts[1]});
        account_id_3 = await bank.get_account({from: accounts[2]});
        assert.equal(account_id_1, account_id_2, account_id_3, "Account Ids are not equal");
    });

    it ("Deposit", async () => {
        let deposit = await bank.deposit(account_id_1, {from: accounts[0], value: amount});
        balance = await bank.get_balance(account_id_1);
        truffleAssert.eventEmitted(deposit, 'Deposit', (ev) => {
            return ev._value == amount;
        });
        assert.equal(web3.utils.fromWei(balance, "ether"), 0.1);
    });

    it("Request Withdraw", async () => {
        withdraw = await bank.request_withdraw( web3.utils.toWei("0.01", "ether"), {from: accounts[0]});

        truffleAssert.eventEmitted(withdraw, 'withdraw_event', (ev) => {
            request_id = ev.request_id;
            return ev._value == web3.utils.toWei("0.01", "ether");
        });
    });

    it("Witndraw_approval", async () => {
        await bank.approve_withdraw(request_id, {from: accounts[2]});
        await bank.approve_withdraw(request_id, {from: accounts[1]});
        const approved = await bank.approve_withdraw(request_id, {from: accounts[0]});
  
        truffleAssert.eventEmitted(approved, 'Request_approved', (ev) => {
            return ev.request_id == request_id;
        });
    });

    it("Withdraw", async () => {
        const begin = await web3.eth.getBalance(accounts[0]);
        await bank.withdraw(account_id_1, request_id, {from: accounts[0]});
        const end = await web3.eth.getBalance(accounts[0])
        assert.ok(begin < end);
    });
});