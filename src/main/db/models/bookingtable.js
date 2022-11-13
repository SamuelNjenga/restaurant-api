"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bookingTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bookingTable.belongsTo(models.table, {
        foreignKey: {
          name: "tableId",
          allowNull: false,
        },
      });
    }
  }
  bookingTable.init(
    {
      tableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "RESTRICT",
        references: { model: "tables", key: "id" },
      },
      reservationTime: { type: DataTypes.DATE, allowNull: false },
      status: { type: DataTypes.STRING, defaultValue: "PENDING" },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerPhone: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "bookingTable",
    }
  );
  return bookingTable;
};
