
module.exports = {
  get: {
    async info(ctx) {
      ctx.body = [
        {
          name: 'Bitcoin',
          code: 'BTC',
          hashType: 'POW',
          priceUSD: 0.1638623 * 1e18,
          unit: 'TH',
          priceCOIN: 0.00004101 * 1e18,
          profitRate: 0.147
        },
        {
          name: 'Ether',
          code: 'ETH',
          hashType: 'POW',
          priceUSD: 0.012569375 * 1e18,
          unit: 'GH',
          priceCOIN: 0.00001281 * 1e18,
          profitRate: 1.767
        },
        {
          name: 'ZCASH',
          code: 'ZEC',
          hashType: 'POW',
          priceUSD: 0.1119127249 * 1e18,
          unit: 'KSOL',
          priceCOIN: 0.082028210 * 1e18,
          profitRate: 4.357
        },
        {
          name: 'LiteCoin',
          code: 'LTC',
          hashType: 'POW',
          priceUSD: 0.00323722046 * 1e18,
          unit: 'MH',
          priceCOIN: 0.000028210 * 1e18,
          profitRate: -0.204
        },
        {
          name: 'TEZOS',
          code: 'XZT',
          hashType: 'POS',
          priceUSD: -0.002309351417 * 1e18,
          unit: 'XZT',
          priceCOIN: -0.082028210 * 1e18,
          profitRate: -0.513
        },
        {
          name: 'EOS',
          code: 'EOS',
          hashType: 'DPOS',
          priceUSD: 0.0001181918 * 1e18,
          unit: 'EOS',
          priceCOIN: 0.0000273973 * 1e18 ,
          profitRate: 15.258
        }
      ];
    }
  }
};
