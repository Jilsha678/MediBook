import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure "uploads/" folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/"); // Set destination folder
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });
export default upload;
