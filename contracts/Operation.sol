// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Operation {
    function multiply_number(uint _useless_number) pure external returns (uint) {
        uint new_number;
        new_number = _useless_number * 2;
        return(new_number);
    }
}