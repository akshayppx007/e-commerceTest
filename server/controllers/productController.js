const Product = require("../models/product");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Create a new product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, description, price, stock, imageFile } = req.body;

  if (!name || !description || !price || !stock || !imageFile) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const existingProduct = await Product.findOne({name});

  if (existingProduct) {
    return next(new ErrorHandler("product already exists", 400));
  }


  const imageData =  Buffer.from(imageFile, "base64");

  let uploadedImage;

  const tempFilePath = path.join(
    __dirname,
    "../..",
    `client/src/assets/img/${name}`
  );

  fs.writeFileSync(tempFilePath, imageData);

  const result = await cloudinary.uploader.upload(tempFilePath, {
    upload_preset: "test123",
    resource_type: "raw" || "image",
    folder: "image",
    format: "jpg"
  });

  fs.unlinkSync(tempFilePath);

  uploadedImage =result.secure_url;

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    image: uploadedImage,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

// get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

