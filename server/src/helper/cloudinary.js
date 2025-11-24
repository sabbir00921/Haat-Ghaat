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
exports.uploadCloudinary = async (filePath) => {
  try {
    console.log(filePath);

    if (!filePath || !fs.existsSync(filePath)) {
      throw new customError(401, "image path missing");
    }
    // save in cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      quality: "auto",
    });
    // Delete image from our server
    if (cloudinaryResponse) {
      fs.unlinkSync(filePath);
    }

    return {
      public_id: cloudinaryResponse.public_id,
      secure_url: cloudinaryResponse.secure_url,
    };
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new customError(500, "Failed to upload image" + error.messsage);
  }
};
