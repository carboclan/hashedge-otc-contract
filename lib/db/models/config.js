
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('config', {
    key: {
      type: DataTypes.STRING(42),
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    timestamps: true,
    tableName: 'config'
  });
};
