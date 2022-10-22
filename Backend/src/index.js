const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');

const sliderHandler = require("./routeHandler/sliderHandler");
const imgUploads = require("./routeHandler/imageUpload/fileuploadHandler");

// express app initialization
const app = express();

app.use(cors());

dotenv.config()
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

//database Connection - mongoDB
var dbConnectivity = require("./database/mongo");
var dbConnectivityHelper = new dbConnectivity();
dbConnectivityHelper.connectionMongDBConfiguration;

// application routes
app.use("/api", sliderHandler);
app.use("/file", imgUploads);

// default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.use(errorHandler);

app.listen(3600, async () => {
  console.log("app listening at port 3600");
});







