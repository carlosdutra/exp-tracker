const dotenv = require("dotenv-flow");
dotenv.config();
module.exports = {
	masterKey: process.env.API_KEY,
	dbname: process.env.DBNAME,
	port: process.env.PORT || 3001,
	origin: process.env.ORIGIN,
};
