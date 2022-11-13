const { sequelize } = require("../db/models");

const bookingTableService = require("../services/BookingTableService");

const ReqValidator = require("../utils/validator");

exports.createBooking = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      tableId: "required|integer",
      reservationTime: "required",
      customerName: "required|string",
      customerEmail: "required|string",
      customerPhone: "required|string",
    });
    if (!valid) return;
    const data = {
      tableId: req.body.tableId,
      reservationTime: req.body.reservationTime,
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      customerPhone: req.body.customerPhone,
    };

    await bookingTableService.createTableBooking(data, transaction);
    await transaction.commit();
    res.status(201).json({ data, message: `A new booking has been created` });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.getBookingTables = async (req, res, next) => {
  try {
    const bookings = await bookingTableService.getTableBookings();
    res.status(200).json(bookings);
  } catch (err) {
    res.json({
      message: err,
    });
    next(err);
  }
};

exports.updateBooking = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const valid = await ReqValidator.validate(req, res, {
      tableId: "integer",
      customerName: "string",
      customerEmail: "string",
      customerPhone: "string",
    });
    if (!valid) return;
    const data = {
      tableId: req.body.tableId,
      status: req.body.status,
      reservationTime: req.body.reservationTime,
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      customerPhone: req.body.customerPhone,
    };

    const bookingTableId = req.params.id;

    const booking = await bookingTableService.getTableBooking(bookingTableId);

    if (!booking) {
      await transaction.commit();
      return res.status(200).json({
        message: `BookingTable ${bookingTableId} does not exist in our database`,
      });
    }

    await bookingTableService.updateTableBooking(
      data,
      {
        where: {
          id: bookingTableId,
        },
      },
      transaction
    );
    await transaction.commit();
    res.status(200).json({
      data,
      message: `BookingTable ${bookingTableId} has been updated`,
    });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

exports.deleteBookingTable = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const bookingTableId = req.params.id;

    const booking = await bookingTableService.getTableBooking(bookingTableId);

    if (!booking) {
      await transaction.commit();
      return res.status(200).json({
        message: `Booking ${bookingTableId} does not exist in our database`,
      });
    }

    await bookingTableService.deleteTableBooking(
      {
        where: {
          id: bookingTableId,
        },
      },
      transaction
    );
    await transaction.commit();
    res.status(200).json({
      message: `Booking ${bookingTableId} has been deleted`,
    });
  } catch (error) {
    transaction.rollback();
    next(error);
  }
};
