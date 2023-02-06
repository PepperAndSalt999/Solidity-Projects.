// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; //auto check for underflows and overflows

//import the strategy contract
//import "./Strategies.sol";

//make the strategy contract an interface so you can call it easily
contract Vault
{

    struct Accounts {
        uint        eth;
        string      strategy_name;
    }
    //mapping(address => Accounts) public accounts;

    //fallback function, allow to recieve eth
    //fallback makes it auto executed if the caller try to call an unavailable functon
    //limited to 2300 gas -- Will only execute to lock more money than already locked
    receive() external payable //payable gives access to eth stored in msg.value
    {
        //require(accounts[msg.sender].eth != 0);
        //accounts[msg.sender].eth += msg.value;
    }

    // function chooseStrategy(uint eth, string memory strategy_name) public
    // {
    //     //require(strategies[strategy_name].debtRatio != 0);
    //     accounts[msg.sender] = Accounts(eth, strategy_name);
    // }

    function withdraw(uint256 amount) external
    {
        //require(accounts[msg.sender].eth >= amount && amount > 0, "not enough money stored");
        payable(msg.sender).transfer(amount);
    }

    function getter() external view returns (uint)
    {
        //return (accounts[msg.sender].eth);
    }
}
