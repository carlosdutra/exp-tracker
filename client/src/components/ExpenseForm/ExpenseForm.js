import { useState } from "react";
import { Button, Pane, TextInputField } from "evergreen-ui";
import TextCurrencyField from "ui/TextCurrencyField";
import { format } from "date-fns";
import "./ExpenseForm.css";
import SelectCategoryField from "ui/SelectCategoryField";
import currency from "currency.js";

const ExpenseForm = (props) => {
	// Form state
	const [expense, setExpense] = useState({
		expenseName: props.name || "",
		expenseValue: props.value || "",
		expenseDate: props.date || "",
		expenseCategory: props.category || "",
	});

	// Destructuring the expense state
	const { expenseName, expenseValue, expenseDate, expenseCategory } = expense;

	// Send data
	const handleOnSubmit = (event) => {
		event.preventDefault();

		// Group data into object
		const expense = {
			expenseName,
			expenseValue: currency(expenseValue).value,
			expenseDate: new Date(expenseDate.replace(/-/g, "/")).toISOString(),
			expenseCategory,
		};

		// Sent data via props
		props.handleOnSubmit(expense);

		// Close the dialog
		props.setIsShown(false);

		// Clear form after submit
		setExpense({
			expenseName: "",
			expenseValue: "",
			expenseDate: "",
			expenseCategory: "",
		});
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setExpense((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<form onSubmit={handleOnSubmit}>
			<TextInputField
				type="text"
				label="What is the name of the expense?"
				description="Please provide a short title for your expense"
				placeholder="E.g. car insurance, phone bill..."
				name="expenseName"
				value={expenseName}
				onChange={handleInputChange}
				required
				marginBottom={8}
			/>

			<Pane marginBottom={8}>
				<Pane marginBottom={8}>
					<label className="form__label">
						How much was your expense? *
					</label>
					<p className="form__description">
						Please provide the value of the expense
					</p>
				</Pane>
				<TextCurrencyField
					name="expenseValue"
					value={expenseValue}
					onChange={handleInputChange}
				/>
			</Pane>

			<TextInputField
				type="date"
				label="When did it happen?"
				description="Please provide a date for your expense"
				name="expenseDate"
				max={format(new Date(), "yyyy-MM-dd")}
				value={expenseDate}
				onChange={handleInputChange}
				required
			/>

			<SelectCategoryField
				name="expenseCategory"
				label="Which category your expense belongs to?"
				description="Please provide a category for your expense"
				value={expenseCategory}
				onChange={handleInputChange}
			/>

			<Pane textAlign="right">
				<Button
					type="button"
					intent="danger"
					onClick={() => props.setIsShown(false)}
					marginRight={4}
				>
					Cancel
				</Button>
				<Button type="submit" appearance="primary">
					Add
				</Button>
			</Pane>
		</form>
	);
};

export default ExpenseForm;
