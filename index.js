const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const expenseRouter = require("./router/expenses");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", expenseRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
