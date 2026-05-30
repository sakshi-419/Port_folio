const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createStorage = (folder, resourceType = 'auto') => {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `portfolio-cms/${folder}`,
      resource_type: resourceType,
      allowed_formats: resourceType === 'raw' ? ['pdf'] : ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    },
  });
};

const imageUpload = multer({ storage: createStorage('images') });
const pdfUpload = multer({ storage: createStorage('resumes', 'raw') });
const thumbnailUpload = multer({ storage: createStorage('thumbnails') });

module.exports = { cloudinary, imageUpload, pdfUpload, thumbnailUpload };
