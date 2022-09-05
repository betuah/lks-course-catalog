const mongoose = require("mongoose");
const { resolveContent } = require("nodemailer/lib/shared");
const { Sequelize } = require("sequelize");
const env = require("../env");

const mongoConn = () => {
   mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
   });

   mongoose.set("bufferCommands", false);
   const db = mongoose.connection;

   db.on("error", (err) => {
      logError(err);
      mongoose.disconnect();
   });

   db.on("connecting", function () {
      console.log("Mongodb connecting!");
   });

   db.on("conneced", function () {
      console.log("Mongodb connected!");
   });

   db.on("open", function () {
      console.log("Mongodb opened!");
   });

   db.on("disconnected", function () {
      console.log("MongoDB disconnected!");
      // mongoose
      //    .connect(process.env.MONGO_URI, {
      //       useNewUrlParser: true,
      //       useUnifiedTopology: true,
      //       autoIndex: true,
      //    })
      //    .catch((err) => {
      //       mongoose.disconnect();
      //    });
   });
};

const sqlConn = () => {
   const sequelize = new Sequelize(
      env.sequelize.database,
      env.sequelize.username,
      env.sequelize.password,
      {
         host: env.sequelize.host,
         port: env.sequelize.port,
         dialect:
            env.sequelize
               .enggine /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
      }
   );

   return sequelize;
};

module.exports = { mongoConn, sqlConn };
