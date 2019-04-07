
module.exports = {
  get: {
    async price(ctx) {
      ctx.body = {
        'WBTC': 5000,
        'WETH': 180,
        'DAI': 1
      };
    }
  }
};
