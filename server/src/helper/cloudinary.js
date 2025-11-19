require("dotenv").config();
const cloudinary = require("cloudinary");
const fs = require("fs");
const { customError } = require("../utils/customError");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECREAT,
});

// upload cloudinary
exports.uploadCloudinary = async (filepath) => {
  try {
    if (!filepath || !fs.existsSync(filepath))
      throw new customError(401, "Image path missing");

    // save into cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(filepath, {
      resource_type: "image",
      quality: "auto",
    });

    // delete image from our local server
    if (cloudinaryResponse) {
      fs.unlinkSync(filepath);
    }

    return {
      public_id: cloudinaryResponse.public_id,
      secure_url: cloudinaryResponse.secure_url,
    };
  } catch (error) {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    throw new customError(500, "Failed to upload image" + error.messsage);
  }
};
