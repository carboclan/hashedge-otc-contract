pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/access/roles/WhitelistedRole.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

contract Collateral is WhitelistedRole {
  IERC20 _underlying;

  struct info {
    uint256 balance;
    uint256 margin;
  }

  mapping(address => info) _accountInfo;

  constructor(address erc20Addr) public {
    _underlying = IERC20(erc20Addr);
  }

  function balanceOf(address owner) public view returns(uint256) {
    return _accountInfo[owner].balance;
  }

  function marginOf(address owner) public view returns(uint256) {
    return _accountInfo[owner].margin;
  }

  function pay(address from, address to, uint256 value) public onlyWhitelisted {
    require(balanceOf(from) > value);
    _accountInfo[from].balance -= value;
    _underlying.transfer(to, value);
  }

  function setMargin(address who, uint256 add, uint256 sub) public onlyWhitelisted {
    _accountInfo[who].margin += add;
    require(_accountInfo[who].margin >= sub);
    _accountInfo[who].margin -= sub;
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
