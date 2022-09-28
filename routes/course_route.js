const CourseController = require("../controllers/course");
const { uploadToS3, uploadTmp } = require("../middlewares/uploadFiles");

module.exports = (app) => {
   app.route("/api/v1/course-catalog").get(CourseController.index);

   app.route("/api/v1/course-catalog/:courseId").get(CourseController.getById);

   app.route("/api/v1/course-catalog").post(
      uploadToS3,
      CourseController.create
   );

   app.route("/api/v1/course-catalog").put(uploadTmp, CourseController.update);

   app.route("/api/v1/course-catalog/:courseId").delete(
      CourseController.delete
   );

   app.route("/").get(CourseController.check);
};
