require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const production = {
   node_env: process.env.NODE_ENV,
   token_secret: process.env.TOKEN_SECRET,
   system_secret: process.env.SYSTEM_SECRET,
   encryption_key: process.env.ENCRYPTION_KEY,
   log_path: process.env.LOG_PATH,
   cache_path: process.env.LOG_PATH,
   aws: {
      accessKey: process.env.AWS_ACCESS_KEY,
      secretKey: process.env.AWS_SECRET_KEY,
      bucketName: process.env.AWS_BUCKET_NAME,
      bucketRegion: process.env.AWS_BUCKET_REGION,
      cfUrl: process.env.AWS_CF_URL,
      cfPrivateKey: process.env.AWS_CF_PRIVATE_KEY,
      cfKeyPairId: process.env.AWS_CF_KEY_PAIR_ID,
   },
   sequelize: {
      dbName: process.env.DB_NAME,
      dbUser: process.env.DB_USER,
      dbPassword: process.env.DB_PASSWORD,
      dbHost: process.env.DB_HOST,
      dbPort: process.env.DB_PORT,
      dbEnggine: process.env.DB_ENGGINE,
   },
   mail: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
      tls: process.env.MAIL_TLS,
   },
};

const testing = {
   node_env: process.env.NODE_ENV,
   token_secret: process.env.TOKEN_SECRET,
   system_secret: process.env.SYSTEM_SECRET,
   encryption_key: process.env.ENCRYPTION_KEY,
   log_path: process.env.LOG_PATH,
   cache_path: process.env.LOG_PATH,
   aws: {
      accessKey: process.env.AWS_ACCESS_KEY,
      secretKey: process.env.AWS_SECRET_KEY,
      bucketName: process.env.AWS_BUCKET_NAME,
      bucketRegion: process.env.AWS_BUCKET_REGION,
      cfUrl: process.env.AWS_CF_URL,
      cfPrivateKey: process.env.AWS_CF_PRIVATE_KEY,
      cfKeyPairId: process.env.AWS_CF_KEY_PAIR_ID,
   },
   sequelize: {
      dbName: process.env.AWS_DB_NAME,
      dbUser: process.env.AWS_DB_USER,
      dbPassword: process.env.AWS_DB_PASSWORD,
      dbHost: process.env.AWS_DB_HOST,
      dbPort: process.env.AWS_DB_PORT,
      dbEnggine: process.env.AWS_DB_ENGGINE,
   },
   mail: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
      tls: process.env.MAIL_TLS,
   },
};

const dev = {
   node_env: process.env.NODE_ENV,
   token_secret: process.env.DEV_TOKEN_SECRET,
   system_secret: process.env.DEV_SYSTEM_SECRET,
   encryption_key: process.env.DEV_ENCRYPTION_KEY,
   db_type: process.env.DEV_DB_TYPE,
   log_path: process.env.DEV_LOG_PATH,
   cache_path: process.env.DEV_LOG_PATH,
   aws: {
      accessKeyId: process.env.DEV_AWS_ACCESS_KEY,
      secretKey: process.env.DEV_AWS_SECRET_KEY,
      bucketName: process.env.DEV_AWS_BUCKET_NAME,
      bucketRegion: process.env.DEV_AWS_BUCKET_REGION,
      cfUrl: process.env.DEV_AWS_CF_URL,
      cfPrivateKey: process.env.DEV_AWS_CF_PRIVATE_KEY,
      cfKeyPairId: process.env.DEV_AWS_CF_KEY_PAIR_ID,
   },
   sequelize: {
      dbName: process.env.DEV_DB_NAME,
      dbUser: process.env.DEV_DB_USERNAME,
      dbPassword: process.env.DEV_DB_PASSWORD,
      dbHost: process.env.DEV_DB_HOST,
      dbPort: process.env.DEV_DB_PORT,
      dbEnggine: process.env.DEV_DB_ENGGINE,
   },
   mail: {
      host: process.env.DEV_MAIL_HOST,
      port: process.env.DEV_MAIL_PORT,
      user: process.env.DEV_MAIL_USER,
      pass: process.env.DEV_MAIL_PASSWORD,
      tls: process.env.DEV_MAIL_TLS,
   },
};

module.exports =
   process.env.NODE_ENV === "production"
      ? production
      : process.env.NODE_ENV === "testing"
      ? testing
      : dev;
