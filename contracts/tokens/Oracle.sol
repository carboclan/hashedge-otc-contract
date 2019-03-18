pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/access/roles/WhitelistedRole.sol";

contract Oracle is WhitelistedRole {
  struct OracleData {
    uint64 ts;
    uint256 profitPerDayPerUnit;
  }

  OracleData[] _oracles;

  constructor() public {

  }

  function setProfitOracle(uint64 _ts, uint64 _profit) public onlyWhitelisted {
    require(_ts > now - 72 * 3600 * 14 && _ts < now);
    require(_ts > _oracles[_oracles.length - 1].ts);

    _oracles.push(OracleData(_ts, _profit));
  }
}
