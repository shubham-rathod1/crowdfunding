// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Campaign {

    enum State {Running, Ended, Successfull, Fail}
    // replace this wiht struct later
    mapping(address => uint) public backers;
    string public name;
    string public description;
    uint public target;
    uint public deadline;
    uint public minContribution;
    uint public noOfBackers;
    address public manager;
    string public image;
    uint public raisedAmount;
    address[] public contributers;
    State campaignState;
    State constant defaultChoice = State.Running;

    constructor (string memory _name, string memory _description, uint _target, 
    uint _deadline, uint _minContribution, address _manager, string memory _image ) {
        name = _name;
        description = _description;
        target = _target;
        deadline = block.timestamp + _deadline;
        minContribution = _minContribution;
        manager = _manager;   // how to make this address to be the managers and not kickstart
        image = _image;
    }

    function fund () public payable {
        require(deadline > block.timestamp, "campaign has ended");
        require(msg.value >= minContribution, "please fund at least the min value");

        if (backers[msg.sender] == 0) {
            noOfBackers++;
            contributers.push(msg.sender);
        }
        backers[msg.sender]+= msg.value;
        raisedAmount+= msg.value;
    }

    function getCampaignBalance () public view returns(uint) {
        return address(this).balance;
    }

    function refund () public payable {
        require(block.timestamp > deadline, "campaign is still running");
        require(backers[msg.sender] > 0, "you have not contributed to this campaign");
        require(target >= address(this).balance,"campaign is successfull");

        address payable user = payable(msg.sender);
        user.transfer(backers[msg.sender]);
        backers[msg.sender] = 0;
        noOfBackers--;
    }

    function payout () public payable {
        require(block.timestamp > deadline,"campaign is still running");
        require(target <= address(this).balance, "you did not achieve your target");
        
        payable(manager).transfer(address(this).balance);
    }

}

contract Kickstart {
    Campaign[] public campaigns;

    function  createCampaign ( string memory _name, string memory _description, 
    uint _target, uint _deadline, uint _minContribution, address _manager, string memory _image ) public {
        Campaign campaign = new Campaign(_name, _description, _target, _deadline, _minContribution, _manager, _image);
        campaigns.push(campaign);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

}

// 0xd9145CCE52D386f254917e481eB44e9943F39138 // 0xd9145CCE52D386f254917e481eB44e9943F39138