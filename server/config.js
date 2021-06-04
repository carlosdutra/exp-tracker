const dotenv = require("dotenv");
dotenv.config();
module.exports = {
	masterKey: process.env.API_KEY,
	dbname: process.env.DBNAME,
	port: process.env.PORT,
};
