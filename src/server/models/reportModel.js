var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reportSchema = new Schema({
	title: String,
	body: String
})

module.exports = mongoose.model("Report", reportSchema);