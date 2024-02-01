const express = require("express");
const router = express.Router();
const {
  createCommunityRecipe,
  getAllCommunityRecipe,
  updateCommunityRecipe,
  deleteCommunityRecipe,
} = require("../controllers/communityRecipeController");

router.post("/create", createCommunityRecipe);

router.get("/retreive", getAllCommunityRecipe);

router.put("/update/:id", updateCommunityRecipe);

router.delete("/delete/:id", deleteCommunityRecipe);

module.exports = router;
