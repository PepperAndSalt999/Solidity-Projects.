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
    function createSingleFonction() external {
        new Contract_single_fonction();
    }
    function createMultFonction() external {
        new  Contract_multiples_fonction();
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

contract Contract_single_fonction {
    function test_function() public {

    }
}


contract Contract_multiples_fonction {
    function test_function() external{

    }
    function test_function2() external{

    }
    function test_function3() external{

    }
    function test_function4() external{

    }
    function test_function5() external{

    }
}