const _ = require('co-lodash');
const db = require('../db');
const { fn, col, Op } = require('sequelize');

module.exports = {
  get: {
    async list(ctx) {
      const { offset, limit, status, owner, order, agg } = ctx.query;
      const query = { where: { }, raw: true };

      if (agg) {
        query.attributes = { exclude: 'id', include: [[fn('GROUP_CONCAT', col('id'), ','), 'ids']] };
        query.group = ['issueTx', 'status'];
      }

      if (status) query.where.status = parseInt(status);
      if (owner) query.where[Op.or] = [
        { owner: { [Op.eq]: owner } },
        { issuer: { [Op.eq]: owner } }
      ];

      if (order) {
        query.order = [order.split(',')];
      }

      const total = await db.models.swap721.count(query);

      query.limit = Math.min(100, limit || 100);
      query.offset = offset;

      const result = (await db.models.swap721.findAll(query)).map(c => {
        c.ids = c.ids.split(',').map(id => parseInt(id));
        const { name, symbol, contractType, contractUnit } = global.contracts.swap721Tokens[c.contractAddr];
        return { name, symbol, contractType, contractUnit, ...JSON.parse(JSON.stringify(c)) };
      });

      ctx.body = { total: agg ? total.length : total, result };
    }
  }
};
