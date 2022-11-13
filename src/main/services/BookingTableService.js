const db = require("../db/models/index");

exports.createTableBooking = async (data) => {
  return db.bookingTable.create(data);
};

exports.updateTableBooking = async (data, root) => {
  return db.bookingTable.update(data, root);
};

exports.getTableBookings = async () => {
  return db.bookingTable.findAll();
};

exports.getTableBooking = async (data) => {
  return db.bookingTable.findByPk(data);
};

exports.deleteTableBooking = async (data) => {
  return db.bookingTable.destroy(data);
};
