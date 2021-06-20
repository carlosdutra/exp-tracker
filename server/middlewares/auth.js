const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const { jwt_secret } = require("../config");

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decoded = jwt.verify(token, jwt_secret);

		const user = await User.findOne({
			_id: decoded._id,
			"tokens.token": token,
		});

		if (!user) throw new Error();

		req.token = token;
		req.user = user;
		next();
	} catch (err) {
		console.log(err);
		res.sendStatus(401).send({ error: "Please authenticate." });
	}
};

module.exports = auth;
