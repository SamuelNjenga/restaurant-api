const Router = require("express");

const categoryController = require("../controllers/CategoryController");

const router = Router();

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.get(
  "/:title",
  categoryController.getItemsPerCategoryBasedOnTitle
);
router.delete("/:id", categoryController.deleteCategory);
router.put("/:id", categoryController.updateCategory);

module.exports = router;
