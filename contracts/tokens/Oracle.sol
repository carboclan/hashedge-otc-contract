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

  function computeProfit(uint64 start, uint64 end) public view returns(uint256 profit) {
    require(_oracles.length > 0);
    require(start >= _oracles[0].ts);

    if (_oracles.length == 1) return _oracles[0].profitPerDayPerUnit;

    for (uint256 d = _oracles.length - 1; d >= 0; d--) {
      OracleData memory od = _oracles[d];
      if (od.ts > end) continue;

      if (start == od.ts || d == 0) {
        profit += od.profitPerDayPerUnit * (end - start) / 24 / 3600;
        break;
      } else {
        profit += od.profitPerDayPerUnit * (end - od.ts) / 24 / 3600;
        end = od.ts;
      }
    }
  }
}
