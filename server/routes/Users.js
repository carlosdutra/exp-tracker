const express = require("express");
const User = require("../models/Users");
const auth = require("../middlewares/auth");
const { user } = require("../config");
const router = new express.Router();

router.post("/users", async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post("/users/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (err) {
		res.sendStatus(400).send("Unable to authenticate");
	}
});

router.post("/users/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});

		await req.user.save();
		res.send("User was logged out");
	} catch (err) {
		res.sendStatus(500).send();
	}
});

router.post("/users/logoutall", auth, async (req, res) => {
	try {
		req.user.tokens = [];

		await req.user.save();
		res.send("User was logged out from all sessions");
	} catch (err) {
		res.sendStatus(500).send();
	}
});

router.get("/users/me", auth, async (req, res) => {
	res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "email", "password"];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation)
		return res.sendStatus(400).send({ error: "Invalid updates!" });

	try {
		const user = req.user;

		updates.forEach((update) => (user[update] = req.body[update]));
		await user.save();
		res.send(user);
	} catch (err) {
		res.sendStatus(400).send(err);
	}
});

router.delete("/users/me", auth, async (req, res) => {
	try {
		await req.user.remove();
		res.send("User deleted successfully");
	} catch (err) {
		res.sendStatus(500).send();
	}
});

module.exports = router;
