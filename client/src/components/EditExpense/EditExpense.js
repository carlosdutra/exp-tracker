import { useState } from "react";
import { Dialog, IconButton, EditIcon, toaster } from "evergreen-ui";
import ExpenseForm from "components/ExpenseForm";
import { format } from "date-fns";
import Axios from "axios";

const EditExpense = (props) => {
	const [isShown, setIsShown] = useState(false);

	const handleOnSubmit = (expense) => {
		Axios.put(`${process.env.REACT_API_URL}/update`, {
			id: props.id,
			newName: expense.expenseName,
			newValue: expense.expenseValue,
			newDate: expense.expenseDate,
			newCategory: expense.expenseCategory,
		});
		toaster.notify(`${props.name} was updated successfully`);
	};

	return (
		<>
			<IconButton
				icon={EditIcon}
				appearance="minimal"
				onClick={() => setIsShown(true)}
			/>
			<Dialog
				isShown={isShown}
				title={props.name}
				onCloseComplete={() => setIsShown(false)}
				hasFooter={false}
			>
				<ExpenseForm
					handleOnSubmit={handleOnSubmit}
					id={props.id}
					name={props.name}
					value={props.value}
					date={format(new Date(props.date), "yyyy-MM-dd")}
					category={props.category}
					setIsShown={setIsShown}
				/>
			</Dialog>
		</>
	);
};

export default EditExpense;
