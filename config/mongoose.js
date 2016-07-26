var config = require("./config");
var mongoose = require("mongoose");

module.exports = function() {
	var db = require("mongoose").connect(config.db);
	require("../app/models/node.server.model.js");
	return db;
};