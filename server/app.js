const express = require("express");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// routes
const user = require("./routes/userRoutes");
const product = require("./routes/productRoutes")
const cart = require("./routes/cartRoutes")


// routes middleware

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", cart);


// error middleware
app.use(errorMiddleware);

module.exports = app;
