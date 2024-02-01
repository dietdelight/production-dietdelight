const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
var { expressjwt: jwt } = require("express-jwt");

const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const registerController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      weight,
      height,
      userType,
      calorieGoal,
      fitnessGoal,
      stepGoal,
      activeWorkoutGoal,
      waterIntakeGoal,
      calorie,
      fitness,
      step,
      activeWorkout,
      waterIntake,
    } = req.body;

    if (!name || !email || !password || !userType) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User Already Registered With This Email",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await userModel({
      name,
      email,
      password: hashedPassword,
      age,
      weight,
      height,
      role: userType,
      calorieGoal,
      fitnessGoal,
      stepGoal,
      activeWorkoutGoal,
      waterIntakeGoal,
      calorie,
      fitness,
      step,
      activeWorkout,
      waterIntake,
    }).save();

    return res.status(201).send({
      success: true,
      message: "Registration Successful, Please Login!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email Or Password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "USER NOT FOUND",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    const token = await JWT.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "ERROR IN LOGIN API",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { name, password, email, age, weight, height, role } = req.body;

    const user = await userModel.findOne({ email });

    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be 6 character long",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        age: age || user.age,
        weight: weight || user.weight,
        height: height || user.height,
        role: role || user.role,
      },
      { new: true }
    );

    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile Updated. Please Login",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In User Update Api",
      error,
    });
  }
};

const updateGoalController = async (req, res) => {
  try {
    const {
      email,
      calorieGoal,
      fitnessGoal,
      stepGoal,
      activeWorkoutGoal,
      waterIntakeGoal,
    } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    const updatedUserGoal = await userModel.findOneAndUpdate(
      { email },
      {
        calorieGoal: calorieGoal !== undefined ? calorieGoal : user.calorieGoal,
        fitnessGoal: fitnessGoal !== undefined ? fitnessGoal : user.fitnessGoal,
        stepGoal: stepGoal !== undefined ? stepGoal : user.stepGoal,
        activeWorkoutGoal:
          activeWorkoutGoal !== undefined
            ? activeWorkoutGoal
            : user.activeWorkoutGoal,
        waterIntakeGoal:
          waterIntakeGoal !== undefined
            ? waterIntakeGoal
            : user.waterIntakeGoal,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Targets Set!",
      updatedUserGoal,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Target goal Update Api",
      error,
    });
  }
};

const updateWaterIntakeController = async (req, res) => {
  try {
    const { email, waterIntake } = req.body;
    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updateWaterIntake = await userModel.findOneAndUpdate(
      { email },
      {
        waterIntake: waterIntake !== undefined ? waterIntake : user.waterIntake,
      },
      { new: true }
    );
    // Return the updated user data
    res.status(200).send({
      success: true,
      updateWaterIntake,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In water intake addition",
      error,
    });
  }
};

const updateActiveWorkout = async (req, res) => {
  const { email, duration } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if duration is defined and greater than or equal to 0
    if (duration !== undefined && duration >= 0) {
      user.activeWorkout += duration; // Assuming activeWorkout is a numeric field
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCalorie = async (req, res) => {
  const { email, calories } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if duration is defined and greater than or equal to 0
    if (calories !== undefined && calories >= 0) {
      user.calorie += calories;
    }
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchUserDataForAdmin = async (req, res) => {
  try {
    // Fetch user data as an admin
    const users = await userModel.find({});

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ message: "Error fetching user data" });
  }
};

const updateUserAccountByAdmin = async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      age,
      weight,
      height,
      calorieGoal,
      stepGoal,
      waterIntake,
      waterIntakeGoal,
      calorie,
      step,
      activeWorkout,
    } = req.body;

    // Check if the user with the given userId exists
    const userToUpdate = await userModel.findById(userId);

    if (!userToUpdate) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update the user's account details
    userToUpdate.name = name || userToUpdate.name;
    userToUpdate.email = email || userToUpdate.email;
    userToUpdate.age = age || userToUpdate.age;
    userToUpdate.weight = weight || userToUpdate.weight;
    userToUpdate.height = height || userToUpdate.height;
    userToUpdate.calorieGoal = calorieGoal || userToUpdate.calorieGoal;
    userToUpdate.stepGoal = stepGoal || userToUpdate.stepGoal;
    userToUpdate.waterIntakeGoal =
      waterIntakeGoal || userToUpdate.waterIntakeGoal;
    userToUpdate.calorie = calorie || userToUpdate.calorie;
    userToUpdate.step = step || userToUpdate.step;
    userToUpdate.activeWorkout = activeWorkout || userToUpdate.activeWorkout;
    userToUpdate.waterIntake = waterIntake || userToUpdate.waterIntake;

    // Save the updated user
    const updatedUser = await userToUpdate.save();

    res.status(200).json({
      success: true,
      message: "User account details updated by admin",
      updatedUser,
    });
  } catch (error) {
    console.error(
      "Error updating user account details by admin:",
      error.message
    );
    res.status(500).json({
      success: true,
      message: "Duplicate Email Address Found!",
    });
  }
};

const deleteUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const metricsUpdateController = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract and send only the required metrics data
    const metricsData = {
      calorie: user.calorie,
      waterIntake: user.waterIntake,
      step: user.step,
      activeWorkout: user.activeWorkout,
    };

    res.status(200).json({
      success: true,
      message: "Metrics data fetched successfully",
      metricsData,
    });
  } catch (error) {
    console.error("Error fetching metrics data:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching metrics data",
    });
  }
};

const resetDailyProgress = async () => {
  try {
    // Example logic to reset user fields
    // Update this with actual fields and logic as per your application's requirements
    await userModel.updateMany(
      {},
      { $set: { waterIntake: 0, calorie: 0, step: 0, activeWorkout: 0 } }
    );

    console.log("Daily progress reset completed successfully.");
  } catch (error) {
    console.error("Error resetting daily progress:", error);
  }
};

module.exports = {
  requireSignIn,
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
  resetDailyProgress,
};
