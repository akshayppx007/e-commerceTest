const app = require("./app");
const connectDatabase = require("./config/database");


// Connect to database
connectDatabase();

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`);
});
