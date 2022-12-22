const chalk = require("chalk");

const mongoose = require("mongoose");

const app = require("./app");

const { PORT, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.blue("Database connection successful!"));
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit();
  });
