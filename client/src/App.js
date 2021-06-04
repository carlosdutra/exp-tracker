import { useState } from "react";
import ListExpenses from "components/ListExpenses";
import ExpenseFormContext from "contexts/ExpenseFormContext";
import Sidenav from "components/SideNav";
import { Pane } from "evergreen-ui";
import "./App.css";

function App() {
	const [formIsVisible, setFormIsVisible] = useState(false);

	return (
		<div className="App flex min-h-screen">
			<ExpenseFormContext.Provider
				value={{ formIsVisible, setFormIsVisible }}
			>
				<Sidenav />
				<Pane padding={50} className="w-full">
					<ListExpenses />
				</Pane>
			</ExpenseFormContext.Provider>
		</div>
	);
}

export default App;
