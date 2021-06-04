import React from "react";
import AddExpense from "components/AddExpense";
import { Pane } from "evergreen-ui";

const SideNav = () => {
	return (
		<Pane className="" background="#5f9578">
			<AddExpense />
		</Pane>
	);
};

export default SideNav;
