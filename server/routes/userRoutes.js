const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { getUserProfileLogin, logoutUser, loginUser, registerUser } = require("../controllers/userConrtroller");

const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/user/me").get(isAuthenticatedUser, getUserProfileLogin);

module.exports = router;
