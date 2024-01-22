const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloudinary_API_KEY,
    api_secret: process.env.Cloudinary_API_SECRET
});

// exports.uploads = (file, folder) => {
//     return new Promise(resolve => {
//       cloudinary.uploader.upload(file, (result) => {
//         resolve({
//           url: result.url,
//           id: result.public_id
//         })
//       }, {
//           resource_type: "auto",
//           folder:folder
//       })
//     })
//   }

  module.exports = cloudinary;