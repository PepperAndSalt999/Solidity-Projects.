// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Vault 
{
    //fallback function, allow to recieve eth
    //fallback makes it auto executed if the caller try to call an unavailable functon
    //limited to 2300 gas
    mapping(address => uint) private addressMoney;
    receive() external payable 
    {
        addressMoney[msg.sender] += msg.value;
    }

    function withdraw() external
    {
        uint amount;
        amount = addressMoney[msg.sender];
        payable(msg.sender).transfer(amount);
    }

    function getter() external view returns (uint)
    {
        return (addressMoney[msg.sender]);
    }
}
