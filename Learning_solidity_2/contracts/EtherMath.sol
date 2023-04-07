pragma solidity >=0.4.22 <=0.8.17;

contract EtherMath {

    address private owner;
    struct Challenge {
        int256[] puzzle;
        int256 solution;
        mapping(address => bool) users_solutions;
    }
    Challenge challenge;

    uint256 reward;
    address winner;
    mapping(int256 => bool) elements;

    constructor()
    {
        owner = msg.sender;
    }
    function submitChallenge(int256[] memory array, int256 targetSum)
        public
        payable
    {
        require(reward == 0);
        require(msg.value > 0);
        require(msg.sender == owner);
        challenge.solution = targetSum;
        for(uint i; i < array.length; i++)
            challenge.puzzle.push(array[i]);
        reward += msg.value;

    }

    function submitSolution(int256[] memory solution) public {
        require(reward != 0);
        require(challenge.users_solutions[msg.sender] == false);
        challenge.users_solutions[msg.sender] = true;
        if(solution.length == challenge.puzzle.length)
        {
            bool valid = true;
            for(uint i; i < solution.length; i++)
                elements[solution[i]] = true;
            for(uint i; i < challenge.puzzle.length; i++)
            {
                if(elements[challenge.puzzle[i]] == false)
                    valid = false;
            }

            for(uint i; i < solution.length; i++)
                elements[solution[i]] = false;
            if(valid)
            {
                winner = msg.sender;
                delete challenge;
            }
        }
    }

    function claimRewards() public {
            require(msg.sender == winner);
            payable(msg.sender).transfer(reward);
            delete winner;
            reward = 0;
    }
}
