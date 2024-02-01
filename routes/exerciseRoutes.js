const express = require("express");
const router = express.Router();
const {
  createExercise,
  getAllExercises,
  updateExercise,
  deleteExercise,
} = require("../controllers/exerciseController");

router.post("/create", createExercise);

router.get("/retreive", getAllExercises);

router.put("/update/:id", updateExercise);

router.delete("/delete/:id", deleteExercise);

module.exports = router;
