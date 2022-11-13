const Router = require("express");

const bookingTableController = require("../controllers/BookingTableController");

const router = Router();

router.post("/", bookingTableController.createBooking);
router.get("/", bookingTableController.getBookingTables);
router.delete("/:id", bookingTableController.deleteBookingTable);
router.put("/:id", bookingTableController.updateBooking);

module.exports = router;
