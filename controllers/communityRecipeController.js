const CommunityRecipe = require("../models/communityRecipeModal");

// Controller to create a new community exercise
const createCommunityRecipe = async (req, res) => {
  try {
    const { name, ingredients, instructions, category, prepTime, difficulty } =
      req.body;
    const newCommunityRecipe = new CommunityRecipe({
      name,
      ingredients,
      instructions,
      category,
      prepTime,
      difficulty,
    });
    await newCommunityRecipe.save();
    res.status(201).json(newCommunityRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCommunityRecipe = async (req, res) => {
  try {
    const communityRecipes = await CommunityRecipe.find();
    res.status(200).json(communityRecipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCommunityRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCommunityRecipe = await Exercise.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedCommunityRecipe) {
      return res.status(404).json({ message: "Community Recipe not found" });
    }
    res.status(200).json(updatedCommunityRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCommunityRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const communityRecipe = await Exercise.findByIdAndDelete(id);
    if (!communityRecipe) {
      return res.status(404).json({ message: "Community recipe not found" });
    }
    res.status(200).json({ message: "Community recipe deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCommunityRecipe,
  getAllCommunityRecipe,
  updateCommunityRecipe,
  deleteCommunityRecipe,
};
