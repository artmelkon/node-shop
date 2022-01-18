const fse = require("fs-extra");
const path = require("path");

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const app = express();
require("dotenv").config({ path: "./env/.env" });

const accessLogStram = fse.createWriteStream(
  path.join(__dirname, "acces.log"),
  { flags: "a" }
);
const dbConfig = {
  protocol: process.env.DB_PROTOCOL,
  url: process.env.DB_URL,
  dbname: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
};
const { protocol, url, port, user, pass, dbname } = dbConfig;
const MONGODB_URI = `${protocol}://${user}:${pass}@${url}Z/${dbname}`;
app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStram }));

require("./routes/router")(app, MONGODB_URI);

// this method used with mongodb module
require("./utils/db_connect")(app, MONGODB_URI);
