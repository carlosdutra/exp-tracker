const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
	userFullName: {
		type: String,
		required: true,
	},
	userEmail: {
		type: String,
		required: true,
	},
	userUserName: {
		type: String,
		required: false,
	},
	userPassword: {
		type: String,
		required: true,
	},
});

const Users = mongoose.model("Users", UsersSchema, "users");
module.exports = Users;
