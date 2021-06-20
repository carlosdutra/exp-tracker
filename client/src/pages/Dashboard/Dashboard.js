import React, { useState } from "react";
import Sidenav from "components/SideNav";
import TopMenu from "components/TopMenu";
import ListExpenses from "components/ListExpenses";
import { Pane } from "evergreen-ui";
import useToken from "auth/Token";
import useUser from "auth/User";
import { Redirect } from "react-router-dom";

const Dashboard = () => {
	const { token } = useToken();
	const { user } = useUser();

	const [userInfo, setUserInfo] = useState(user);

	if (!token) return <Redirect to="/login" />;

	return (
		<div className="flex min-h-screen">
			<Sidenav />
			<Pane
				paddingLeft={50}
				paddingRight={50}
				paddingTop={20}
				className="w-full"
			>
				<TopMenu name={userInfo.name} email={userInfo.email} />
				<ListExpenses />
			</Pane>
		</div>
	);
};

export default Dashboard;
