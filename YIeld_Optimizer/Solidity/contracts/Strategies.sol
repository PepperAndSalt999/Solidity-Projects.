// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; //auto check for underflows and overflows


//Strategies metadata are stored in a struct by name.
contract Strategies
{
    struct Strategy {
        uint        debtRatio;
        uint        performanceFee;
        uint        harvestTiming;
        uint[]      repartition;
        string      id;
        string      name;
        address     target_contract;
        bytes      target_setter;
        bytes      target_getter;
    }
    mapping(string => Strategy) public strategies;

    function createStrategy(address _target_contract, string calldata _target_setter, string calldata _target_getter, 
                    bytes32[] calldata setter_params, bytes32[] calldata getter_params, uint[] calldata _repartition, string memory _id,
                    uint _debtRatio, string memory _name, uint256 _performanceFee, uint _harvestTiming) external
    {
        bytes4 selector_setter = bytes4(keccak256(abi.encodePacked(_target_setter)));
        bytes4 selector_getter = bytes4(keccak256(abi.encodePacked(_target_getter)));

        strategies[_id] = Strategy({
            id:                     _id,
            debtRatio :             _debtRatio,
            name:                   _name,
            performanceFee:         _performanceFee,
            harvestTiming:          _harvestTiming,
            repartition:            _repartition,
            target_contract:       _target_contract,
            target_setter:         abi.encodeWithSelector(selector_setter, setter_params),
            target_getter:         abi.encodeWithSelector(selector_getter, getter_params)
        });
    }
}
