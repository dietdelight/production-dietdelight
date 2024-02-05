const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add name"],
      trim: true,
    },
    email: {
      type: String,
      require: [true, "please add email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please add password"],
      min: 6,
      max: 64,
      trim: true,
    },
    age: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    role: {
      type: String,
    },
    calorieGoal: {
      type: Number,
    },
    fitnessGoal: {
      type: Number,
    },
    stepGoal: {
      type: Number,
    },
    activeWorkoutGoal: {
      type: Number,
    },
    waterIntakeGoal: {
      type: Number,
    },
    calorie: {
      type: Number,
    },
    fitness: {
      type: Number,
    },
    step: {
      type: Number,
    },
    activeWorkout: {
      type: Number,
    },
    waterIntake: {
      type: Number,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
