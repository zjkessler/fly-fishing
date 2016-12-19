var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors")
var mongoose = require("mongoose");
var path = require("path");
var config = require("./config");
var logger = require("morgan");
var expressJwt = require("express-jwt");
var request = require('request');
var port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));

mongoose.Promise = global.Promise;
mongoose.connect(config.database, function (err) {
	if (err) throw err;
	console.log("Successully connected to the database");
});

app.use("/api", expressJwt({
	secret: config.secret
}));

app.use("/api/feed/", require("./feed"));
app.use("/scrape/", require("./scrape"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/report", require("./routes/reportRoutes"));
app.use("/auth", require("./routes/authRoutes"));


app.listen(port, function () {
	console.log("Server is listening on port: " + port);
});