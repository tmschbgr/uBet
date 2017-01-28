pragma solidity ^0.4.2;

contract hello {
    string greeting;
    uint val;
    address lastCaller;
    
    mapping(address => uint) balance;
    
    modifier onlyLastCaller() {
        if (msg.sender == lastCaller)
            _; // do everything that follows.
        else
            throw; // do nothing.
    }
    
    function setGreeting(string s) {
        balance[msg.sender] = msg.value;
        greeting = s;
        lastCaller = msg.sender;
    }
    
    function getGreeting() constant returns (string s, uint v) { // talking only to one node, no need to broadcast
        // return greeting;
        s = greeting;
        v = val;
    }
    
    function doSomething(string s) onlyLastCaller {
        greeting = s;
    }
    
    
}
