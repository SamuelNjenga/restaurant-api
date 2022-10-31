const db = require("../db/models/index");

exports.createCategory = async (data) => {
  return db.category.create(data);
};

exports.updateCategory = async (data, root) => {
  return db.category.update(data, root);
};

exports.getCategories = async () => {
  return db.category.findAll();
};

exports.getItemsBasedOnCategories = async (data) => {
  return db.category.findAll(data);
};

exports.getCategory = async (data) => {
  return db.category.findByPk(data);
};

exports.deleteCategory = async (data) => {
  return db.category.destroy(data);
};
