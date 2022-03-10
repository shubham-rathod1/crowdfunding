// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Campaign {
    enum State {
        Running,
        Ended
    }
    // replace this wiht struct later
    mapping(address => uint256) public backers;
    string public name;
    string public description;
    uint256 public target;
    uint256 public deadline;
    uint256 public minContribution;
    uint256 public noOfBackers;
    address public manager;
    uint256 public raisedAmount;
    State campaignState;
    State constant defaultChoice = State.Running;

    constructor(
        string memory _name,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        uint256 _minContribution,
        address _manager
    ) {
        name = _name;
        description = _description;
        target = _target;
        deadline = block.timestamp + _deadline;
        minContribution = _minContribution;
        manager = _manager; // how to make this address to be the managers and not kickstart
        // campaignState = state.Running;
    }

    function fund() public payable {
        require(deadline > block.timestamp, "campaign has ended");
        require(
            msg.value >= minContribution,
            "please fund at least the min value"
        );

        if (backers[msg.sender] == 0) {
            noOfBackers++;
        }
        backers[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    function getCampaignBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function refund() public payable {
        require(block.timestamp > deadline, "campaign is still running");
        require(
            backers[msg.sender] > 0,
            "you have not contributed to this campaign"
        );

        address payable user = payable(msg.sender);
        user.transfer(backers[msg.sender]);
        backers[msg.sender] = 0;
        noOfBackers--;
    }

    function payout() public payable {
        require(target <= address(this).balance);

        payable(manager).transfer(address(this).balance);
    }
}

contract Kickstart {
    Campaign[] public campaigns;

    function createCampaign(
        string memory _name,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        uint256 _minContribution,
        address _manager
    ) public {
        Campaign campaign = new Campaign(
            _name,
            _description,
            _target,
            _deadline,
            _minContribution,
            _manager
        );
        campaigns.push(campaign);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }
}

// 0xd9145CCE52D386f254917e481eB44e9943F39138 // 0xd9145CCE52D386f254917e481eB44e9943F39138
