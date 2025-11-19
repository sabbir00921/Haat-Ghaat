const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderId: {
      type: String,
      required: [true, "Order ID is required"],
      unique: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    productsdetails: {
      name: String,
      image: [],
    },
    paymenId: {
      type: String,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "",
    },
    deveryaddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    subTotal: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    invoice: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
