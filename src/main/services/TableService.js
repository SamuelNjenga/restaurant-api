const db = require("../db/models/index");

exports.createTable = async (data) => {
  return db.table.create(data);
};

exports.updateTable = async (data, root) => {
  return db.table.update(data, root);
};

exports.getTables = async () => {
  return db.table.findAll();
};

exports.getTable = async (data) => {
  return db.table.findByPk(data);
};

exports.deleteTable = async (data) => {
  return db.table.destroy(data);
};
