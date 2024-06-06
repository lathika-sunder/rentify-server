const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "imageUploads/"); // Destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "rentify" + path.extname(file.originalname)); 
  },
});

const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
    }
  },
}).single("image"); 

module.exports = {
  uploadImage,
};
