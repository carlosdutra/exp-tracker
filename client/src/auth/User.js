import { useState } from "react";

export default function useUser() {
	const getUser = () => {
		const userString = sessionStorage.getItem("user");
		const userInfo = JSON.parse(userString);
		return userInfo;
	};

	const [user, setUser] = useState(getUser());

	const saveUser = (userInfo) => {
		sessionStorage.setItem("user", JSON.stringify(userInfo));
		setUser(userInfo);
	};

	return {
		setUser: saveUser,
		user,
	};
}
