const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/api/users");
const currentUserRouter = require("./routes/api/currentUser");
const contactsRouter = require("./routes/api/contacts");
// const sendEmail = require("./helpers/sendEmail");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/users", currentUserRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;
