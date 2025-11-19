const { connectDB } = require("./src/database/db");
const app = require("./src/app");
const chalk = require("chalk");
require("dotenv").config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        chalk.bgGreenBright(
          `Server is running on port http://localhost:${
            process.env.PORT || 3000
          }`
        )
      );
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
