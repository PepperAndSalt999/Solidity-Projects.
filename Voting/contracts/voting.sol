pragma solidity ^0.8.9;

import "hardhat/console.sol";


contract Voting {

    struct Option {
        string name;
        uint votes;
    }

    struct Pool {
        uint    id;
        uint    end_date;
        Option[] options;
    }
    
    struct Pool_data {
        Pool pool;
        mapping(address => bool) voters;
    }


    mapping(uint => Pool_data)  public pool_data;
    mapping(address => bool)    public members;
    Pool[]                      public pool_list;
    uint                        public id;   



    modifier onlyMembers() {
        require(members[msg.sender], "You are not a member");
        _;
    }

    modifier unique_vote(uint pool_id){
        require(pool_data[pool_id].voters[msg.sender] == false, "You have already voted");
        _;
    }

    constructor() {
        console.log("Deploying a Voting contract");
    }

    function add_member(address _address) public {
        require(members[_address] == false, "This address is already a member");
        members[_address] = true;
    }

    function set_pool(string[] memory options, uint end_date) public onlyMembers()
    {
        Pool  pool;
        pool.id = id;
        pool.end_date = end_date;
        for(uint i; i < options.length; i++) {
            Option storage option;
            option.name = options[i];
            pool.options.push(option);
        }
        pool_list.push(pool);
        Pool_data storage instance = pool_data[pool.id];
        instance.pool = pool;
        id++;
    }

    function vote(uint pool_id, uint option_id) public onlyMembers() unique_vote(pool_id)
    {
        require(block.timestamp < pool_data[pool_id].pool.end_date, "Voting is over");
        //Pool_data storage instance = pool_data[pool_id];
        //instance.voters[msg.sender] = true;
        pool_data[pool_id].voters[msg.sender] = true;
        pool_data[pool_id].pool.options[option_id].votes++;
    }

    function validate_pool(uint pool_id) private
    {
        require(block.timestamp > pool_data[pool_id].pool.end_date, "Voting is still ongoing");
        // delete pool_data[pool_id] = 0;
        delete pool_list[pool_id];
    }
}