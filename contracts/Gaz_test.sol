// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract Gaz_test {
    function createInstance() public {
        new Contract();
    }
    function createStorageContract() public {
        new Storage_contract();
    }
    function createFillStorageContract() public {
        new Storage_contract_filled();
    }
}

contract Contract {
  constructor() public {}
}


contract Storage_contract {
    uint test1;
    uint test2;
    uint test3;
    uint test4;
    uint test5;
  constructor() public {}
}


contract Storage_contract_filled {
    uint test1 = 10;
    uint test2;
    uint test3;
    uint test4;
    uint test5;
  constructor() public {
    test2 = 10;
    test3 = 40;
    test4 = 20;
    test5 = 50;
  }
}