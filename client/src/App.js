// import { useState } from "react";
import Dashboard from "pages/Dashboard";
import Signup from "auth/Signup";
import Login from "auth/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import AuthContext from "./contexts/AuthContext";
// import useToken from "auth/Token"
import "./App.css";

function App() {
	// const [user, setUser] = useState(null);
	// const { token, setToken } = useToken();

	return (
		// <AuthContext.Provider value={{ user, setUser }}>
		<Router>
			<div className="App">
				<Route exact path="/" component={Dashboard} />
				<Route exact path="/register" component={Signup} />
				<Route exact path="/login" component={Login} />
			</div>
		</Router>
		// </AuthContext.Provider>
	);
}

export default App;
