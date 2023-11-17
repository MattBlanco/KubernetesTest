const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = "mongodb://username:password@0.0.0.0:27017";
db.recipes = require("./recipe.model.js")(mongoose);

module.exports = db;
