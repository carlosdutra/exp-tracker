const { origin } = require("../config");

const cors = require("cors");

const options = {
	origin: (o, callback) => {
		console.log("Origin: ", origin, o);
		if (o === origin) {
			return callback(null, true);
		}
		return callback(null, false);
	},
	crendentials: false,
};

module.exports = (server) => {
	server.use(cors(options));
};
