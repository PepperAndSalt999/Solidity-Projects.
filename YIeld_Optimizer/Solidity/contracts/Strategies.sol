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
        bytes       target_setter;
        bytes       target_getter;
        address     target_contract;
    }
    mapping(string => Strategy) public strategies;

    function createStrategy_targets(string calldata _target_setter, string calldata _target_getter, address _target_contract, 
                                    string calldata _setter_params, string calldata _getter_params, string calldata id) external
    {        
        bytes4 selector_setter = bytes4(keccak256(abi.encodePacked(_target_setter)));
        bytes4 selector_getter = bytes4(keccak256(abi.encodePacked(_target_getter)));
        bytes32 setter_params = bytes32(keccak256(abi.encodePacked(_setter_params)));
        bytes32 getter_params = bytes32(keccak256(abi.encodePacked(_getter_params)));
        strategies[id].target_setter = abi.encodeWithSelector(selector_setter, setter_params);
        strategies[id].target_setter = abi.encodeWithSelector(selector_getter, getter_params);
        strategies[id].target_contract = _target_contract;
    }

    function createStrategy(
                    uint _debtRatio, uint _performanceFee, uint _harvestTiming, uint[] calldata _repartition,
                    string calldata _id, string calldata _name) external
    {
        strategies[_id] = Strategy({
            id:                     _id,
            debtRatio :             _debtRatio,
            name:                   _name,
            performanceFee:         _performanceFee,
            harvestTiming:          _harvestTiming,
            repartition:            _repartition,
            target_contract:        address(0),
            target_setter:          "",
            target_getter:          ""

        });
    }
}
