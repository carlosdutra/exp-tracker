const port = process.env.PORT || 3001;
const { masterKey, dbname } = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const ExpenseModel = require("./models/Expense");

app.use(express.json());
app.use(cors());

mongoose.connect(
	`mongodb+srv://${dbname}:${masterKey}@cluster0.uxs3b.mongodb.net/${dbname}?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

app.post("/create", async (req, res) => {
	const expenseRequest = req.body;

	const expenseName = expenseRequest.expenseName;
	const expenseValue = expenseRequest.expenseValue;
	const expenseDate = expenseRequest.expenseDate;
	const expenseCategory = expenseRequest.expenseCategory;

	const expense = new ExpenseModel({
		expenseName: expenseName,
		expenseValue: expenseValue,
		expenseDate: expenseDate,
		expenseCategory: expenseCategory,
	});

	try {
		await expense.save();
		res.send("Data was saved successfully");
	} catch (err) {
		console.log(err);
	}
});

app.get("/read", async (req, res) => {
	ExpenseModel.find({}, (err, result) => {
		if (err) res.send(err);
		res.send(result);
	});
});

app.put("/update", async (req, res) => {
	const expenseId = req.body.id;
	const expenseName = req.body.newName;
	const expenseValue = req.body.newValue;
	const expenseDate = req.body.newDate;
	const expenseCategory = req.body.newCategory;

	try {
		await ExpenseModel.findById(expenseId, (err, updatedExpense) => {
			updatedExpense.expenseName = expenseName;
			updatedExpense.expenseValue = expenseValue;
			updatedExpense.expenseDate = expenseDate;
			updatedExpense.expenseCategory = expenseCategory;

			updatedExpense.save();
			res.send("Data was updated successfully");
		});
	} catch (err) {
		console.log(err);
	}
});

app.delete("/delete/:id", async (req, res) => {
	const id = req.params.id;
	await ExpenseModel.findByIdAndRemove(id).exec();
	res.send("Data was deleted successfully");
});

app.listen(port, () => {
	console.log(`Server running on ${port}`);
});
