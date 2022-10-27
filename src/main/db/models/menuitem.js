"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class menuItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      menuItem.belongsTo(models.category, {
        foreignKey: {
          name: "categoryId",
          allowNull: false,
        },
      });
    }
  }
  menuItem.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "RESTRICT",
        references: { model: "categories", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "menuItem",
    }
  );
  return menuItem;
};
