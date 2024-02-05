const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  updateGoalController,
  updateWaterIntakeController,
  updateActiveWorkout,
  fetchUserDataForAdmin,
  updateUserAccountByAdmin,
  deleteUserByAdmin,
  metricsUpdateController,
  updateCalorie,
  updateSleepController,
  requireSignIn,
} = require("../controllers/userController");

//Router object
const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//UPDATE || PUT
router.put("/update-profile", requireSignIn, updateUserController);

router.put("/update-goal", updateGoalController);

router.put("/update-waterintake", updateWaterIntakeController);

router.put("/update-sleep", updateSleepController);

router.put("/update-activeworkout", updateActiveWorkout);

router.put("/update-calorie", updateCalorie);

router.get("/retreive", fetchUserDataForAdmin);

router.get("/update-metrics/:userId", metricsUpdateController);

router.put("/update-user", updateUserAccountByAdmin);

router.delete("/delete/:userId", deleteUserByAdmin);
//export
module.exports = router;
