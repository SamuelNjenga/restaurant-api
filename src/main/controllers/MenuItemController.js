const { sequelize } = require("../db/models");

const menuItemService = require("../services/MenuItemService");

const ReqValidator = require("../utils/validator");

exports.createMenuItem = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      name: "required|string",
      description: "required|string",
      image: "required|string",
      price: "required",
      categoryId: "required|integer",
    });
    if (!valid) return;
    const data = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      categoryId: req.body.categoryId,
    };

    await menuItemService.createMenuItem(data, transaction);
    await transaction.commit();
    res.status(201).json({ data, message: `A new menuItem has been created` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.getMenuItems = async (req, res, next) => {
  try {
    const menuItems = await menuItemService.getMenuItems();
    res.status(200).json(menuItems);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.updateMenuItem = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      name: "required|string",
      description: "required|string",
      image: "required|string",
      price: "required",
      categoryId: "required|integer",
    });
    if (!valid) return;
    const data = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      categoryId: req.body.categoryId,
    };

    const menuItemId = req.params.id;

    const menuItem = await menuItemService.getMenuItem(menuItemId);

    if (!menuItem) {
      await transaction.commit();
      return res
        .status(200)
        .json({ message: `MenuItem ${menuItemId} does not exist in our database` });
    }

    await menuItemService.updateMenuItem(
      data,
      {
        where: {
          id: menuItemId,
        },
      },
      transaction
    );
    await transaction.commit();
    res.status(200).json({ data, message: `MenuItem ${menuItemId} has been updated` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.deleteMenuItem = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const menuItemId = req.params.id;

    const menuItem = await menuItemService.getMenuItem(menuItemId);

    if (!menuItem) {
      await transaction.commit();
      return res
        .status(200)
        .json({ message: `MenuItem ${menuItemId} does not exist in our database` });
    }

    await menuItemService.deleteMenuItem(
      {
        where: {
          id: menuItemId,
        },
      },
      transaction
    );
    await transaction.commit();
    res.status(200).json({
      message: `MenuItem ${menuItemId} has been deleted`,
    });
  } catch (error) {
    transaction.rollback();
    next(error);
  }
};
