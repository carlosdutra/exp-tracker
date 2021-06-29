import React from "react";
import AddExpense from "components/AddExpense";
import { Pane } from "evergreen-ui";

const SideNav = () => {
	return (
		<Pane
			className=""
			background="#5f9578"
			className="fixed h-full left-0 top-0 z-5"
		>
			<AddExpense />
		</Pane>
	);
};

export default SideNav;
