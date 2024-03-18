const Cart = require("../models/cart");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// add to cart
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const { userId, productId, quantity, guestCart } = req.body;

  if (!productId) {
    const cart1 = await Cart.findOne({ userId });

    if (cart1) {
      const updatedProducts1 = [...cart1.products];

      guestCart.forEach((item) => {
        const existingItem = updatedProducts1.find((p) => {
          return p.productId.toString() === item.productId;
        });
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          updatedProducts1.push({
            productId: item.productId,
            quantity: item.quantity,
          });
        }
      });

      cart1.products = updatedProducts1;
      await cart1.save();
      res.status(200).json({ success: true, cart: cart1 });
    } else {
      const newCart1 = new Cart({
        userId,
      });
      guestCart.forEach((item) => {
        newCart1.products.push({
          productId: item.productId,
          quantity: item.quantity,
        });
      });

      await newCart1.save();
      res.status(201).json({ success: true, cart: newCart1 });
    }
  }

  if (userId && productId) {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      const updatedProducts = [...cart.products];

      const existingProduct = updatedProducts.find((item) => {
        return item.productId.toString() === productId;
      });

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        updatedProducts.push({ productId: productId, quantity });
      }

      if (guestCart) {
        guestCart.forEach((item) => {
          const existingItem = updatedProducts.find((p) => {
            return p.productId.toString() === item.productId;
          });
          if (existingItem) {
            existingItem.quantity += item.quantity;
          } else {
            updatedProducts.push({
              productId: item.productId,
              quantity: item.quantity,
            });
          }
        });
      }

      cart.products = updatedProducts;

      await cart.save();
      res.status(200).json({ success: true, cart });
    } else {
      const newCart = new Cart({
        userId,
        products: [{ productId: productId, quantity }],
      });

      if (guestCart) {
        guestCart.forEach((item) => {
          newCart.products.push({
            productId: item.productId,
            quantity: item.quantity,
          });
        });
      }

      await newCart.save();
      res.status(201).json({ success: true, cart: newCart });
    }
  }
});

// delete cart item
exports.deleteCartItem = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.body;

  const cart = await Cart.findOne({ userId });

  const item = cart.products.find((item) => {
    return item.productId === productId;
  });

  cart.products.splice(cart.products.indexOf(item), 1);
  await cart.save();

  res.status(200).json({
    success: true,
    cart,
  });
});

// get user cart
exports.getUserCart = catchAsyncErrors(async (req, res, next) => {
  const user = req.user.id;
  const cart = await Cart.find({ userId: user }).populate("products.productId");

  if (!cart) {
    return next(new ErrorHandler("no cart found"));
  }

  res.status(200).json({
    success: true,
    cart,
  });
});
