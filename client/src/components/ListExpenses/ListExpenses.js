import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Pane, Heading, Paragraph, InfoSignIcon, Spinner } from "evergreen-ui";
import SingleExpense from "components/SingleExpense";
import useToken from "auth/Token";

const ListExpenses = () => {
	const [expenses, setExpenses] = useState([]);
	// const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const { token } = useToken();

	useEffect(() => {
		Axios.get(`${process.env.REACT_APP_URL}/read`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then(
			(response) => {
				setExpenses(response.data);
				setIsLoaded(true);
			},
			(err) => {
				setIsLoaded(true);
				// setError(err);
			}
		);
	}, [expenses]);

	// if (error) {
	// 	return <Pane>Error: {error}</Pane>;
	// } else
	if (!isLoaded) {
		return <Spinner size={48} />;
	} else {
		return (
			<Pane>
				<Heading size={600}>Your expenses ({expenses.length})</Heading>
				{expenses.length > 0 ? (
					expenses
						.sort(
							(a, b) => new Date(b.expenseDate) - new Date(a.expenseDate)
						)
						.map((expense) => (
							<SingleExpense
								key={expense._id}
								id={expense._id}
								name={expense.expenseName}
								value={expense.expenseValue}
								date={expense.expenseDate}
								category={expense.expenseCategory}
								backgroundBadge="green"
							/>
						))
				) : (
					<Pane className="p-10 my-4 text-center" background="#f8f8f8">
						<Paragraph color="#C8C8C8">
							<InfoSignIcon size={12} /> You don't have any expenses yet.
						</Paragraph>
					</Pane>
				)}
			</Pane>
		);
	}
};

export default ListExpenses;
