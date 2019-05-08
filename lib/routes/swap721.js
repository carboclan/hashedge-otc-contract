const _ = require('co-lodash');
const db = require('../db');
const { Op } = db.sequelize;

module.exports = {
  get: {
    async list(ctx) {
      const { offset, limit, status, owner } = ctx.query;

      const query = {
        where: { },
        limit: Math.min(100, limit || 100),
        offset
      };

      if (status) query.where.status = status;
      if (owner) query.where.$or = [
        { owner },
        { issuer: owner }
      ];

      const total = await db.models.swap721.count(query);
      const result = (await db.models.swap721.findAll(query)).map(c => {
        const { name, symbol, contractType, contractUnit } = global.contracts.swap721Tokens[c.contractAddr];
        return { name, symbol, contractType, contractUnit, ...JSON.parse(JSON.stringify(c)) };
      });

      ctx.body = { total, result };
    }
  }
};
