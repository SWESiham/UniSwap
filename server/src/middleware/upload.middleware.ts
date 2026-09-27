import multer from "multer";

// Memory storage: buffer goes straight to Cloudinary in the service layer,
// nothing touches disk.
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
