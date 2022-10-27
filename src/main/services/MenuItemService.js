const db = require("../db/models/index");

exports.createMenuItem = async (data) => {
  return db.menuItem.create(data);
};

exports.updateMenuItem = async (data, root) => {
  return db.menuItem.update(data, root);
};

exports.getMenuItems = async () => {
  return db.menuItem.findAll();
};

exports.getMenuItem = async (data) => {
  return db.menuItem.findByPk(data);
};

exports.deleteMenuItem = async (data) => {
  return db.menuItem.destroy(data);
};
