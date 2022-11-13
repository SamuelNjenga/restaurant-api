"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      table.hasMany(models.bookingTable, {
        onDelete: "restrict",
        foreignKey: {
          name: "tableId",
          allowNull: false,
        },
      });
    }
  }
  table.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      maxNo: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "table",
    }
  );
  return table;
};
