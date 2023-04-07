pragma solidity >=0.4.22 <=0.8.17;

contract EtherElection {

    address private owner;
    uint256 constant submit_fee = 1 ether;
    uint256 constant voting_fee = 10000 wei;
    uint256 fees;
    uint256 prize;
    uint256 candidate_amount;
    bool    reward_claimed;
    address winner;


    constructor()
    {
        owner = msg.sender;
    }

    struct Candidate {
        uint256 votes;
        address id;
    }
    mapping(address => Candidate) candidates;
    mapping(address => uint) voters;
    address[] candidates_list;
    

    function enroll() public payable {
        require(candidate_amount < 3);
        require(candidates[msg.sender].id != msg.sender);
        require(msg.value == submit_fee);
        candidates_list.push(msg.sender);
        candidate_amount++;
        prize += submit_fee;
        candidates[msg.sender].id = msg.sender;
    }

    function vote(address candidate) public payable {
        require(msg.value == 10000 wei);
        for(uint i; i < candidates_list.length; i++)
        {
            require(candidates[candidates_list[i]].votes < 5);
        }
        require(candidates[candidate].id != address(0));
        require(voters[msg.sender] == 0);
        voters[msg.sender] = 1;
        fees += 10000;
        candidates[candidate].votes++;
        if(candidates[candidate].votes == 5)
            winner = candidate;
    }

    function getWinner() public view returns (address) {
        require(winner != address(0));
        return(winner);
    }

    function claimReward() public {
        require(msg.sender == winner);
        winner = address(0);
        reward_claimed = true;
        payable(msg.sender).transfer(prize);
    }

    function collectFees() public {
        require(msg.sender == owner);
        require(reward_claimed == true);
        selfdestruct(payable(msg.sender));
    }
}
