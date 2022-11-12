const Router = require("express");

const tableController = require("../controllers/TableController");

const router = Router();

router.post("/", tableController.createTable);
router.get("/", tableController.getTables);
router.delete("/:id", tableController.deleteTable);
router.put("/:id", tableController.updateTable);

module.exports = router;
