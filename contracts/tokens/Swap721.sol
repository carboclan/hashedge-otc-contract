pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/access/roles/WhitelistedRole.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol";

import "./Oracle.sol";
import "./Collateral.sol";

contract Swap721 is ERC721Metadata, WhitelistedRole {
  event Minted(address issuer, uint256 tokenId);
  event Bought(address buyer, uint256 tokenId);
  event Settled(uint256 tokenId);
  event Terminated(uint256 tokenId);

  struct Contract {
    bool    terminated;
    address issuer;
    uint256 contractSize;
    uint256 fixLegPayoutPerDay;
    uint64  startTime;
    uint64  endTime;
    uint64  lastSettleTime;
  }

  string public contractType;
  string public contractUnit;
  Contract[] _contracts;

  Oracle _oracle;
  IERC20 _fixLegToken;
  Collateral _floatingLegCollateral;

  constructor(
    string memory name,
    string memory symbol,
    string memory unit,
    string memory ctype,
    address oracle,
    address fixLegToken,
    address collateral)
  public ERC721Metadata(name, symbol) {
    contractType = ctype;
    contractUnit = unit;

    _oracle = Oracle(oracle);
    _fixLegToken = IERC20(fixLegToken);
    _floatingLegCollateral = Collateral(collateral);
  }

  function mint(uint256 contractSize, uint64 duration, uint256 fixLegPayment, uint256 count) onlyWhitelisted public {
    Contract memory c = Contract(false, msg.sender, contractSize, fixLegPayment * 3600 * 24 / duration, 0, duration, 0);
    for (uint256 i = 0; i < count; i++) {
      uint256 id = _contracts.length;
      _contracts.push(c);
      emit Minted(msg.sender, id);
    }
  }

  function initialBuy(uint256[] memory ids) public {
    for (uint256 i = 0; i < ids.length; i++) {
      Contract storage c = _contracts[ids[i]];
      require(ownerOf(ids[i]) == address(0) && c.startTime == 0);

      _fixLegToken.transferFrom(msg.sender, address(this), c.fixLegPayoutPerDay * c.endTime / 24 / 3600);
      c.startTime = uint64(now);
      c.endTime += uint64(now);
      c.lastSettleTime = uint64(now);
      emit Bought(msg.sender, ids[i]);
    }
  }

  function settle(uint256[] memory ids) public onlyWhitelistAdmin {
    for (uint256 i = 0; i < ids.length; i++) {
      Contract storage c = _contracts[ids[i]];
      require(!c.terminated);
      require(c.lastSettleTime < c.endTime);

      uint64 settleTime = uint64(now);
      if (settleTime > c.endTime) settleTime = c.endTime;
      uint256 floatingLegPayout = _oracle.computeProfit(c.lastSettleTime, settleTime) * c.contractSize;

      if (_floatingLegCollateral.balanceOf(c.issuer) > floatingLegPayout) {
        // settle
        _floatingLegCollateral.pay(c.issuer, ownerOf(ids[i]), floatingLegPayout);
        _fixLegToken.transfer(c.issuer, c.fixLegPayoutPerDay * (settleTime - c.lastSettleTime) / 24 / 3600);
        c.lastSettleTime = settleTime;
        emit Settled(ids[i]);
      } else {
        c.terminated = true;
        // refund
        _fixLegToken.transfer(ownerOf(ids[i]), c.fixLegPayoutPerDay * (c.endTime - c.lastSettleTime) / 24 / 3600);
        emit Terminated(ids[i]);
      }
    }
  }
}
