pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/access/roles/WhitelistedRole.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol";

import "./Oracle.sol";
import "./Collateral.sol";

contract Swap721 is ERC721Metadata, WhitelistedRole {
  event Minted(address issuer, uint256 tokenId);
  event Bought(address buyer, uint256 tokenId);
  event Settled(uint256 tokenId, uint256 fixLegPayout, uint256 floatingLegPayout);
  event Terminated(uint256 tokenId);

  struct Contract {
    bool    terminated;
    address issuer;
    uint256 contractSize;
    uint256 fixLegPayoutPerDay;
    uint64  startTime;
    uint64  endTime;
    uint64  lastSettleTime;
    uint256 margin;
    uint256 totalFixLegPaid;
    uint256 totalFloatingLegPaid;
  }

  string public contractType;
  string public contractUnit;
  Contract[] _contracts;

  Oracle public     oracle;
  IERC20 public     fixLegToken;
  Collateral public floatingLegCollateral;

  constructor(
    string memory name,
    string memory symbol,
    string memory unit,
    string memory ctype,
    address oracleAddr,
    address fixLegTokenAddr,
    address collateralAddr)
  public ERC721Metadata(name, symbol) {
    contractType = ctype;
    contractUnit = unit;

    oracle = Oracle(oracleAddr);
    fixLegToken = IERC20(fixLegTokenAddr);
    floatingLegCollateral = Collateral(collateralAddr);
  }

  function getTokenDetail(uint256 tokenId) public view returns(
    bool    terminated,
    address issuer,
    uint256 contractSize,
    uint256 fixLegPayoutPerDay,
    uint64  startTime,
    uint64  endTime,
    uint64  lastSettleTime,
    uint256 margin,
    uint256 totalFixLegPaid,
    uint256 totalFloatingLegPaid
  ) {
    Contract memory c = _contracts[tokenId];
    terminated = c.terminated;
    issuer = c.issuer;
    contractSize = c.contractSize;
    fixLegPayoutPerDay = c.fixLegPayoutPerDay;
    startTime = c.startTime;
    endTime = c.endTime;
    lastSettleTime = c.lastSettleTime;
    margin = c.margin;
    totalFixLegPaid = c.totalFixLegPaid;
    totalFloatingLegPaid = c.totalFloatingLegPaid;
  }

  function mint(uint256 contractSize, uint64 duration, uint256 fixLegPayment, uint256 count) onlyWhitelisted public {
    uint256 margin;
    if (duration > 3600 * 24) {
      margin = contractSize * oracle.computeProfit(uint64(now), uint64(now + 3600 * 24));
    } else {
      margin = contractSize * oracle.computeProfit(uint64(now), uint64(now) + duration);
    }

    uint256 marginRequired = count * margin;
    require(floatingLegCollateral.balanceOf(msg.sender) - floatingLegCollateral.marginOf(msg.sender) >= marginRequired);
    floatingLegCollateral.setMargin(msg.sender, marginRequired, 0);

    Contract memory c = Contract(false, msg.sender, contractSize, fixLegPayment * 3600 * 24 / duration, 0, duration, 0, margin, 0, 0);
    for (uint256 i = 0; i < count; i++) {
      uint256 id = _contracts.length;
      _contracts.push(c);
      _mint(msg.sender, id);
      emit Minted(msg.sender, id);
    }
  }

  function initialBuy(uint256[] memory ids) public {
    for (uint256 i = 0; i < ids.length; i++) {
      Contract storage c = _contracts[ids[i]];
      require(c.startTime == 0);

      fixLegToken.transferFrom(msg.sender, address(this), c.fixLegPayoutPerDay * c.endTime / 24 / 3600);
      c.startTime = uint64(now);
      c.endTime += uint64(now);
      c.lastSettleTime = uint64(now);
      _transferFrom(ownerOf(ids[i]), msg.sender, ids[i]);
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
      uint256 floatingLegPayout = oracle.computeProfit(c.lastSettleTime, settleTime) * c.contractSize;

      if (floatingLegCollateral.balanceOf(c.issuer) > floatingLegPayout) {
        // settle
        floatingLegCollateral.pay(c.issuer, ownerOf(ids[i]), floatingLegPayout);

        uint256 fixLegPayout = c.fixLegPayoutPerDay * (settleTime - c.lastSettleTime) / 24 / 3600;
        fixLegToken.transfer(c.issuer, fixLegPayout);

        c.totalFixLegPaid += fixLegPayout;
        c.totalFloatingLegPaid += floatingLegPayout;
        c.lastSettleTime = settleTime;

        if (settleTime < c.endTime) {
          uint256 margin = c.contractSize * oracle.computeProfit(uint64(now), uint64(now + 3600 * 24));
          floatingLegCollateral.setMargin(c.issuer, margin, c.margin);
          c.margin = margin;
        } else {
          floatingLegCollateral.setMargin(c.issuer, 0, c.margin);
          c.margin = 0;
        }

        emit Settled(ids[i], fixLegPayout, floatingLegPayout);
      } else {
        c.terminated = true;
        // refund
        fixLegToken.transfer(ownerOf(ids[i]), c.fixLegPayoutPerDay * (c.endTime - c.lastSettleTime) / 24 / 3600);
        floatingLegCollateral.setMargin(c.issuer, 0, c.margin);
        emit Terminated(ids[i]);
      }
    }
  }
}
