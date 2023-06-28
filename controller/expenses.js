const Expenses = require("../model/expenses");

exports.postAddExpense = async (req, res) => {
  try {
    const expense = req.body.expense;
    const desc = req.body.desc;
    const categ = req.body.categ;
    const exp = await Expenses.create({
      amount: expense,
      description: desc,
      category: categ,
    });
    res.status(200).json({ expenseData: exp });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await Expenses.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json(err);
  }
};
