const mongoose = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();
exports.connectDB = async () => {
  try {
    const dbInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      chalk.bgYellowBright(
        `MongoDB connected successfully ${dbInstance.connection.host}`
      )
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
