const moongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { customError } = require("../utils/customError");
const Schema = moongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: null,
    },
    image: {},
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    accountStatus: {
      type: String,
      enum: ["active", "suspended", "inactive"],
      default: "active",
    },
    address: [
      {
        type: moongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    shoppinCart: [
      {
        type: moongoose.Schema.Types.ObjectId,
        ref: "ShoppingCart",
      },
    ],
    orders: [
      {
        type: moongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    emailVerificationOTP: {
      type: String,
      default: null,
    },
    emailVerificationOTPExpires: {
      type: Date,
      default: null,
    },
    forgotPasswordOtp: {
      type: String,
      default: null,
    },
    forgotPasswordOtpExpiry: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
  },
  { timestamps: true }
);

// CHECK user already exists
userSchema.pre("save", async function (next) {
  const user = this;
  const existingUser = await moongoose.models.User.findOne({
    email: user.email,
  });
  if (existingUser && existingUser._id.toString() !== user._id.toString()) {
    throw new customError(401, "User already exists with this email.");
  }
  next();
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bycrypt.hash(user.password, 10);
  }
  next();
});

// login only accountStatus active
userSchema.methods.isAccountActive = function () {
  return this.accountStatus === "active";
};

// compare human password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bycrypt.compare(candidatePassword, this.password);
};

// generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

// verify access token
userSchema.statics.verifyAccessToken = function (token) {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

// verify refresh token
userSchema.statics.verifyRefreshToken = function (token) {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = moongoose.model("User", userSchema);
