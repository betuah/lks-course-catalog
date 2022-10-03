const CourseController = require("../controllers/course");
const { uploadToS3, uploadTmp } = require("../middlewares/uploadFiles");

module.exports = (app) => {
   app.route("/api/v1/course").get(CourseController.index);

   app.route("/api/v1/course/:courseId").get(CourseController.getById);

   app.route("/api/v1/course").post(uploadToS3, CourseController.create);

   app.route("/api/v1/course").put(uploadTmp, CourseController.update);

   app.route("/api/v1/course/:courseId").delete(CourseController.delete);

   app.route("/").get(CourseController.check);
};
