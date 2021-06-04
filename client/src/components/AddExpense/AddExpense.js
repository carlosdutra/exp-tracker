import { useState, useContext } from "react";
import ExpenseForm from "components/ExpenseForm";
import { Dialog, Pane, PlusIcon, Tooltip, Position } from "evergreen-ui";
// import ExpenseFormContext from "contexts/ExpenseFormContext";
import Axios from "axios";
import "./AddExpense.css";

const AddExpense = () => {
	const [isShown, setIsShown] = useState(false);

	const handleOnSubmit = (expense) => {
		Axios.post(`${process.env.REACT_API_URL}/create`, expense);
	};

	return (
		<>
			<Pane>
				<Tooltip content="Add new expense" position={Position.RIGHT}>
					<button
						onClick={() => setIsShown(true)}
						className="add-expense-btn border-0 rounded-full cursor-pointer shadow-lg"
					>
						<PlusIcon size={40} />
					</button>
				</Tooltip>
			</Pane>
			<Dialog
				isShown={isShown}
				title="Add a new expense"
				onCloseComplete={() => setIsShown(false)}
				hasFooter={false}
			>
				<ExpenseForm
					handleOnSubmit={handleOnSubmit}
					setIsShown={setIsShown}
				/>
			</Dialog>
		</>
	);
};

export default AddExpense;
