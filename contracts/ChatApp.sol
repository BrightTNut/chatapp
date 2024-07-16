// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24 ;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ChatApp  {
    struct user{
    string name;
    friend[] friendList;
    }
    struct friend{
        address pubkey;
        string name;
    }
    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUserStruck{
        string name;
        address accountAddress;
    }

    AllUserStruck[] public getAllUsers;

    mapping(address => user)userList;
    mapping(bytes32 => message[]) allMessages;

    //checking user
function checkUserExists(address pubkey) public view returns(bool){
    return bytes(userList[pubkey].name).length > 0;

}

 constructor() {
        // Manually adding a user named "jai" with the contract deployer's address
        getAllUsers.push(AllUserStruck("jai", msg.sender));
    }
//create account
function  createAccount(string calldata name) external{
    require(checkUserExists(msg.sender) == false,"User already exists");
    require((bytes(name)).length  > 0,"Please Enter Name");
    userList[msg.sender].name = name;
   
   
    getAllUsers.push(AllUserStruck(name, msg.sender));
}


//get user name
function getUsername(address pubkey) external view returns(string memory){
    require(checkUserExists(pubkey),"First Register User");
    return userList[pubkey].name;
}

//adding friends
function addFriend(address  friend_key,string calldata name) external{
    require(checkUserExists(msg.sender),"Create Account First");
    require(checkUserExists(friend_key),"User not Register!!");
    require(msg.sender != friend_key,"Users cannot add themselves as a friend");
    require(checkAlreadyFriends(msg.sender, friend_key)== false,"These users are already friend");
    _addFriend(msg.sender, friend_key, name);
    _addFriend(friend_key, msg.sender, userList[msg.sender].name);
}

//check if friend already exists
function checkAlreadyFriends(address pubkey1,address pubkey2)internal view returns(bool){
if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
   address tem = pubkey1;
    pubkey1= pubkey2;
    pubkey2 = tem;
}

for(uint256 i =0 ; i< userList[pubkey1].friendList.length; i++){
    if(userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
}
return false;
}

function _addFriend(address me, address friend_key,string memory name) internal{
    friend memory newFriend = friend(friend_key, name);
    userList[me].friendList.push(newFriend);
}


//get my friend
function getMyFriendList() external view returns(friend[] memory){
    return userList[msg.sender].friendList;
}
 

 //get chat code
 function _getChatCode(address pubkey1, address pubkey2) internal pure returns(bytes32){
    if(pubkey1 < pubkey2){
        return keccak256(abi.encodePacked(pubkey1, pubkey2));
    }else return keccak256(abi.encodePacked(pubkey2, pubkey1));
 }

 //send massage
 function sendMessage(address friend_key, string calldata _msg) external{
    require(checkUserExists(msg.sender), "Create an Account First");
    require(checkUserExists(friend_key), "User is not Registered");
    require(checkAlreadyFriends(msg.sender, friend_key), "You are not friend with the given User");

    bytes32 chatCode = _getChatCode(msg.sender , friend_key);
    message memory newMsg = message(msg.sender , block.timestamp , _msg);
    allMessages[chatCode].push(newMsg);
 }

 //read message
 function readMessage(address friend_key) external view returns(message[] memory){
    bytes32 chatCode = _getChatCode(msg.sender, friend_key);
    return allMessages[chatCode];
 }

 //for get all users account
 function getAllAppUsers() public view returns(AllUserStruck[] memory){
    return getAllUsers;
 }
}
