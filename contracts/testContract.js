pragma solidity ^0.4.2;

contract EntitlementRegistry{function get(string _name)constant returns(address);function getOrThrow(string _name)constant returns(address);}
contract Entitlement{function isEntitled(address _address)constant returns(bool);}

contract MyContract {

  // BlockOne ID bindings

  // The address below is for the ropsten network only
  EntitlementRegistry entitlementRegistry = EntitlementRegistry(0x6216e07ba072ca4451f35bdfa2326f46d3f99dbe);

  function getEntitlement() constant returns(address) {
      return entitlementRegistry.getOrThrow("com.tr.ubet");
  }

  modifier entitledUsersOnly {
    if (!Entitlement(getEntitlement()).isEntitled(msg.sender)) throw;
    _;
  }

    uint public blue = 0;
   uint public red = 0;

   function vote(bool voteRed) entitledUsersOnly {
     if (voteRed) {
       red++;
     } else {
       blue++;
     }
   }

  // Your implementation goes here
  uint public blue=0;
  uint public red =0;

  function vote(bool voteRed) entitledUsersOnly{
      if(voteRed) {
          red += 1;
      } else {
          blue +=1;
      }
  }

}