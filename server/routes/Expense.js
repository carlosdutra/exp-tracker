const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middlewares/auth");
const router = new express.Router();

router.post("/create", auth, async (req, res) => {
	const expense = new Expense({
		...req.body,
		expenseOwner: req.user._id,
	});

	try {
		await expense.save();
		res.send("Data was saved successfully");
	} catch (err) {
		res.sendStatus(400).send(err);
	}
});

router.get("/read", auth, async (req, res) => {
	try {
		const expenses = await Expense.find({ expenseOwner: req.user._id });
		res.send(expenses);
	} catch (err) {
		res.sendStatus(400).send(err);
	}
});

router.put("/update", auth, async (req, res) => {
	const expenseId = req.body.id;
	const expenseName = req.body.newName;
	const expenseValue = req.body.newValue;
	const expenseDate = req.body.newDate;
	const expenseCategory = req.body.newCategory;

	try {
		await Expense.findById(expenseId, (err, updatedExpense) => {
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

router.delete("/delete/:id", auth, async (req, res) => {
	const id = req.params.id;
	await Expense.findByIdAndRemove(id).exec();
	res.send("Data was deleted successfully");
});

module.exports = router;
