pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/access/roles/WhitelistedRole.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract BtcSwapToken is ERC721, WhitelistedRole {
  struct OracleData {
    uint64 ts;
    uint256 profitPerThDay;
  }

  struct Contract {
    bool    exists;
    address issuer;
    address owner;
    uint256 contractSize;
    uint64  startTime;
    uint64  endTime;
    uint64  lastSettleTime;
  }

  OracleData[] oracle;
  Contract[] contracts;
  ERC20 public fixedLegToken;
  ERC20 public floatingLegToken;

  mapping(uint256 => address) contractIdToApproved;
  mapping(address => uint256) addressToCount;

  constructor(address fixedLegToken_, address floatingLegToken_) public {
    fixedLegToken = ERC20(fixedLegToken_);
    floatingLegToken = ERC20(floatingLegToken_);
  }

  function setProfitOracle(uint64 _ts, uint64 _profit) public onlyWhitelistAdmin {
    require(_ts > now - 24 * 3600 * 14 && _ts < now);
    require(_ts > oracle[oracle.length - 1].ts);

    oracle.push(OracleData(_ts, _profit));
  }

  function issueNewContract(uint256 _size, uint64 _duration, uint256 _count) public onlyWhitelisted {
    require(oracle.length > 0);

    Contract memory c = Contract(
      true,
      msg.sender,
      address(0),
      _size,
      0,
      _duration,
      0
    );

    for (uint256 i = 0; i < _count; i++) {
      addressToCount[msg.sender]++;
      contracts.push(c);
    }
  }

  function name() external pure returns (string memory) {
    return "BTC SWAP TOKEN";
  }

  function symbol() external pure returns (string memory) {
    return "BTCSWAP";
  }

  function tokenURI(uint256) public pure returns (string memory) {
    return "";
  }

  function implementsERC721() public pure returns (bool) {
    return true;
  }

  function totalSupply() public view returns (uint256 total) {
    total = contracts.length - 1;
  }

  function tokenOfOwnerByIndex(address, uint256) public pure returns (uint256 _tokenId) {
    return 0; // not needed.
  }

  function tokenByIndex(uint256 _index) public pure returns (uint256) {
    return _index;
  }

  function ownerOf(uint256 _tokenId) public view returns (address owner) {
    owner = contracts[_tokenId].owner;
  }

  function balanceOf(address _owner) public view returns (uint256 _balance) {
    _balance = addressToCount[_owner];
  }

  function exists(uint256 _tokenId) public view returns (bool) {
    return contracts[_tokenId].exists;
  }

  function approve(address _to, uint256 _tokenId) public {
    require(ownerOf(_tokenId) == msg.sender);

    contractIdToApproved[_tokenId] = _to;
    emit Approval(msg.sender, _to, _tokenId);
  }

  function getApproved(uint256 _tokenId) public view returns (address _operator) {
    return contractIdToApproved[_tokenId];
  }

  function setApprovalForAll(address, bool) public {
    revert();
  }

  function isApprovedForAll(address, address) public view returns (bool) {
    return false;
  }

  function transferFrom(address _from, address _to, uint256 _tokenId) public {
    require(_to != address(0));
    require(contractIdToApproved[_tokenId] == msg.sender);
    require(ownerOf(_tokenId) == _from);

    _transfer(_from, _to, _tokenId);
  }

  function safeTransferFrom(address _from, address _to, uint256 _tokenId) public {
    return safeTransferFrom(_from, _to, _tokenId, "");
  }

  function safeTransferFrom(
    address,
    address,
    uint256,
    bytes memory
  )
  public {
    revert();
  }


  function transfer(address _to, uint256 _tokenId) public {
    require(_to != address(0));
    require(ownerOf(_tokenId) == msg.sender);

    _transfer(msg.sender, _to, _tokenId);
  }

  function contractUnit() public pure returns (string memory) {
    return "GH/s";
  }

  function contractType() public pure returns (string memory) {
    return "PoW";
  }

  function _transfer(address _from, address _to, uint256 _tokenId) internal {
    // there is no way to overflow this
    addressToCount[_to]++;
    addressToCount[_from]--;

    // transfer ownership
    contracts[_tokenId].owner = _to;

    // Emit the transfer event.
    emit Transfer(_from, _to, _tokenId);
  }
}
