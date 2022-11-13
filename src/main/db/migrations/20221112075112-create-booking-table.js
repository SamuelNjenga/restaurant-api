"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookingTables", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tableId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "RESTRICT",
        references: { model: "tables", key: "id" },
      },
      reservationTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "PENDING",
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customerEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customerPhone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bookingTables");
  },
};
