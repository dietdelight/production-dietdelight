const mongoose = require("mongoose");

const communityRecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: String,
  instructions: String,
  category: String,
  prepTime: Number, // in minutes
  difficulty: String,
});

const CommunityRecipe = mongoose.model(
  "CommunityRecipe",
  communityRecipeSchema
);

module.exports = CommunityRecipe;
