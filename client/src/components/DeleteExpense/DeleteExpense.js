import { useState } from "react";
import { Dialog, IconButton, TrashIcon, toaster } from "evergreen-ui";
import Axios from "axios";
import useToken from "auth/Token";

const DeleteExpense = ({ id, name }) => {
	const [isShown, setIsShown] = useState(false);
	const { token } = useToken();

	const deleteExpense = (id) => {
		Axios.delete(`${process.env.REACT_APP_URL}/delete/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
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
