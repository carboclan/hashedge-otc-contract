pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

contract Collateral {
  IERC20 _underlying;

  struct info {
    uint256 balance;
    uint256 margin;
  }

  mapping(address => info) _accountInfo;

  constructor(address erc20Addr) public {
    _underlying = IERC20(erc20Addr);
  }

  function deposit(uint256 value) public {
    _underlying.transferFrom(msg.sender, address(this), value);
    _accountInfo[msg.sender].balance += value;
  }

  function withdraw(uint256 value) public {
    info storage inf = _accountInfo[msg.sender];
    require(value <= inf.balance - inf.margin);

    inf.balance -= value;
    _underlying.transfer(msg.sender, value);
  }
}
