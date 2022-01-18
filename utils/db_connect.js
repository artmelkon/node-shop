const fse = require('fs-extra');
const https = require("https");

const winston = require('winston');
const mongoose = require('mongoose');

/* SSL/TLS connection */
// const privateKey = fse.readFileSync("server.key");
// const certificate = fse.readFileSync("server.cert");

const PORT = process.env.PORT || 3000;

module.exports = async function(app, MONGODB_URI) {
  try{
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    await app.listen(PORT);
    // await https.createServer({key: privateKey, cert: certificate}, app).listen(PORT);
    console.log(`NodeJS Server connected successfuly on port: ${PORT}`);
    console.log("MongoDB connected Successfully.");
  } catch(err) {console.error(new Error(err))}
}
