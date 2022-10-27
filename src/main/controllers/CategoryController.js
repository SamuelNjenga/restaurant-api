const { sequelize } = require("../db/models");

const categoryService = require("../services/CategoryService");

const ReqValidator = require("../utils/validator");

exports.createCategory = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      name: "required|string",
    });
    if (!valid) return;
    const data = {
      name: req.body.name,
    };
    await categoryService.createCategory(data, transaction);
    await transaction.commit();
    res.status(201).json({ data, message: `A new category has been added` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      name: "required|string",
    });
    if (!valid) return;
    const data = {
      name: req.body.name,
    };

    const categoryId = req.params.id;

    const category = await categoryService.getCategory(categoryId);

    if (!category) {
      await transaction.commit();
      return res
        .status(200)
        .json({
          message: `Category ${categoryId} does not exist in our database`,
        });
    }

    await categoryService.updateCategory(
      data,
      {
        where: {
          id: categoryId,
        },
      },
      transaction
    );
    await transaction.commit();
    res
      .status(200)
      .json({ data, message: `Category ${categoryId} has been updated` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const categoryId = req.params.id;

    const category = await categoryService.getCategory(categoryId);

    if (!category) {
      await transaction.commit();
      return res
        .status(200)
        .json({
          message: `Category ${categoryId} does not exist in our database`,
        });
    }

    await categoryService.deleteCategory(
      {
        where: {
          id: categoryId,
        },
      },
      transaction
    );
    await transaction.commit();
    res.status(200).json({
      message: `Category ${categoryId} has been deleted`,
    });
  } catch (error) {
    transaction.rollback();
    next(error);
  }
};
