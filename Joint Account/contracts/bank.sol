// SPDX-License-Identifier: MIT

pragma solidity >=0.4.23 <0.9.0;



contract Bank {

  event withdraw_event(address indexed _from, uint _value, bytes32 request_id);
  event Deposit(address indexed _from, uint _value);
  event Request_approved(bytes32 request_id);
  event data(uint _value1, uint _value2);



  struct Account {
    uint balance;
    uint number_of_owners;
    bytes32 account_id;
    mapping(bytes32 => Withdraw_request) withdraw_requests;
  }

  struct Owners {
    address[] owners;
    bytes32 account_id;
  }

  struct Withdraw_request {
    bool    is_approved;
    uint    amount;
    uint    approval_count;
    bytes32 request_id;
    address sender;
    mapping(address => bool) approval;
  }
  
  Owners[] public owners_list;
  mapping(bytes32 => Account) public accounts;

  modifier has_money(){
    require(msg.value > 0);
    _;
  }

  function is_owner() internal view returns(bytes32){
    bytes32 id;
    for(uint i; i < owners_list.length; i++) {
      for(uint j; j < owners_list[i].owners.length; j++)
        if(owners_list[i].owners[j] == msg.sender) 
          id = owners_list[i].account_id;
    }
    require(id != 0, "You are not an owner");
    return(id);
  }


  function create_Account (address[] calldata owners) public {
    require(owners.length <= 4, "Only four owners are allowed");
    for(uint i; i < owners.length; i++) {
      for(uint j; j < owners.length; j++) {
        if(i != j) {
          require(owners[i]!= owners[j], "Duplicate owners are not allowed");
        }
      }
    }
    bytes32 id = keccak256(abi.encodePacked(owners));
    owners_list.push(Owners(owners, id));

    Account storage fill_account;
    fill_account = accounts[id];
    fill_account.balance = 0;
    fill_account.number_of_owners = owners.length;
    fill_account.account_id = id;
    
  }

  function deposit(bytes32 id) payable external  has_money() {
    is_owner();
    accounts[id].balance += msg.value;
    emit Deposit(msg.sender, msg.value);
  }

  function request_withdraw(uint256 amount) external 
  {
    bytes32 id = is_owner();
    
    require(accounts[id].balance >= amount, "Insufficient balance");
    bytes32 request_id = keccak256(abi.encodePacked(amount, id));
    Withdraw_request storage request;
    request = accounts[id].withdraw_requests[request_id];
    request.is_approved = false;
    request.amount = amount;
    request.approval_count = 0;
    request.request_id = request_id;
    request.sender = msg.sender;
    emit withdraw_event(msg.sender, amount, request_id);
  }

  function approve_withdraw(bytes32 request_id) public {
    bytes32 id = is_owner();
    Withdraw_request storage request = accounts[id].withdraw_requests[request_id];
    require(request.is_approved == false);
    require(request.approval[msg.sender] == false);
    request.approval[msg.sender] = true;
    request.approval_count++;
    if(request.approval_count == accounts[id].number_of_owners) {
      request.is_approved = true;
      emit Request_approved(request_id);
    }
  }

  function withdraw(bytes32 account_id, bytes32 request_id) external payable 
  {
    is_owner();
    Withdraw_request storage request = accounts[account_id].withdraw_requests[request_id];
    uint256 amount = request.amount;
    require(request.is_approved, "Request is not approved");
    require(accounts[account_id].balance >= amount, "Insufficient balance");
    accounts[account_id].balance -= amount;
    delete accounts[account_id].withdraw_requests[request_id];
    payable(msg.sender).transfer(amount);
  }

  function get_balance(bytes32 id) view external returns(uint){
    
    require(accounts[id].number_of_owners > 0);
    return(accounts[id].balance);
  }

  function get_account() external view returns(bytes32)
  {
    bytes32 id = is_owner();
    return(id);
  }
}
