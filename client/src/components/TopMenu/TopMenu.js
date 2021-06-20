import React from "react";
import {
	Pane,
	Heading,
	Paragraph,
	LogOutIcon,
	Popover,
	Menu,
	Position,
	Avatar,
} from "evergreen-ui";
import Axios from "axios";
import useToken from "auth/Token";
import { useHistory } from "react-router-dom";

const TopMenu = (props) => {
	const { token } = useToken();
	const history = useHistory();

	const handleLogout = async (event) => {
		event.preventDefault();

		try {
			await Axios.post(
				`${process.env.REACT_APP_URL}/users/logout`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			sessionStorage.removeItem("user");
			sessionStorage.removeItem("token");

			history.push("/login");
		} catch (err) {
			alert(err);
		}
	};

	return (
		<Pane className="flex items-center justify-end w-full">
			<Popover
				position={Position.BOTTOM_LEFT}
				minWidth={400}
				content={
					<Menu>
						<Pane padding={28}>
							<Heading size={500}>{props.name}</Heading>
							<Paragraph>{props.email}</Paragraph>
						</Pane>
						<Menu.Group>
							<Menu.Item icon={LogOutIcon} onClick={handleLogout}>
								Log out
							</Menu.Item>
						</Menu.Group>
						<Menu.Divider />
					</Menu>
				}
			>
				<Avatar name={props.name} size={40} cursor="pointer" />
			</Popover>
		</Pane>
	);
};

export default TopMenu;
