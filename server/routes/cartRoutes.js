const express = require("express");
const { addToCart, deleteCartItem, getUserCart } = require("../controllers/cartController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();


router.route("/cart/add").post(addToCart);
router.route("/cart/delete").put(isAuthenticatedUser, deleteCartItem);
router.route("/user/cart").get(isAuthenticatedUser, getUserCart);

module.exports = router;
