const DEX = artifacts.require("DEX");
const MyToken = artifacts.require("MyToken");

contract("DEX", accounts => {
  const [owner, addr1, addr2] = accounts;
  let token, dex;
  const initialSupply = web3.utils.toBN(web3.utils.toWei("1000"));
  const price = web3.utils.toBN(web3.utils.toWei("0.01"));

  beforeEach(async () => {
    token = await MyToken.new(initialSupply);
    dex = await DEX.new(token.address, price);
  });

  it("should set the owner and price correctly", async () => {
    const ownerAddr = await dex.owner();
    const dexPrice = await dex.price();
    assert.equal(ownerAddr, owner);
    assert(price.eq(dexPrice));
  });

  it("should allow owner to sell tokens", async () => {
    const allowance = web3.utils.toBN(web3.utils.toWei("100"));
    await token.approve(dex.address, allowance, { from: owner });
    await dex.sell({ from: owner });
    const dexTokenBalance = await token.balanceOf(dex.address);
    assert(allowance.eq(dexTokenBalance));
  });

  it("should calculate the correct token price", async () => {
    const amountToken = web3.utils.toBN("10");
    const expectedPrice = price.mul(amountToken);
    const totalPrice = await dex.get_price(amountToken);
    assert(expectedPrice.eq(totalPrice));
  });

  it("should allow users to buy tokens", async () => {
    const allowance = web3.utils.toBN(web3.utils.toWei("100"));
    await token.approve(dex.address, allowance, { from: owner });
    await dex.sell({ from: owner });

    const amountToken = web3.utils.toBN("10");
    const totalPrice = await dex.get_price(amountToken);

    await dex.buy(amountToken, { from: addr1, value: totalPrice });

    const addr1TokenBalance = await token.balanceOf(addr1);
    assert(amountToken.eq(addr1TokenBalance));
  });

  it("should allow owner to withdraw tokens", async () => {
    const allowance = web3.utils.toBN(web3.utils.toWei("100"));
    await token.approve(dex.address, allowance, { from: owner });
    await dex.sell({ from: owner });

    const amountWithdraw = web3.utils.toBN(web3.utils.toWei("50"));
    await dex.withdraw_tokens(amountWithdraw, { from: owner });

    const dexTokenBalance = await token.balanceOf(dex.address);
    assert(allowance.sub(amountWithdraw).eq(dexTokenBalance));
  });

  it("should allow owner to withdraw funds", async () => {
    const allowance = web3.utils.toBN(web3.utils.toWei("100"));
    await token.app
    await token.approve(dex.address, allowance, { from: owner });
    await dex.sell({ from: owner });

    const amountToken = web3.utils.toBN("10");
    const totalPrice = await dex.get_price(amountToken);
    await dex.buy(amountToken, { from: addr1, value: totalPrice });

    const ownerInitialBalance = await web3.eth.getBalance(owner);
    await dex.withdraw_funds({ from: owner });
    const ownerFinalBalance = await web3.eth.getBalance(owner);

    const ownerInitialBalanceBN = web3.utils.toBN(ownerInitialBalance);
    const ownerFinalBalanceBN = web3.utils.toBN(ownerFinalBalance);
    assert(ownerFinalBalanceBN.gt(ownerInitialBalanceBN));
  });

  it("should return the correct token balance", async () => {
    const allowance = web3.utils.toBN(web3.utils.toWei("100"));
    await token.approve(dex.address, allowance, { from: owner });
    await dex.sell({ from: owner });

    const dexTokenBalance = await token.balanceOf(dex.address);
    const getBalanceResult = await dex.get_balance();
    assert(dexTokenBalance.eq(getBalanceResult));
  });
});
