const fse = require('fs-extra')
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
  url: process.env.DB_URL,
  port: process.env.DB_PORT,
  dbname: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
};
const { url, port, user, pass, dbname } = dbConfig;
const MONGODB_URI = `mongodb://${user}:${pass}@${url}:${port}/${dbname}`;
app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStram }));

require("./routes/router")(app, MONGODB_URI);

// this method used with mongodb module
require("./utils/db_connect")(app, MONGODB_URI);
