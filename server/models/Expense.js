const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema({
	expenseName: {
		type: String,
		required: true,
	},
	expenseValue: {
		type: Number,
		required: true,
	},
	expenseDate: {
		type: String,
		required: true,
	},
	expenseCategory: {
		type: String,
	},
	expenseOwner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Users",
	},
});

const Expense = mongoose.model("Expense", ExpenseSchema, "expenses");
module.exports = Expense;
