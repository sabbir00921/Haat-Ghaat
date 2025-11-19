const express = require("express");
const _ = express.Router();
const userController = require("../../controller/user.controller");
const { authGuard } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/multer.middleware");

// Sample route
_.route("/create-user").post(userController.createUser);
_.route("/user-login").post(userController.loginUser);
_.route("/user-verify").post(userController.verifyEmail);
_.route("/update-image").put(
  authGuard,
  upload.fields([{ name: "image", maxCount: 1 }]),
  userController.updateUserImage
);
_.route("/update-detail").put(authGuard, userController.updateUserdetails);
_.route("/user-logout").post(authGuard, userController.logoutUser);
_.route("/forget-password").post(userController.forgetPassword);
_.route("/reset-password").post(userController.resetPassword);
_.route("/refreshtoken-handler").post(userController.refreshToken);

module.exports = _;
