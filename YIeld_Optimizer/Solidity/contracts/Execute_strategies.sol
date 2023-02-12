// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; //auto check for underflows and overflows

//receive money and strategy data.
//dispatch money to address linked in strategies data.
//harvest when called for harvesting
//withdraw when called for withdraw

interface IStrategy
{
    struct Strategy
    {
        uint        debtRatio;
        uint        performanceFee;
        uint        harvestTiming;
        uint[]      repartition;
        string      id;
        string      name;
        address     target_contract;
        bytes4      target_setter;
        bytes4      target_getter;
        bytes4[]    parameters;        
    }
}

contract Execute_strategies is IStrategy{

    struct Target_data {
        uint    eth;
        bytes32 setter;
        bytes32 getter;
        address target_contract;
    }

    mapping(address => uint) public eth;
    mapping(address => Target_data) target_list;
    function set_execution(IStrategy.Strategy calldata strategy) external payable {
        target_list[msg.sender] = Target_data({
                eth: msg.value,
                setter: strategy.target_setter, 
                getter: strategy.target_getter, 
                target_contract: strategy.target_contract});
        dispatch_eth(strategy.target_setter, strategy.target_getter, strategy.target_contract, msg.sender);
    }

    function dispatch_eth(bytes4 setter, bytes4 getter, address target_contract, address sender, bytes4[] parameters) internal{
        target_contract.setter(parameters, {value:amount});
        
        // uint16 i;
        // uint amount;
        //uint test=target_list.length;
        //target_contract.delegatecall(setter);
        
        // while(i < strategy.targets.length){
        //     amount =  eth[sender] * strategy.repartition[i] / 100;
        //     eth[sender] -= amount;
        //     payable(strategy.targets[i]).transfer(amount);
        //     i++;
        // }
    }

    function harvest(address[] memory targets) external
    {
        uint16 i;
        uint amount;
    
        while(i < targets.length){
            //amount = targets[i].balance;


            //launch money ? variable addresses, and variable functions 
            //to add liquidity
            //verify address and call  
            //goal : to transfer money 
            //withraw money has always variable functions 
            /*
                appel a une serie de functions, 
                a.b
                c.d
                contrat "alternatif" et "modifiable"
                addresse for money withdraw
            */
            payable(targets[i]).transfer(amount);
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