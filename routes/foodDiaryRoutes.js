const express = require("express");
const router = express.Router();
const {
  createFoodDiary,
  getAllFoodDiaries,
  updateFoodDiary,
  deleteFoodDiary,
} = require("../controllers/foodDiaryController");

router.post("/create/", createFoodDiary);

router.get("/retrieve", getAllFoodDiaries);

router.put("/update/:id", updateFoodDiary);

router.delete("/delete/:id", deleteFoodDiary);

module.exports = router;
