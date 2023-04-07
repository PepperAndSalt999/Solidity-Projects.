pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DEX {

    IERC20 public token;
    address public owner;
    uint public price;

    constructor(IERC20 _token, uint _price) {
        token = _token;
        owner = msg.sender;
        price = _price;
    }


    receive() payable {
        address(this).balance += msg.value;
    }

    modifier owner_only(){
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function sell() public owner_only(){
        uint allowance = token.allowance(msg.sender, address(this));
        require(allowance > 0, "Allowance too low");
        uint amount = token.transferFrom(msg.sender, address(this), allowance);
        require(amount, "Transfer failed");
    }

    function get_price(uint amount_token) public returns(uint256)
    {
        return(price * amount_token);
    }

    function buy(uint amount_token) external payable {
        require(get_balance() >= amount_token, "need more tokens");
        uint to_pay = get_price(amount_token);
        require(msg.value == to_pay);
        token.transfer(msg.sender, amount_token);
    }

    function withdraw_tokens(uint amount) external owner_only {
        require(token.balanceOf(address(this) >= amount));
        token.transfer(address(this), amount);
    }

    function withdraw_funds() owner_only() external
    {
        require(address(this).balance);
        payable(owner).transfer(address(this).balance);
    }
    function get_balance() public view returns(uint256)
    {
        return(token.balanceOf(address(this)));
    }
}