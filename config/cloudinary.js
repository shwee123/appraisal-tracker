const cloudinary = require('cloudinary').v2;
require('dotenv').config();

console.log("okkkkk")
cloudinary.config({
  cloud_name: "dpjoxqisl",
  api_key: "292199526794599",
  api_secret:"KKZHWhEwjA1Q0zUx4gVfcsvcVRY",
});

module.exports = cloudinary;
