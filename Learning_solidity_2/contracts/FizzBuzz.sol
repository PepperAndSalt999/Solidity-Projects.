pragma solidity >=0.4.22 <=0.8.17;

contract FizzBuzz {

    event Fizz(address sender, uint indexed count);
    event Buzz(address sender, uint indexed count);
    event FizzAndBuzz(address sender, uint indexed count);

    uint256 count;

    function increment() public {
        count++;
        if(count % 3 == 0 && count % 5 == 0)
            emit FizzAndBuzz(msg.sender, count);
        else if(count % 3 == 0)
            emit Fizz(msg.sender, count);
        else if(count % 5 == 0)
            emit Buzz(msg.sender, count);
    }
}
