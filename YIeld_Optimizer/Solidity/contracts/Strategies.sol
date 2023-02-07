// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; //auto check for underflows and overflows


//Strategies metadata are stored in a struct by name.
contract Strategies
{
    struct Strategy {
        uint    debtRatio;
        uint    performanceFee;
        uint    harvestTiming;
        uint[]    repartition;
        string      id;
        string      name;
        address[] targets;
    }
    mapping(string => Strategy) public strategies;

    function createStrategy(uint[] calldata _repartition, address[] calldata _targets, string memory _id, uint _debtRatio, string memory _name, uint256 _performanceFee, uint _harvestTiming) external 
    {
        strategies[_id] = Strategy({
            id:              _id,
            debtRatio :      _debtRatio,
            name:            _name,
            performanceFee:  _performanceFee,
            harvestTiming:   _harvestTiming,
            repartition:     _repartition,
            targets:         _targets
        });
    }
}
