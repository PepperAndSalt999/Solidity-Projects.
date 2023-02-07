// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; //auto check for underflows and overflows

//receive money and strategy data.
//dispatch money to address linked in strategies data.
//harvest when called for harvesting
//withdraw when called for withdraw

library IStrategy
{
    struct Strategy
    {
        uint    debtRatio;
        uint    performanceFee;
        uint    harvestTiming;
        uint[]    repartition;
        string      id;
        string      name;
        address[] targets;
    }
}

contract Execute_strategies {
    mapping(address => uint) eth;
    mapping(address => address[]) target_list;

    function set_execution(IStrategy.Strategy strategy) external payable {
        target_list[msg.sender] = strategy.targets;
        eth[msg.sender] = msg.value;
        dispatch_eth(strategy, msg.sender);
    }

    function dispatch_eth(address[] memory targets, address sender, uint[] memory repartition) internal{
        uint16 i;
        uint amount;
    
        while(targets[i]){
            amount =  eth[sender] * repartition[i] / 100;
            amount -= eth[sender];
            targets[i].send(amount);
            i++;
        }
    }

    function harvest(address[] memory targets) external
    {
        uint16 i;
        uint amount;
    
        while(targets[i]){
            amount = targets[i].call();
            targets[i].send(amount);
            i++;
        }
    }

    // function withdraw(address[] memory targets) external
    // {
    //     while(targets[i]){
    //         targets[i].call();
    //         amount
    //         i++;
    //     }
    // }
}