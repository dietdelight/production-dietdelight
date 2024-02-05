const mongoose = require("mongoose");

const foodDiarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  mealType: String,
  quantity: Number,
  calories: Number,
  notes: String,
  user: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId for referencing User model
    ref: "User", // Refer to the User model
    required: true,
  },
});

const FoodDiary = mongoose.model("FoodDiary", foodDiarySchema);

module.exports = FoodDiary;
