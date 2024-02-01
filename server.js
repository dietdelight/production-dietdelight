const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

//DOTENV
dotenv.config();

//MongoDB connection
connectDB();

// Rest objects
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
app.use("/api/v1/auth", require("./routes/userRoutes"));

app.use("/api/v1/exercises", require("./routes/exerciseRoutes"));

app.use("/api/v1/foodDiaries", require("./routes/foodDiaryRoutes"));

app.use("/api/v1/communityRecipes", require("./routes/communityRecipesRoutes"));

// In your server setup or a separate scheduler file
const cron = require("node-cron");
const { resetDailyProgress } = require("./controllers/userController");

// Schedule a task to run at midnight every day
cron.schedule("0 0 * * *", () => {
  resetDailyProgress();
});

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`.bgGreen.white);
});
