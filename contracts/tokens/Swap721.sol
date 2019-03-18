pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract Swap721 is ERC721 {
  struct OracleData {
    uint64 ts;
    uint256 profitPerThDay;
  }

  struct Contract {
    bool    terminated;
    address issuer;
    uint256 contractSize;
    uint64  startTime;
    uint64  endTime;
    uint64  lastSettleTime;
  }

  OracleData[] oracle;
  Contract[] contracts;

  constructor() public {

  }
}
