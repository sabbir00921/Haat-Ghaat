const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    categoryId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("SubCategory", subCategorySchema);
