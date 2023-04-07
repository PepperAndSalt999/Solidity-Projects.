pragma solidity >=0.4.22 <=0.8.17;

contract GreedyBanker {

    address private owner;
    uint256 constant fee = 1000 wei;
    uint256 fees;
    struct Account{
        uint balance;
        bool free_trial;
    }
    mapping(address => Account) accounts;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        if(!accounts[msg.sender].free_trial)
        {

            accounts[msg.sender].free_trial = true;
            accounts[msg.sender].balance += msg.value;
        }
        else
        {
            require(msg.value >= 1000);
            fees += 1000;
            accounts[msg.sender].balance += msg.value - 1000;
        }

    }

    fallback() external payable {
        fees += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(accounts[msg.sender].balance >= amount);
        accounts[msg.sender].balance-= amount;
        payable(msg.sender).transfer(amount);
    }

    function collectFees() external {
        require(msg.sender == owner);
        uint amount = fees;
        fees = 0;
        payable(owner).transfer(amount);
    }

    function getBalance() public view returns (uint256) {
        return(accounts[msg.sender].balance);
    }
}
