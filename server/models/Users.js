const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");
const Expense = require("./Expense");

const UsersSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		match: /.+\@.+\..+/,
		unique: true,
		trim: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		trim: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

// User <-> Expense relationship
UsersSchema.virtual("expenses", {
	ref: "Expense",
	localField: "_id",
	foreignField: "expenseOwner",
});

UsersSchema.methods.toJSON = function () {
	const userObject = this.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

UsersSchema.methods.generateAuthToken = async function () {
	const token = jwt.sign({ _id: this._id.toString() }, jwt_secret);
	this.tokens = this.tokens.concat({ token });
	await this.save();

	return token;
};

UsersSchema.statics.findByCredentials = async (email, password) => {
	const user = await Users.findOne({ email });

	if (!user) {
		throw new Error("Unable to login");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Unable to login");
	}

	return user;
};

// Hash plain text password before saving
UsersSchema.pre("save", async function (next) {
	if (this.isModified("password"))
		this.password = await bcrypt.hash(this.password, 8);
	next();
});

UsersSchema.pre("remove", async function (next) {
	await Expense.deleteMany({ expenseOwner: this._id });
	next();
});

const Users = mongoose.model("Users", UsersSchema, "users");
module.exports = Users;
