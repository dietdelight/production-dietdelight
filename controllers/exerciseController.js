const Exercise = require("../models/exerciseModel");

// Controller to create a new exercise
const createExercise = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      sets,
      reps,
      restTime,
      duration,
      activityLevel,
      weightGoal,
    } = req.body;
    const newExercise = new Exercise({
      name,
      description,
      type,
      sets,
      reps,
      restTime,
      duration,
      activityLevel,
      weightGoal,
    });
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExercise = await Exercise.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json(updatedExercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findByIdAndDelete(id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createExercise,
  getAllExercises,
  updateExercise,
  deleteExercise,
};
