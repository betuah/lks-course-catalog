const { Sequelize } = require("sequelize");
const env = require("../env");

const sequelize = new Sequelize(
   env.sequelize.database,
   env.sequelize.username,
   env.sequelize.password,
   {
      host: env.sequelize.host,
      logging: false,
      dialect:
         env.sequelize
            .enggine /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
      pool: {
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000,
      },
   }
);

const check_connection = async () => {
   try {
      await sequelize.authenticate();
      console.info("Connection has been established successfully.");
      // await sequelize.sync({ alter: true });
      // await sequelize.sync({ force: true });
      // console.info("The table was sync");
   } catch (error) {
      console.error("Unable to connect to the database:", error);
   }
};

check_connection();

module.exports = sequelize;
