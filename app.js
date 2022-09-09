const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const env = require("./env");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const https = require("https");
const port = env.port || 8000;

// environments
app.use(helmet());
app.use(compression());
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use("/public", express.static(__dirname + "/public")); // Public directory

/* Start Logging */
const log_path = env.log_path || path.join(__dirname, "logs");

// if log path not exist, log_path folder will be created
if (!fs.existsSync(log_path)) {
   fs.mkdirSync(log_path, { recursive: true });
}

// Log all error requests status
app.use(
   morgan("combined", {
      skip: (req, res) => {
         return res.statusCode < 400;
      },
      stream: fs.createWriteStream(path.join(log_path, "error.log"), {
         flags: "a",
      }),
   })
);

// Log all success request status
app.use(
   morgan("combined", {
      skip: (req, res) => {
         return res.statusCode > 400;
      },
      stream: fs.createWriteStream(path.join(log_path, "access.log"), {
         flags: "a",
      }),
   })
);
/* End Logging */

/* Dynamic CORS */
if (env.node_env === "production") {
   const whitelist = [`${env.client_host}`, `${env.client_host_prod}`];

   const options = {
      origin: (origin, callback) => {
         if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
         } else {
            callback("CORS Not allowed by SERVER API'S", false);
         }
      },
      credentials: true,
   };
   app.use(cors(options));
} else {
   app.use(
      cors({
         origin: "*",
      })
   );
}

/* End Dynamic CORS */

/* Start Cookie Settings */
app.use(cookieParser());
/* End Cookie Settings */

/* Start of Routing Modules */
const courseRoute = require("./routes/course_route");

courseRoute(app);
/* End of Routing Modules */

if (env.node_env === "production") {
   try {
      const privateKey = fs.readFileSync(`${env.httpsPrivateKey}`, "utf8");
      const certificate = fs.readFileSync(`${env.httpsCertificate}`, "utf8");
      const credentials = { key: privateKey, cert: certificate };
      const httpsApps = https.createServer(credentials, app);

      httpsApps.listen(port, () =>
         console.log(`Server API listen on YOUR_HOST:${port}`)
      );
   } catch (error) {
      console.log(new Error(error));
   }
} else {
   app.listen(port, () =>
      console.log(`Server API listen on YOUR_HOST:${port}`)
   );
}

module.exports = app;
