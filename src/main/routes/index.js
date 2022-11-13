const Router = require("express");

const CategoryRoutes = require("./CategoryRoutes");
const MenuItemRoutes = require("./MenuItemRoutes");
const TableRoutes = require("./TableRoutes");
const BookingTableRoutes = require("./BookingTableRoutes");

const router = Router();

router.use("/categories", CategoryRoutes);
router.use("/menuItems", MenuItemRoutes);
router.use("/tables", TableRoutes);
router.use("/bookings", BookingTableRoutes);

module.exports = router;
