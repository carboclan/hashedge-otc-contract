pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol";

import "./Oracle.sol";
import "./Collateral.sol";

contract Swap721 is ERC721Metadata {
  struct Contract {
    bool    terminated;
    address issuer;
    uint256 contractSize;
    uint64  startTime;
    uint64  endTime;
    uint64  lastSettleTime;
  }

  string public contractUnit;
  Contract[] _contracts;

  Oracle _oracle;
  IERC20 _fixLegToken;
  Collateral _floatingLegCollateral;

  constructor(
    string memory name,
    string memory symbol,
    string memory unit,
    address oracle,
    address fixLegToken,
    address collateral)
  public ERC721Metadata(name, symbol) {
    contractUnit = unit;
    _oracle = Oracle(oracle);
    _fixLegToken = IERC20(fixLegToken);
    _floatingLegCollateral = Collateral(collateral);
  }
}
