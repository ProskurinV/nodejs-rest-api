const chalk = require("chalk");

const mongoose = require("mongoose");

const app = require("./app");

const { PORT, DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose.connect(
  DB_HOST,
  console.log(chalk.blue("Database connection successful!"))
);
// .then(() => {
app.listen(PORT, () => {
  console.log(chalk.green(`Server is running, on port: ${PORT}`));
});
// })
// .catch((error) => {
//   console.log(error.message);
// process.exit();
// });
