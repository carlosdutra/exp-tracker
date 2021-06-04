import { useState } from "react";
import { Dialog, IconButton, TrashIcon, toaster } from "evergreen-ui";
import Axios from "axios";

const DeleteExpense = ({ id, name }) => {
	const [isShown, setIsShown] = useState(false);

	const deleteExpense = (id) => {
		Axios.delete(`${process.env.REACT_API_URL}/delete/${id}`);
		toaster.notify("Your expense was deleted");
	};

	return (
		<>
			<Dialog
				isShown={isShown}
				title={name}
				intent="danger"
				onConfirm={() => deleteExpense(id)}
				onCloseComplete={() => setIsShown(false)}
				confirmLabel="Delete"
			>
				Are you sure you want to delete this item?
			</Dialog>
			<IconButton
				icon={TrashIcon}
				appearance="minimal"
				onClick={() => setIsShown(true)}
			/>
		</>
	);
};

export default DeleteExpense;
