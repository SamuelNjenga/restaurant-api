const Router = require("express");

const CategoryRoutes = require("./CategoryRoutes");

const router = Router();

router.use("/categories", CategoryRoutes);

module.exports = router;
