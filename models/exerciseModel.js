const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  type: String,
  sets: Number,
  reps: Number,
  restTime: Number, // in seconds
  duration: Number, // in minutes
  activityLevel: String,
  weightGoal: String,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
