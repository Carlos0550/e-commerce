import multer from "multer";
import path from "path";
import fs from "fs";
//services/web/Storage-service/src/utils/SaveFilesFromRequest.ts
const uploadPath = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

const uploads = multer({ storage });

export default uploads;
