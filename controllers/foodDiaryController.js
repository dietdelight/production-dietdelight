const FoodDiary = require("../models/foodDiaryModel");
const User = require("../models/userModel");

const createFoodDiary = async (req, res) => {
  try {
    // Fetch the user's information, including the userID, based on their authentication or session
    const userId = req.body.user; // Assuming you have user information in the request

    // Log the userID for debugging
    console.log("Received userID:", userId);

    // Create a new food diary entry with the associated userID
    const foodDiaryData = {
      name: req.body.name,
      mealType: req.body.mealType,
      quantity: req.body.quantity,
      calories: req.body.calories,
      notes: req.body.notes,
      user: userId, // Store the userID in the food diary entry
    };

    // Save the food diary entry to the database
    const foodDiaryEntry = new FoodDiary(foodDiaryData);
    await foodDiaryEntry.save();

    res.status(201).json({ success: true, data: foodDiaryEntry });
  } catch (error) {
    console.error("Error creating food diary entry:", error);
    res
      .status(500)
      .json({ success: false, message: "Error creating food diary entry" });
  }
};
// Controller to get all food diaries for a specific user
const getAllFoodDiaries = async (req, res) => {
  try {
    const foodDiaries = await FoodDiary.find();
    res.status(200).json(foodDiaries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to update a food diary entry
const updateFoodDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFoodDiary = await FoodDiary.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedFoodDiary) {
      return res.status(404).json({ message: "Food Diary not found" });
    }
    res.status(200).json(updatedFoodDiary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to delete a food diary entry
const deleteFoodDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const foodDiary = await FoodDiary.findByIdAndDelete(id);
    if (!foodDiary) {
      return res.status(404).json({ message: "Food Diary not found" });
    }
    res.status(200).json({ message: "Food Diary deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createFoodDiary,
  getAllFoodDiaries,
  updateFoodDiary,
  deleteFoodDiary,
};
