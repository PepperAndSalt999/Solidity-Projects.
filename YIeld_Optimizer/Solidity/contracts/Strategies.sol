// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; //auto check for underflows and overflows

contract Strategies
{
    struct Strategy {
        uint256 id;
        string name;
        uint256 age;
    }
    Strategy[] private strategies;

    function setter(uint256 _id, string memory _name, uint256 _age) external 
    {
        Strategy memory newStrategy = Strategy({
            id : _id,
            name: _name,
            age:  _age
        });
        strategies.push(newStrategy);
    }

    function getter() external view returns (uint)
    {
        // returns(Strategy[id])
    }
}
