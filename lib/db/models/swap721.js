
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cow', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    owner: {
      type: DataTypes.STRING(42),
      allowNull: true
    },
    issuer: {
      type: DataTypes.STRING(42),
      allowNull: true
    },
    contractAddr: {
      type: DataTypes.STRING(42),
      allowNull: true
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    contractSize: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'contract_size'
    },
    fixLegPayoutPerDay: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'start_time'
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end_time'
    },
    lastSettleTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end_time'
    },
    margin: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'swap721',
    indexes: [
      { fields: ['owner'] }
    ]
  });
};
