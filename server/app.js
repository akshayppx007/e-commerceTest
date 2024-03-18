const express = require("express");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const errorMiddleware = require("./middlewares/error");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// serve static files
app.use(express.static(path.join(__dirname, "../client/dist")));

// routes
const user = require("./routes/userRoutes");
const product = require("./routes/productRoutes")
const cart = require("./routes/cartRoutes")


// routes middleware

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", cart);

// Catch-all route to serve the React app
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// error middleware
app.use(errorMiddleware);

module.exports = app;
