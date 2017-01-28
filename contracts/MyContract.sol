pragma solidity ^0.4.2;

contract EntitlementRegistry{function get(string _name)constant returns(address);function getOrThrow(string _name)constant returns(address);}
contract Entitlement{function isEntitled(address _address)constant returns(bool);}

contract MyContract {

// BlockOne ID bindings

// The address below is for the norsborg network only
EntitlementRegistry entitlementRegistry = EntitlementRegistry(0x995bef79dfa2e666de2c6e5f751b4483b6d05cd8);

function getEntitlement() constant returns(address) {
return entitlementRegistry.getOrThrow("com.tr.ubet");
}

// Checks if User is logged in
modifier entitledUsersOnly {
if (!Entitlement(getEntitlement()).isEntitled(msg.sender)) throw;
_;
}

// Bindings
uint public amount;
bool public transactionType;
address public sender;
address public receiver;
uint public status;
uint public quote;                      //0 = requested, 1 = answered, 2 = accepted


function request (bool _transactionType, uint _amount) entitledUsersOnly {
    sender = msg.sender;
    transactionType = _transactionType;
    amount = _amount;
    status = 0;
}

function offer(uint _quote) entitledUsersOnly{
    receiver = msg.sender;
    quote = _quote;
    status = 1;
}

function accept() entitledUsersOnly{
    status = 2;
}

function getRequest() constant returns (address s, address r, bool tt, uint a){
    s = sender;
    r = receiver;
    tt = transactionType;
    a = amount;
}
}

