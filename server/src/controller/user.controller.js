const { apiResponse } = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { customError } = require("../utils/customError");
const userModel = require("../model/user.model");
const crypto = require("crypto");
const {
  verifyEmailTemplate,
  passwordResetOtpTemplate,
} = require("../templates/emailtemplate");
const { mailer } = require("../helper/nodemailer");
const { uploadCloudinary } = require("../helper/cloudinary");
const jwt = require("jsonwebtoken");

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email) {
    throw new customError(401, "Name and email are required.");
  }

  const user = new userModel({ name, email, password });
  const otp = crypto.randomInt(1000, 9999);
  user.emailVerificationOTP = otp;
  user.emailVerificationOTPExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  // verify email logic can be added here
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?userId=${user._id}&otp=${otp}`;
  const emailTemplate = verifyEmailTemplate(
    user.name,
    user.email,
    otp,
    verifyUrl
  );

  const sentMail = mailer("Verify your Account", emailTemplate, user.email);

  // Here you would typically add code to save the user to a database
  apiResponse.success(res, 201, "User created successfully", user);
});

// verify email
exports.verifyEmail = asyncHandler(async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    throw new customError(401, "User ID and OTP are required.");
  }
  const user = await userModel.findById(userId);
  if (!user) throw new customError(404, "User not found.");
  if (user.isVerified) throw new customError(400, "Email is already verified.");

  if (user.emailVerificationOTP !== otp) {
    throw new customError(400, "Invalid OTP.");
  }
  if (user.emailVerificationOTPExpires < Date.now()) {
    throw new customError(400, "OTP has expired.");
  }
  user.isVerified = true;
  user.emailVerificationOTP = null;
  user.emailVerificationOTPExpires = null;
  await user.save();
  apiResponse.success(res, 200, "Email verified successfully", user);
});

// login user
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new customError(401, "Email and password are required.");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new customError(401, "Invalid email or password.");
  }
  if (!user.isAccountActive()) {
    throw new customError(
      403,
      `Your account is ${user.accountStatus}. Please contact support.`
    );
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new customError(401, "Invalid email or password.");
  }
  // generate refresh token and save to user model
  user.refreshToken = user.generateRefreshToken();
  user.lastLogin = Date.now();
  await user.save();

  // Generate access token and send to client
  const accessToken = user.generateAccessToken();

  // save cookie
  const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  };

  res.cookie("accessToken", accessToken, cookieOption);
  res.cookie("refreshToken", user.refreshToken, cookieOption);

  apiResponse.success(res, 200, "User logged in successfully", {
    email,
    accessToken,
  });
});

// update user image
exports.updateUserImage = asyncHandler(async (req, res) => {
  const { image } = req?.files;
  const userId = req.user;
  if (!image) throw new customError(401, "Image not found");
  const user = await userModel.findOne({ _id: userId });

  const imageAsset = await uploadCloudinary(image[0].path);
  if (!imageAsset) throw new customError(401, "Image upload filed");
  user.image = imageAsset;
  console.log(imageAsset);

  await user.save();
  apiResponse.success(res, 201, "Profile image uploded succesfully", user);
});

// update user details
exports.updateUserdetails = asyncHandler(async (req, res) => {
  const userId = req.user;
  const { name, phone, address } = req.body;
  const user = await userModel.findOneAndUpdate(
    { _id: userId },
    {
      ...(name && { name: name }),
      ...(phone && { phone: phone }),
      ...(address && { address: address }),
    },
    { new: true }
  );

  apiResponse.success(res, 201, "Profile details uploded succesfully", user);
});

// logout user
exports.logoutUser = asyncHandler(async (req, res) => {
  const id = req.user;

  const user = await userModel.findOne({ _id: id });
  if (!user) {
    throw new customError(400, "Invalid refresh token.");
  }
  user.refreshToken = null;
  await user.save();
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  apiResponse.success(res, 200, "User logged out successfully");
});

// Forget password
exports.forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) throw new customError(401, "User not found");

  //  sent otp for password reset
  const otp = crypto.randomInt(1000, 9999);
  user.forgotPasswordOtp = otp;
  user.forgotPasswordOtpExpiry = Date.now() + 2 * 60 * 1000;
  await user.save();

  // verify email logic can be added here
  const resetPasswordTemplate = passwordResetOtpTemplate(
    user.name,
    user.forgotPasswordOtp
  );

  const sentOtp = await mailer(
    "Otp for reset password",
    resetPasswordTemplate,
    user.email
  );

  await user.save();
  apiResponse.success(
    res,
    201,
    "Password reset otp sent successfull",
    user.name
  );
});
// reset password
exports.resetPassword = asyncHandler(async (req, res) => {
  const { email, password, otp } = req.body;
  console.log(email);
  const user = await userModel.findOne({ email: email });
  if (!user) throw new customError(401, "User not found");

  if (user.forgotPasswordOtp !== otp) {
    throw new customError(400, "Invalid OTP.");
  }
  if (user.forgotPasswordOtpExpiry < Date.now()) {
    throw new customError(400, "OTP has expired.");
  }
  const isSamePassword = await user.comparePassword(password);
  if (isSamePassword) throw new customError(401, "New password cannot be old");
  user.password = password;
  user.forgotPasswordOtp = null;
  user.forgotPasswordOtpExpiry = null;
  await user.save();
  apiResponse.success(res, 201, "Password reset successfull", user.name);
});

// refresh token controller
exports.refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throw new customError(401, "Invalid token");

  const verifyToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  if (!refreshToken) throw new customError(401, "Token expired");
  const userId = verifyToken?.id;
  const user = await userModel.findOne({ _id: userId });

  // Generate access token and send to client
  const accessToken = user.generateAccessToken();

  // save cookie
  const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  };

  res.cookie("accessToken", accessToken, cookieOption);

  apiResponse.success(res, 201, "New access Token is generated", {
    accessToken,
  });
});
