const Expenses = require("../model/expenses");

exports.postAddExpense = async (req, res) => {
  try {
    const expense = req.body.amount;
    const desc = req.body.description;
    const categ = req.body.category;
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
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expenses.findByPk(id);
    console.log(expense);
    const result = await expense.destroy();
    res.status(200).json({ res: result });
  } catch (err) {
    res.status(500).json(err);
  }
};
