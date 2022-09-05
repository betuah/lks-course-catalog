require("dotenv").config();

const env = {
   port: process.env.PORT,
   node_env: process.env.NODE_ENV,
   httpsPrivateKey: process.env.HTTPS_PRIVATE_KEY_PATH,
   httpsCertificate: process.env.HTTPS_CERTIFICATE_PATH,
   host: process.env.HOST,
   client_host: process.env.CLIENT_HOST,
   client_host_prod: process.env.CLIENT_HOST_PROD,
   token_secret: process.env.TOKEN_SECRET,
   system_secret: process.env.SYSTEM_SECRET,
   encryption_key: process.env.ENCRYPTION_KEY,
   db_type: process.env.DB_TYPE,
   log_path: process.env.LOG_PATH,
   cache_path: process.env.LOG_PATH,
   midtrans_uri: process.env.MIDTRANS_URI,
   midtrans_server_key: process.env.MIDTRANS_SERVER_KEY,
   aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.AWS_BUCKET_NAME,
      endpoint: process.env.AWS_ENDPOINT,
   },
   sequelize: {
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      enggine: process.env.DB_ENGGINE,
   },
   mongoose: {
      database: process.env.MONGO_DB,
      username: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
      host: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT,
   },
   redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
   },
   mail: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
      tls: process.env.MAIL_TLS,
   },
};

module.exports = env;
