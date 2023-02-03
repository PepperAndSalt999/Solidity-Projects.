// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; //auto check for underflows and overflows

contract Vault 
{
    //fallback function, allow to recieve eth
    //fallback makes it auto executed if the caller try to call an unavailable functon
    //limited to 2300 gas
    mapping(address => uint) private addressMoney;
    receive() external payable //payable gives access to eth stored in msg.value
    {
        addressMoney[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) external
    {
        require(addressMoney[msg.sender] >= amount && amount > 0, "not enough money stored");
        payable(msg.sender).transfer(amount);
    }

    function getter() external view returns (uint)
    {
        return (addressMoney[msg.sender]);
    }
}
