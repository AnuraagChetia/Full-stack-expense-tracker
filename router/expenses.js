const express = require("express");

const router = express.Router();

const expenseController = require("../controller/expenses");

router.get("/get-expense", expenseController.getExpense);

router.post("/add-expense", expenseController.postAddExpense);

module.exports = router;
