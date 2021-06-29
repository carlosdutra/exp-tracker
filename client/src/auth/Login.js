import React, { useState } from "react";
import {
	Button,
	Pane,
	Heading,
	Paragraph,
	TextInputField,
	Alert,
} from "evergreen-ui";
import { useHistory } from "react-router-dom";
import useToken from "./Token";
import useUser from "./User";
import { Link } from "react-router-dom";

async function loginUser(credentials) {
	return fetch(`${process.env.REACT_APP_URL}/users/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	}).then((data) => data.json());
}

const Login = () => {
	const { setUser } = useUser();
	const { token, setToken } = useToken();

	const history = useHistory();

	// Credentials state
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	// Loading state
	const [loading, setLoading] = useState(false);

	// Error state
	const [error, setError] = useState("");

	// Deconstruct email and password
	const { email, password } = credentials;

	// Redirect user to dashboard if alrady logged in
	if (token) history.push("/");

	// Login user
	const handleLogin = async (event) => {
		event.preventDefault();

		const request = await loginUser({
			email,
			password,
		});

		if (request) {
			setLoading(true);
			setUser(request.user);
			setToken(request.token);
			history.push("/");
		} else {
			setError("Unable to login");
		}
	};

	// Handle login form
	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setCredentials((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<Pane className="flex items-center justify-center h-screen">
			<Pane width={500}>
				<Heading size={900} marginBottom={20}>
					Log in to ExpTracker
				</Heading>
				<form onSubmit={handleLogin}>
					<TextInputField
						type="text"
						name="email"
						label="Email Address"
						placeholder="Email"
						value={email}
						onChange={handleInputChange}
						required
					/>
					<TextInputField
						type="password"
						name="password"
						label="Password"
						placeholder="***********"
						value={password}
						onChange={handleInputChange}
						required
					/>
					<Button
						type="submit"
						appearance="primary"
						intent="success"
						height={48}
						width="100%"
						backgroundColor="#5f9578"
						isLoading={loading}
					>
						Login
					</Button>
				</form>
				<Pane className="text-center m-5">
					<Paragraph>
						Don't have an account? <Link to="/register">Sign up</Link>
					</Paragraph>
				</Pane>
				{error ? (
					<Pane>
						<Alert intent="danger" title={error} />
					</Pane>
				) : (
					""
				)}
			</Pane>
		</Pane>
	);
};

export default Login;
