const { sequelize } = require("../db/models");

const tableService = require("../services/TableService");

const ReqValidator = require("../utils/validator");

exports.createTable = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      name: "required|string",
      maxNo: "required|integer",
    });
    if (!valid) return;
    const data = {
      name: req.body.name,
      maxNo: req.body.maxNo,
    };
    await tableService.createTable(data, transaction);
    await transaction.commit();
    res.status(201).json({ data, message: `A new table has been added` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.getTables = async (req, res, next) => {
  try {
    const tables = await tableService.getTables();
    res.status(200).json(tables);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.updateTable = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      name: "string",
      maxNo: "integer",
    });
    if (!valid) return;
    const data = {
      name: req.body.name,
      maxNo: req.body.maxNo,
    };

    const tableId = req.params.id;

    const table = await tableService.getTable(tableId);

    if (!table) {
      await transaction.commit();
      return res.status(200).json({
        message: `Table ${tableId} does not exist in our database`,
      });
    }

    await tableService.updateTable(
      data,
      {
        where: {
          id: tableId,
        },
      },
      transaction
    );
    await transaction.commit();
    res
      .status(200)
      .json({ data, message: `Table ${tableId} has been updated` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.deleteTable = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const tableId = req.params.id;

    const table = await tableService.getTable(tableId);

    if (!table) {
      await transaction.commit();
      return res.status(200).json({
        message: `Table ${tableId} does not exist in our database`,
      });
    }

    await tableService.deleteTable(
      {
        where: {
          id: tableId,
        },
      },
      transaction
    );
    await transaction.commit();
    res.status(200).json({
      message: `Table ${tableId} has been deleted`,
    });
  } catch (error) {
    transaction.rollback();
    next(error);
  }
};
