// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     cb(null, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/webp" // Allow .webp format
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Unsupported file format"), false);
//   }
// };

// const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 }, // 1MB limit for file size
//   fileFilter,
// });

// export default upload;
import multer from "multer";
import path from "path";

// Set the storage configuration to store files locally
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the uploads folder as the destination
    cb(null, path.join(process.cwd(), "uploads")); // Use process.cwd() to get the root directory
  },
  filename: function (req, file, cb) {
    // Generate a unique file name with the current timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File type filter (Only allow images)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

// Set up multer upload with storage and fileFilter options
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 }, // Limit to 1MB per file
  fileFilter,
});

export default upload;
