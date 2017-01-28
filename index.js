var abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "s",
        "type": "string"
      }
    ],
    "name": "doSomething",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "s",
        "type": "string"
      }
    ],
    "name": "setGreeting",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getGreeting",
    "outputs": [
      {
        "name": "s",
        "type": "string"
      },
      {
        "name": "v",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  }
];

var Web3 = require("web3");
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('https://noteven2degrees.by.ether.camp:8555/sandbox/347a9352a9'));
console.log("available accounts: " + web3.eth.accounts);

var addressA = "0x17956ba5f4291844bc25aedb27e69bc11b5bda39";
web3.eth.defaultAccount = web3.eth.accounts[0];
var contractA = web3.eth.contract(abi);//.at([address]);
var inst = contractA.at(addressA);
console.log("contract : " + contractA);
//var contractInstance = contract.at(address);
inst.setGreeting("Hello World+", {from: "0xcd2a3d9f938e13cd947ec05abc7fe734df8dd820"}, function(error, response) {
    console.log ("error: " + error + ", response: " + response);
});

inst.getGreeting(function(error, response) {
   console.log(response[0] + " = " + response[1]); 
});
