// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; //auto check for underflows and overflows

contract Strategies
{
    struct Strategy {
        uint    debtRatio;
        uint    performanceFee;
        uint    harvestTiming;
        string  id;
        string  name;
    }
    mapping(string => Strategy) public strategies;

    function createStrategy(string memory _id, uint _debtRatio, string memory _name, uint256 _performanceFee, uint _harvestTiming) external 
    {
        strategies[_id] = Strategy({
            id:              _id,
            debtRatio :      _debtRatio,
            name:            _name,
            performanceFee:  _performanceFee,
            harvestTiming:   _harvestTiming
        });
    }
}
