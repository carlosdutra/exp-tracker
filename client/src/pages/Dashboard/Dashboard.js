import { useEffect, useState } from "react";
import Sidenav from "components/SideNav";
import TopMenu from "components/TopMenu";
import ListExpenses from "components/ListExpenses";
import { Pane } from "evergreen-ui";
import useToken from "auth/Token";
import useUser from "auth/User";
import { Redirect } from "react-router-dom";
import Axios from "axios";

const Dashboard = () => {
	const { token } = useToken();
	const { user } = useUser();
	const { name, email } = user;

	if (!token) return <Redirect to="/login" />;

	console.log("Dashboard");

	return (
		<div className="flex min-h-screen">
			<Sidenav />
			<Pane
				paddingLeft={100}
				paddingRight={50}
				paddingTop={20}
				className="w-full"
			>
				<TopMenu name={name} email={email} />
				<ListExpenses />
			</Pane>
		</div>
	);
};

export default Dashboard;
