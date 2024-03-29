// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.16;

contract HelloWorld {
       function append(string memory b, string memory c, string memory d, string memory e,string memory f) internal pure returns (string memory) {
    return string(abi.encodePacked( b, c, d, e,f));
    }
    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function compareStrings(string memory a, string memory b)
        public
        pure
        returns (bool){
        return (keccak256(abi.encodePacked((a))) ==
        keccak256(abi.encodePacked((b))));
    }

    struct Panel {
        string id;
        string name;
        uint256 voteCount;
    }
    mapping(address => bool) public voters;
    mapping (string => bool) public userVoted;
    uint256 public panelsCount;

    mapping(uint256 => Panel) public panels;

    function addPanel(string memory _panelid) public {
        
        panels[panelsCount] = Panel(_panelid, _panelid, 0);
        panelsCount++;
    }

    event votedEvent(string indexed _panelId);

    function vote(string memory _panelId,string memory _userID) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);
        //require(!userID(_userID));

        // require a valid candidate
        // require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        for (uint256 i = 0; i < panelsCount; i++) {
            if (compareStrings(panels[i].id, _panelId)) {
                panels[i].voteCount++;
            }
        }
        //voters[msg.sender] = true;
        
        require(msg.sender != address(0), "Invalid address");
        require(!userVoted[_userID], "User has already voted");

        userVoted[_userID] = true;
        // update candidate vote Count

        // trigger voted event
        emit votedEvent(_panelId);
    }
    
    function winningProposal() public view returns (uint256 winningProposal_) {
        uint256 winningVoteCount = 0;
        for (uint256 p = 0; p < panelsCount; p++) {
            if (panels[p].voteCount > winningVoteCount) {
                winningVoteCount = panels[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() public view returns (string memory) {
        string memory x = "  ";
        for (uint256 p=0;p<panelsCount;p++){
           x =  append(panels[p].name,":",uint2str(panels[p].voteCount),",",x);
        }

        return x;
    }

    function totalVotes() public view returns (uint256){
         uint256 x = 0;
         for (uint256 p=0;p<panelsCount;p++){
           x = x +  panels[p].voteCount;
        }

        return x;
    }

}
