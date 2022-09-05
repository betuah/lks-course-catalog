const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const { S3Client } = require("@aws-sdk/client-s3");
const env = require("../env");

const objectStorage = (req, res, next) => {
   const aws_s3 = new S3Client({
      credentials: {
         accessKeyId: env.aws.accessKeyId,
         secretAccessKey: env.aws.secretAccessKey,
      },
      region: "ap-southeast-3",
   });

   // const minio_s3 = new S3Client({
   //    accessKeyId: env.aws.accessKeyId,
   //    secretAccessKey: env.aws.secretAccessKey,
   //    endpoint: env.aws.endpoint,
   //    s3ForcePathStyle: true, // needed with minio?
   //    signatureVersion: "v4",
   // });

   const storageS3 = multerS3({
      // s3: env.aws.endpoint ? minio_s3 : aws_s3,
      s3: aws_s3,
      bucket: env.aws.bucket,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, callback) => {
         if (file.fieldname == "logo") {
            let fileExt =
               file.mimetype === "image/png"
                  ? "png"
                  : file.mimetype === "image/jpg"
                  ? "jpg"
                  : file.mimetype === "image/jpeg" && "jpeg";
            console.log(2, file);
            callback(null, `logo/${req.params.companyId}.${fileExt}`);
         } else {
            callback("ERR_FIELDNAME", null);
         }
      },
   });

   const upload = multer({
      storage: storageS3,
      fileFilter: (req, file, cb) => {
         if (
            (file.fieldname === "logo" && file.mimetype == "image/png") ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
         ) {
            console.log(file);
            console.log("1");
            cb(null, true);
         } else if (
            file.fieldname === "document" &&
            file.mimetype == "application/pdf"
         ) {
            cb(null, true);
         } else {
            cb(null, false);
            return cb(
               new Error({
                  code: "ERR_UPLOAD_FILE_TYPE",
                  msg: "Only .png, .jpg and .jpeg format allowed!",
               })
            );
         }
      },
   }).fields([
      { name: "logo", maxCount: 1 },
      { name: "document", maxCount: 1 },
   ]);

   upload(req, res, (err) => {
      if (err) {
         console.log(err);
         return res.status(200).json({
            success: false,
            error_code: "ERR_UPLOAD_ERROR",
            message: err.msg,
            data: "",
         });
      } else {
         next();
      }
   });
};

module.exports = { objectStorage };
