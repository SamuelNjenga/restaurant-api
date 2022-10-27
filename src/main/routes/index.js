const Router = require("express");

const CategoryRoutes = require("./CategoryRoutes");
const MenuItemRoutes = require("./MenuItemRoutes");


const router = Router();

router.use("/categories", CategoryRoutes);
router.use("/menuItems", MenuItemRoutes);

module.exports = router;
