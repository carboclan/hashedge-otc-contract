# hashedge-otc-contract
solidity contracts & cache server from hashedge otc.

## Server API

Info for home page.  
*/api/erc20/info*
```js
[{
  "name": "Bitcoin",
  "code": "BTC",
  "hashType": "POW",
  "priceUSD": 163862300000000000,
  "unit": "TH",
  "priceCOIN": 41010000000000,
  "profitRate": 0.147
}, //...
]
```

Get erc721 list.
*/api/swap721/list*
```js
{
  "total": 1,
  "result": [
    {
      "name": "BTC-POW",
      "symbol": "BTC-POW",
      "contractType": "PoW",
      "contractUnit": "TH/s",
      "contractAddr": "0x5c097b48c7b1807db3ca3488f6e5d548c437798d",
      "id": 0,
      "status": 2, // 0: issued, 1: on going, 2: finished, -1: terminated, -2: canceled
      "owner": "0x7280c8748b90878f4291579c53e329c361dfb795",
      "issueTx": "0x89266eb4084ac2d737f739029c827161af60bb14269fe54f91f34893ac4daae3",
      "issuer": "0x7280c8748b90878f4291579c53e329c361dfb795",
      "price": 1000000000000000000,
      "contractSize": 3200,
      "fixLegPayoutPerDay": 3.2e+21,
      "startTime": "2019-04-10T08:21:34.000Z",
      "endTime": "2019-04-10T08:22:01.000Z",
      "lastSettleTime": "2019-04-10T08:22:01.000Z",
      "margin": 0,
      "totalFixLegPaid": 1000000000000000000,
      "totalFloatingLegPaid": 1000000000000000000
    }
  ]
}
```
