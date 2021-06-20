const dotenv = require("dotenv-flow");
dotenv.config();
module.exports = {
	user: process.env.MONGO_USER,
	masterKey: process.env.MONGO_PASS,
	dbname: process.env.MONGO_DB_NAME,
	cluster: process.env.MONGO_CLUSTER,
	port: process.env.PORT || 3001,
	origin: process.env.ORIGIN,
	jwt_secret: process.env.JWT_SECRET,
};
