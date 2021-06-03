import crypto from "crypto";
import multer from "multer";
import path from "path";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export const upload = multer({
  dest: tmpFolder,
  storage: multer.diskStorage({
    filename(_, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
});
