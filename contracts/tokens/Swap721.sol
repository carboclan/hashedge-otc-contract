pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/access/roles/M.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol";

import "./Oracle.sol";
import "./Collateral.sol";

contract Swap721 is ERC721Metadata, MinterRole {
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

  function mint(uint256 contractSize, uint64 duration, uint256 fixLegPayment, uint256 count) onlyMinter public {

  }

  function settle() public onlyOwner {

  }
}
