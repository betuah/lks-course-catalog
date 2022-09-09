const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid");
const { S3Client } = require("@aws-sdk/client-s3");
const env = require("../env");

const aws_s3 = new S3Client({
   credentials: {
      accessKeyId: env.aws.accessKeyId,
      secretAccessKey: env.aws.secretAccessKey,
   },
   region: env.aws.bucketRegion,
});

const uploadToS3 = (req, res, next) => {
   const storageS3 = multerS3({
      s3: aws_s3,
      bucket: env.aws.bucketName,
      acl: "private",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, callback) => {
         if (file.fieldname == "coverImage") {
            const origFileName = file.originalname.split(".");
            const s3FileName = `${uuid.v4()}.${origFileName[1]}`;
            req.fileName = s3FileName;
            callback(null, `coverImages/${s3FileName}`);
         } else {
            callback("ERR_FIELDNAME", null);
         }
      },
   });

   const upload = multer({
      storage: storageS3,
      fileFilter: (req, file, cb) => {
         if (
            (file.fieldname === "coverImage" && file.mimetype == "image/png") ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
         ) {
            cb(null, true);
         } else if (
            file.fieldname === "document" &&
            file.mimetype == "application/pdf"
         ) {
            cb(null, true);
         } else {
            cb(
               {
                  code: "ERR_UPLOAD_FILE_TYPE",
                  msg: "Only .png, .jpg and .jpeg format are allowed!",
               },
               null
            );
         }
      },
   }).any();

   upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
         return res.status(200).json({
            success: false,
            error_code: err.code || "ERR_UPLOAD",
            message: err.msg || "Upload Error Occured.",
         });
      } else if (err) {
         return res.status(200).json({
            success: false,
            error_code: err.code || "ERR_UPLOAD_ERROR",
            message: err.msg,
         });
      } else {
         next();
      }
   });
};

const uploadTmp = (req, res, next) => {
   const storage = multer.memoryStorage();
   const upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
         console.log(file.mimetype);
         if (
            (file.fieldname === "coverImage" && file.mimetype == "image/png") ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
         ) {
            cb(null, true);
         } else if (
            file.fieldname === "document" &&
            file.mimetype == "application/pdf"
         ) {
            cb(null, true);
         } else {
            cb(
               {
                  code: "ERR_UPLOAD_FILE_TYPE",
                  msg: "Only .png, .jpg and .jpeg format are allowed!",
               },
               null
            );
         }
      },
   }).any();

   upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
         return res.status(200).json({
            success: false,
            error_code: err.code || "ERR_UPLOAD",
            message: err.msg || "Upload Error Occured.",
         });
      } else if (err) {
         return res.status(200).json({
            success: false,
            error_code: err.code || "ERR_UPLOAD_ERROR",
            message: err.msg,
         });
      } else {
         next();
      }
   });
};

module.exports = { uploadToS3, uploadTmp };
