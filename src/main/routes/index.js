const Router = require("express");

const CategoryRoutes = require("./CategoryRoutes");
const MenuItemRoutes = require("./MenuItemRoutes");
const TableRoutes = require("./TableRoutes");

const router = Router();

router.use("/categories", CategoryRoutes);
router.use("/menuItems", MenuItemRoutes);
router.use("/tables", TableRoutes);

module.exports = router;
