const { user, masterKey, cluster, dbname } = require("../config");
const mongoose = require("mongoose");

// DB Config
const db = `mongodb+srv://${user}:${masterKey}@${cluster}/${dbname}?retryWrites=true&w=majority`;

// Connect to Mongo
mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
