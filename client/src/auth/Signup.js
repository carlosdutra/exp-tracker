import { useState } from "react";
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

async function registerUser(credentials) {
	return fetch(`${process.env.REACT_APP_URL}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	}).then((data) => data.json());
}

const Signup = () => {
	const { setUser } = useUser();
	const { token, setToken } = useToken();

	const history = useHistory();

	// Credentials state
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});

	// Error state
	const [error, setError] = useState("");

	// Deconstruct email and password
	const { name, email, password, password2 } = credentials;

	// Redirect user to dashboard if alrady logged in
	if (token) history.push("/");

	// Login user
	const handleLogin = async (event) => {
		event.preventDefault();

		if (password !== password2) {
			setError("Password does not match");
		} else if (password.length < 6) {
			setError("Your password must be at least 6 characters");
		} else {
			const request = await registerUser({
				name,
				email,
				password,
			});
			if (request) {
				setUser(request.user);
				setToken(request.token);
				history.push("/");
			} else {
				setError("Unable to register");
			}
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
					Create your account
				</Heading>
				<form onSubmit={handleLogin}>
					<TextInputField
						type="text"
						name="name"
						label="Name"
						placeholder="Name"
						value={name}
						onChange={handleInputChange}
						required
					/>
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
					<TextInputField
						type="password"
						name="password2"
						label="Confirm you password"
						placeholder="***********"
						value={password2}
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
					>
						Signup
					</Button>
				</form>

				{error ? (
					<Pane marginTop={20}>
						<Alert intent="danger" title={error} />
					</Pane>
				) : (
					""
				)}
			</Pane>
		</Pane>
	);
};

export default Signup;
