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
      if (owner) query.where.owner = owner;

      const total = await db.models.swap721.count(query);
      const result = await db.models.swap721.findAll(query);

      ctx.body = { total, result };
    }
  }
};
