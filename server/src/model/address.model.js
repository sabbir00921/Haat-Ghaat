const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addressSchema = new Schema(
  {
    address_line1: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip_code: {
      type: String,
    },
    country: {
      type: String,
      default: "BANGLADESH",
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Address", addressSchema);
