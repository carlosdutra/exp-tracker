const { port } = require("./config");
const express = require("express");
const expenseRouter = require("./routes/Expense");
const userRouter = require("./routes/Users");
const useCors = require("./middlewares/cors");

// DB
require("./db/mongoose");

const app = express();

// Use JSON
app.use(express.json());

// CORS
useCors(app);

// Routes
app.use(expenseRouter);
app.use(userRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
