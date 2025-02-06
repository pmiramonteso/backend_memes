const util = require("util");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const maxSize = 2 * 1024 * 1024;
const uploadsDir = path.join(__dirname, '..', 'uploads'); 
// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido. Solo se permiten imágenes y PDFs."));
  }
};

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: fileFilter,
}).single("imagen");

const uploadFileMiddleware = util.promisify(uploadFile);

module.exports = { uploadFileMiddleware };