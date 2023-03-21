const Executer = artifacts.require("Execute_strategies");

contract("Execute_strategies", function(accounts) {
    it("fill_strategy metadata", async function(){
        const executer = await Executer.deployed();
        const strategy = {
            debtRatio: 9800,
            performanceFee: 2,
            harvestTiming: 50,
            repartition: [10,50,20,15],
            id: "123",
            name :"test",
            target_setter: web3.eth.abi.encodeFunctionSignature("addLiquidityETH()"), //use eth to access to functionality related to the ethereum blockchain : here the binary application interface
            target_getter: web3.eth.abi.encodeFunctionSignature("addLiquidityETH()"),
            target_contract: "0xdb19Ad528F4649692B92586828346beF9e4a3532"
        };

        await executer.set_execution(strategy, {from: "0x4C36173c2Fa66E8725553a14FDBfd3261032226F", value: 0.00001}); //setup strategy of executor + dispatch eth in stargate vault
        //console.log(await web3.eth.getCode("0xdb19Ad528F4649692B92586828346beF9e4a3532"));
        //const result = await web3.eth.getBalance("0xCf1F9cD3789Fc6296f4abB11dc460067Ae1a2673"); //get balance of target_contract  aka stargateVault
        //assert.equal(result, 10000000);
        // for(i = 0; i < 4; i++)
        // {
        //     assert.ok(await web3.utils.fromWei(await web3.eth.getBalance(strategy.targets[i])) > 100);
        // }
    });
});

// function addLiquidityETH() external payable {
//     require(msg.value > 0, "Stargate: msg.value is 0");

//     uint256 amountLD = msg.value;

//     // wrap the ETH into WETH
//     IStargateEthVault(stargateEthVault).deposit{value: amountLD}();
//     IStargateEthVault(stargateEthVault).approve(address(stargateRouter), amountLD);

//     // addLiquidity using the WETH that was just wrapped,
//     // and mint the LP token to the msg.sender
//     stargateRouter.addLiquidity(poolId, amountLD, msg.sender);
// }