pragma solidity >=0.4.21 <0.6.0;

import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "zeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract BtcSwapToken is ERC721 {
  struct OracleData {
    uint256 ts;
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

  function name() external view returns (string _name) {
    return "BTC SWAP TOKEN";
  }

  function symbol() external view returns (string _symbol) {
    return "BTCSWAP";
  }

  function tokenURI(uint256) public view returns (string) {
    return "";
  }

  function supportsInterface(bytes4 _interfaceId) external view returns (bool) {
    return _interfaceId == InterfaceId_ERC721;
  }

  function implementsERC721() public pure returns (bool) {
    return true;
  }

  function totalSupply() public view returns (uint256 total) {
    total = contracts.length - 1;
  }

  function tokenOfOwnerByIndex(address, uint256) public view returns (uint256 _tokenId) {
    return 0; // not needed.
  }

  function tokenByIndex(uint256 _index) public view returns (uint256) {
    return _index;
  }

  function ownerOf(uint256 _tokenId) public view returns (address owner) {
    owner = contracts[_tokenId].owner;
  }

  function balanceOf(address _owner) public view returns (uint256 _balance) {
    _balance = addressToCount[_owner];
  }

  function exists(uint256 _tokenId) public view returns (bool _exists) {
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
    bytes
  )
  public {
    revert();
  }


  function transfer(address _to, uint256 _tokenId) public {
    require(_to != address(0));
    require(ownerOf(_tokenId) == msg.sender);

    _transfer(msg.sender, _to, _tokenId);
  }

  function contractUnit() public pure returns (string) {
    return "GH/s";
  }

  function contractType() public pure returns (string) {
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
