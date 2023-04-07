pragma solidity >=0.4.22 <=0.8.17;

contract AdvancedCounter {
    struct counter {
        mapping (string => int256) counters;
        uint256 amount;   
    }
    mapping (address => counter) owners;

    modifier counter_exist (string memory id)
    {
        if(owners[msg.sender].counters[id] == 0)
            revert();
        _;
    }
    function createCounter(string memory id, int256 value) public {
        require(owners[msg.sender].amount < 3);
        owners[msg.sender].counters[id] = value;
    }

    function deleteCounter(string memory id) public counter_exist(id){
        delete owners[msg.sender].counters[id];
    }

    function incrementCounter(string memory id) public counter_exist(id) {
        owners[msg.sender].counters[id]++;
    }

    function decrementCounter(string memory id) public counter_exist(id) {
        owners[msg.sender].counters[id]--;
    }

    function getCount(string memory id) public view counter_exist(id) returns (int256)  
    {
        return owners[msg.sender].counters[id];
    }
}
