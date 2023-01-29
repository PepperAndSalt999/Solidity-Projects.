// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Operation {

    uint private state_variable;
    
    function get_state_variable() view external returns (uint)
    {
        return state_variable;
    }

    function state_modify(uint state_modifier) external
    {
        state_variable = state_variable + state_modifier * 2;
    }

    function multiply_number(uint _useless_number) pure public returns (uint) {
        uint new_number;
        new_number = _useless_number * 2;
        return(new_number);
    }
}

contract Advanced_operation is Operation {
    function advanced_multiplication(uint _useless_number) pure external returns (uint) {
        return(multiply_number(_useless_number) * multiply_number(_useless_number));
    }
}